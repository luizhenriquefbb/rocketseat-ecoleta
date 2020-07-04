import express from 'express';
import multer from "multer";
import {celebrate, Joi} from "celebrate";

import multerConfig from "./config/multer";

import * as ItemsController from "./controllers/ItemsController";
import * as PointsController from "./controllers/PointsController";

const routes = express.Router();
const upload = multer(multerConfig);

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
routes.post(
    '/point', /* route */
    upload.single('image'), /* multer */
    /* validation */
    celebrate({
        body: Joi.object().keys({
            name     : Joi.string().required(),
            email    : Joi.string().required().email(),
            whatsapp : Joi.string().required(),
            latitude : Joi.number().required(),
            longitude: Joi.number().required(),
            city     : Joi.string(),
            UF       : Joi.string(),
            items    : Joi.string(),
        },)
    }, {
        abortEarly: false,
    }),
    /* controller */
    PointsController.store
);

// show point by id
routes.get('/point/:id', PointsController.show);

// show point with filter
routes.get('/points', PointsController.index);


export default routes;
