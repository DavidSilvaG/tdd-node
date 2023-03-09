import nock from 'nock';
import { createTestAppConnection, nockErrorAtPeopleByPage, nockErrorGettingPeopleById, nockErrorGettingPlanetById, nockPeopleById, nockPeopleByPage, nockPlanetById } from "../utils/connect.utils";
import App from "../../src/app";
import request from "supertest";
import { peopleMock, swapiPeopleByPageMock } from '../utils/mock.utils';
import { validationErrors } from '../../src/common/interfaces/messages';
import { PeopleEntity } from '../../src/infrastructure/database/entity/People';

describe('Test ping controller', () => {
    let app: App;
    const baseUrl = '/api/people';

    beforeAll(async () => {
        app = await createTestAppConnection();
    });

    beforeEach(async () => {
        nock.cleanAll();
        nockPeopleByPage();
        nockPeopleById();
        nockPlanetById();
    });

    afterAll(async () => {
        nock.cleanAll();
        await PeopleEntity.delete({name: peopleMock.name})
    });

    it('Should get Peoples from swapi with valid page', async function () {
        const result = await request(app.getServer())
            .get(`${baseUrl}?page=1`)
            .expect(200);
        expect(result.body).toMatchObject({
            people: swapiPeopleByPageMock.results,
            count: swapiPeopleByPageMock.results.length
        });
    });

    it('Should not get Peoples from swapi - invalid page', async function () {
        const result = await request(app.getServer())
            .get(`${baseUrl}?page=undefined`)
            .expect(400);
        expect(result.body).toBe(validationErrors.onlyPositiveIntegerAllowed('page','undefined'));
    });

    it('Should not get people from swapi - swapi error', async function () {
        nock.cleanAll();
        nockErrorAtPeopleByPage();
        const result = await request(app.getServer())
            .get(`${baseUrl}?page=1`)
            .expect(500);
        expect(result.body.error).toMatchObject({message: `Error getting people by page 1 from swapi`})
    });

    it('Should get people by Id from swapi, save to db and get directly from db after next try', async function () {
        const result = await request(app.getServer())
            .get(`${baseUrl}/1000`)
            .expect(200);
        expect(result.body).toMatchObject(peopleMock);
        const PeopleSaved = await PeopleEntity.findOne({name:peopleMock.name});
        expect(PeopleSaved).toMatchObject(peopleMock)
        nock.cleanAll();
        nockErrorGettingPeopleById();
        const result2 = await request(app.getServer())
            .get(`${baseUrl}/1000`)
            .expect(200);
        expect(result2.body).toMatchObject(peopleMock);
    });

    it('Should not get people by Id from swapi - invalid id', async function () {
        const result = await request(app.getServer())
            .get(`${baseUrl}/undefined`)
            .expect(400);
        expect(result.body).toBe(validationErrors.onlyPositiveIntegerAllowed('peopleId',undefined));
    });

    it('Should not get people by Id from swapi - swapi error', async function () {
        nock.cleanAll();
        nockErrorGettingPeopleById();
        const result = await request(app.getServer())
            .get(`${baseUrl}/1001`)
            .expect(500);
        expect(result.body.error).toMatchObject({message: 'Error getting people by id from swapi'})
    });

    it('Should be able to save new people', async function () {
        const result = await request(app.getServer())
            .post(baseUrl)
            .send(peopleMock)
            .expect(200);
        expect(result.body).toMatchObject(peopleMock);
        expect(Number(result.body.id)).toBeGreaterThan(10000)
        const result2 = await request(app.getServer())
            .post(baseUrl)
            .send(peopleMock)
            .expect(200);
        expect(Number(result2.body.id)).toBeGreaterThan(Number(result.body.id))
    });

    it('Should not be able to save new people - missingkey', async function () {
        let customPeople = JSON.parse(JSON.stringify(peopleMock))
        delete customPeople.height
        const result = await request(app.getServer())
            .post(baseUrl)
            .send(customPeople)
            .expect(400);
        expect(result.body).toBe(validationErrors.keysRequired(['height']));
    });

    it('Should not be able to save new people - all fields not string', async function () {
        let customPeople = JSON.parse(JSON.stringify(peopleMock))
        customPeople.height = 180;
        const result = await request(app.getServer())
            .post(baseUrl)
            .send(customPeople)
            .expect(400);
        expect(result.body).toBe(validationErrors.onlyStringAllowed);
    });

    it('Should not be able to save new people - invalid homeworld format', async function () {
        let customPeople = JSON.parse(JSON.stringify(peopleMock))
        customPeople.homeworld = 'random.url';
        const result = await request(app.getServer())
            .post(baseUrl)
            .send(customPeople)
            .expect(400);
        expect(result.body).toBe(validationErrors.invalidHomeWorld);
    });

    it('Should not get people by Id from swapi - swapi error', async function () {
        nock.cleanAll();
        nockErrorGettingPlanetById();
        const result = await request(app.getServer())
            .post(baseUrl)
            .send({...peopleMock, homeworld: peopleMock.homeworld.replace('1000','999')})
            .expect(500);
        expect(result.body.error).toMatchObject({message: 'Error getting planet by id from swapi'})
    });
    
})
