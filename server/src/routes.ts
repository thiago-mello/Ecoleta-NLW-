import { Router } from 'express';
import ItemController from './app/controllers/ItemController';
import PointController from './app/controllers/PointController';

const routes = Router();

routes.get('/items', ItemController.index);

routes.post('/points', PointController.store);
routes.get('/points', PointController.index);
routes.get('/points/:id', PointController.show);

export default routes;
