import pg from '../index';

export default {
  async create() {
    await pg.query(`CREATE TABLE IF NOT EXISTS items(
        id serial PRIMARY KEY,
        image varchar(255) NOT NULL,
        title varchar(255) NOT NULL
      );`);
    console.log('Created table items');
  },
  async drop() {
    await pg.query('DROP TABLE items');
    console.log('Dropped table items');
  },
};
