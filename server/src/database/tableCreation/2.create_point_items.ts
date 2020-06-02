import pg from '../index';

export default {
  async create() {
    await pg.query(`CREATE TABLE IF NOT EXISTS point_items(
        id serial PRIMARY KEY,
        point_id integer NOT NULL,
        item_id integer NOT NULL,
        FOREIGN KEY (point_id)  REFERENCES points(id),
        FOREIGN KEY (item_id)  REFERENCES items(id)
      );`);
    console.log('Created table point_items');
  },
  async drop() {
    await pg.query('DROP TABLE point_items');
    console.log('Dropped table point_items');
  },
};
