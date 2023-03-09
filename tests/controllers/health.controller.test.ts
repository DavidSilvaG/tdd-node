import nock from 'nock';
import { createTestAppConnection } from "../utils/connect.utils";
import App from "../../src/app";
import request from "supertest";

describe('Test ping controller', () => {
    let app: App;
    const baseUrl = '/health';

    beforeAll(async () => {
        app = await createTestAppConnection();
    });

    afterAll(async () => {
        nock.cleanAll();
    });

    it('Should check active session', async function () {
        const result = await request(app.getServer())
            .get(`${baseUrl}`)
            .expect(200);
        expect(result.text).toBe('alive!');
    });
})
