import pg from '../../database';

interface Options {
  limit?: number;
  offset?: number;
}

interface Values {
  title: string;
  image: string;
}

class Item {
  static async select(options?: Options) {
    const limitQuery = options && options.limit ? `LIMIT ${options.limit}` : '';
    const offsetQuery =
      options && options.limit ? `OFFSET ${options.offset}` : '';

    const query = await pg.query(
      `SELECT * FROM items ${options ? `${limitQuery} ${offsetQuery}` : ''}`
    );
    return query.rows;
  }

  static async insert(values: Values) {
    const query = await pg.query(
      'INSERT INTO items(image, title) VALUES ($1, $2)',
      [values.image, values.title]
    );

    return query.rows;
  }
}

export default Item;
