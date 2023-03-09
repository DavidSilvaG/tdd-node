import express, { Application } from 'express';
import * as health from './application/controllers/health.controller';
import routes from './routes';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { loggerMiddleware } from './application/middleware/logger.middleware';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs.json');

class App {
    public app: any;

    static readonly PORT = process.env.PORT || 3000;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    public async start(port = App.PORT): Promise<void> {
        await this.connectToDatabase();
        this.app.listen(port, (): void => {
            console.log(`App listening on the port ${port}`);
        });
    }

    public getServer(): express.Application {
        return this.app;
    }

    private initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(loggerMiddleware);
    }

    private initializeRoutes(): void {
        const route: express.Router = express.Router();
        this.app.use(route);
        route.get('/health', health.checkSession as unknown as Application);
        route.use('/api', routes);
        route.use('/docs', swaggerUi.serve);
        route.get('/docs', swaggerUi.setup(swaggerDocument));
    }

    private async connectToDatabase(): Promise<void> {
        await createConnection().then((): void => {
            console.log('Successfully connected to db');
        }).catch((error): void => console.log(error));
    }
}

export default App;
