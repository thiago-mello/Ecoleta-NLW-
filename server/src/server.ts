import 'dotenv/config';
import express, { Express } from 'express';
import { resolve } from 'path';
import routes from './routes';

class App {
  server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  async middlewares() {
    this.server.use(
      '/assets',
      express.static(resolve(__dirname, '..', 'assets'))
    );
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

new App().server.listen(5000, () => console.log('Listening on port 5000'));
