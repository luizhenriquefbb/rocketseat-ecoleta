import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';

import routes from './routes';
import { PORT } from './constants';


// create a server
const app = express();
const server = new http.Server(app);

// handle cors origin
app.use(cors());

// body must be a json
app.use(express.json());

// serve images
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

// import routes
app.use(routes);

server.listen(process.env.PORT || PORT);