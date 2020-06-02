import pg from '../index';

export default {
  async create() {
    await pg.query(`CREATE TABLE IF NOT EXISTS points(
        id serial PRIMARY KEY,
        image varchar(255),
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        whatsapp varchar(255) NOT NULL,
        city varchar(255) NOT NULL,
        state varchar(2) NOT NULL,
        latitude decimal NOT NULL,
        longitude decimal NOT NULL
      );`);
    console.log('Created table points');
  },
  async drop() {
    await pg.query('DROP TABLE points');
    console.log('Dropped table points');
  },
};
