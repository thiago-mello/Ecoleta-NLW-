/* eslint-disable camelcase */
import pg from '../../database';

interface Options {
  limit?: number;
  offset?: number;
}

interface Values {
  point_id: number;
  item_id: number;
}

class Point {
  static async select(options?: Options) {
    const limitQuery = options?.limit ? `LIMIT ${options.limit}` : '';
    const offsetQuery = options?.limit ? `OFFSET ${options.offset}` : '';

    const query = await pg.query(
      `SELECT * FROM point_items ${
        options ? `${limitQuery} ${offsetQuery}` : ''
      }`
    );
    return query.rows;
  }

  static async insert(values: Values) {
    const query = await pg.query(
      `INSERT INTO point_items(point_id, item_id) 
          VALUES ($1, $2) RETURNING *`,
      [String(values.point_id), String(values.item_id)]
    );

    return query.rows;
  }
}

export default Point;
