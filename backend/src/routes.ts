import express from 'express';

import * as ItemsController from "./controllers/ItemsController";
import * as PointsController from "./controllers/PointsController";

const routes = express.Router();

// hello word
routes.post('/hello_world', (req, res) => res.json({
    ok: 'Hello world',
    body: req.body,
    headers: req.headers,
    params: req.params,
}));

// hello word
routes.get('/hello_world', (_, res) => res.json({
    ok: 'Hello world',
}));

// show items
routes.get('/items', ItemsController.index);

// create points
routes.post('/point', PointsController.store);

// show point by id
routes.get('/point/:id', PointsController.show);

// show point with filter
routes.get('/points', PointsController.index);


export default routes;
