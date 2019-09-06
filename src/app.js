import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import redis from 'redis';
import RateLimitRedis from 'rate-limit-redis';
import RateLimit from 'express-rate-limit';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
// express async functions errors catch
// must be imported before routes
import 'express-async-errors';

import sentryConfig from './config/sentry';
import './database';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(helmet());
    this.server.use(
      cors({
        /* origin: 'https://teste.com.br' */
      })
    );
    this.server.use(express.json());

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    if (process.env.NODE_ENV !== 'development') {
      this.server.use(
        new RateLimit({
          store: new RateLimitRedis({
            client: redis.createClient({
              host: process.env.REDIS_HOST,
              port: process.env.REDIS_PORT,
            }),
          }),
          windowMs: 1000 * 60 * 15, // 15min
          max: 200,
        })
      );
    }
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      if (err.status) {
        return res.status(err.status).json(err);
      }

      const response = {
        error: {
          status: 500,
          name: 'ServerError',
          message: 'Internal server error',
          user_title: 'Erro 500',
          user_msg: 'Erro interno do servidor',
        },
      };

      return res.status(response.error.status).json(response);
    });
  }
}

export default new App().server;
