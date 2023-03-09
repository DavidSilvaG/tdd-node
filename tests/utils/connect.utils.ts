import App from '../../src/app';
import nock from 'nock';
import { SwapiAgent } from '../../src/infrastructure/agents/swapi.agent';
import { swapiPeopleByPageMock, swapiPeopleMock, swapiPlanetMock, swapiPlanetsByPageMock } from './mock.utils';

let app: App;

export const createTestAppConnection = async (): Promise<App> => {
    app = new App();
    await app.start(0);
    return app;
};

export const nockPlanetsByPage = (page = 1): void => {
    nock(SwapiAgent.swapiBaseUrl)
        .get(`/api/planets?page=${page}`)
        .times(1000)
        .reply(200,swapiPlanetsByPageMock);
};

export const nockErrorAtPlanetsByPage = (page = 1): void => {
    nock(SwapiAgent.swapiBaseUrl)
        .get(`/api/planets?page=${page}`)
        .times(1000)
        .reply(404,{});
};

export const nockPlanetById = (id = 1000): void => {
    nock(SwapiAgent.swapiBaseUrl)
        .get(`/api/planets/${id}`)
        .times(1000)
        .reply(200,swapiPlanetMock);
};

export const nockErrorGettingPlanetById = (id = 1000): void => {
    nock(SwapiAgent.swapiBaseUrl)
        .get(`/api/planets/${id}`)
        .times(1000)
        .reply(404,{});
};

export const nockPeopleByPage = (page = 1): void => {
    nock(SwapiAgent.swapiBaseUrl)
        .get(`/api/people?page=${page}`)
        .times(1000)
        .reply(200,swapiPeopleByPageMock);
};

export const nockErrorAtPeopleByPage = (page = 1): void => {
    nock(SwapiAgent.swapiBaseUrl)
        .get(`/api/people?page=${page}`)
        .times(1000)
        .reply(404,{});
};

export const nockPeopleById = (id = 1000): void => {
    nock(SwapiAgent.swapiBaseUrl)
        .get(`/api/people/${id}`)
        .times(1000)
        .reply(200,swapiPeopleMock);
};

export const nockErrorGettingPeopleById = (id = 1000): void => {
    nock(SwapiAgent.swapiBaseUrl)
        .get(`/api/people/${id}`)
        .times(1000)
        .reply(404,{});
};

