import 'reflect-metadata';
import path from 'path';
import logger from 'morgan';
import express from 'express';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';

import router from '~routes';

createConnection()
  .then(() => {
    console.log('> Database connected.');

    const app = express();
    const server = createServer(app);

    // Defining middlewares & stuff
    app
      .use(logger('tiny'))
      .use(express.json())
      .use(express.urlencoded({ extended: false }))
      .use(cookieParser())
      .use(express.static(path.resolve(__dirname, '../client/dist')));

    app.use('/', router);

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.info(`> Server working on localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
