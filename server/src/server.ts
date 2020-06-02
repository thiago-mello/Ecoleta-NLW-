import 'dotenv/config';
import express, { Express } from 'express';
import routes from './routes';

class App {
  server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  async middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

new App().server.listen(3000, () => console.log('Listening on port 3000'));
