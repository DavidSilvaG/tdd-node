import { Router } from 'express';
import { planetsController } from './application/controllers/planet.controller';
import { peopleController } from './application/controllers/people.controller';

const routes: Router = Router();

routes.get('/planets', planetsController.getAllPlanets);
routes.get('/people', peopleController.getAllPeople);
routes.get('/planets/:planetId', planetsController.getPlanetById);
routes.get('/people/:peopleId', peopleController.getPeopleById);
routes.post('/people', peopleController.registerPeople);

export default routes;
