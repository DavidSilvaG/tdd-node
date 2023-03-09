import nock from 'nock';
import { createTestAppConnection, nockErrorAtPlanetsByPage, nockErrorGettingPlanetById, nockPlanetById, nockPlanetsByPage } from "../utils/connect.utils";
import App from "../../src/app";
import request from "supertest";
import { planetSavedMock, swapiPlanetsByPageMock } from '../utils/mock.utils';
import { validationErrors } from '../../src/common/interfaces/messages';
import { PlanetEntity } from '../../src/infrastructure/database/entity/Planet';

describe('Test ping controller', () => {
    let app: App;
    const baseUrl = '/api/planets';

    beforeAll(async () => {
        app = await createTestAppConnection();
    });

    beforeEach(async () => {
        nock.cleanAll();
        nockPlanetsByPage();
        nockPlanetById();
    });

    afterAll(async () => {
        nock.cleanAll();
        await PlanetEntity.delete({name: planetSavedMock.name})
    });

    it('Should get planets from swapi with valid page', async function () {
        const result = await request(app.getServer())
            .get(`${baseUrl}?page=1`)
            .expect(200);
        expect(result.body).toMatchObject({
            planets: swapiPlanetsByPageMock.results,
            count: swapiPlanetsByPageMock.results.length
        });
    });

    it('Should not get planets from swapi - invalid page', async function () {
        const result = await request(app.getServer())
            .get(`${baseUrl}?page=undefined`)
            .expect(400);
        expect(result.body).toBe(validationErrors.onlyPositiveIntegerAllowed('page','undefined'));
    });

    it('Should not get planets from swapi - swapi error', async function () {
        nock.cleanAll();
        nockErrorAtPlanetsByPage();
        const result = await request(app.getServer())
            .get(`${baseUrl}?page=1`)
            .expect(500);
        expect(result.body.error).toMatchObject({message: `Error getting planets by page 1 from swapi`})
    });

    it('Should get planet by Id from swapi, save to db and get directly from db after next try', async function () {
        const result = await request(app.getServer())
            .get(`${baseUrl}/1000`)
            .expect(200);
        expect(result.body).toMatchObject(planetSavedMock);
        const planetSaved = await PlanetEntity.findOne({name:planetSavedMock.name});
        expect(planetSaved).toMatchObject(planetSavedMock)
        nock.cleanAll();
        nockErrorGettingPlanetById();
        const result2 = await request(app.getServer())
            .get(`${baseUrl}/1000`)
            .expect(200);
        expect(result2.body).toMatchObject(planetSavedMock);
    });

    it('Should not get planet by Id from swapi - invalid id', async function () {
        const result = await request(app.getServer())
            .get(`${baseUrl}/undefined`)
            .expect(400);
        expect(result.body).toBe(validationErrors.onlyPositiveIntegerAllowed('planetId',undefined));
    });

    it('Should not get planet by Id from swapi - swapi error', async function () {
        const result = await request(app.getServer())
            .get(`${baseUrl}/1001`)
            .expect(500);
        expect(result.body.error).toMatchObject({message: 'Error getting planet by id from swapi'})
    });
})
