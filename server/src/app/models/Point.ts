import pg from '../../database';

interface Options {
  limit?: number;
  offset?: number;
}

interface Values {
  image?: string;
  name: string;
  email: string;
  city: string;
  state: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
}

class Point {
  static async select(options?: Options) {
    const limitQuery = options?.limit ? `LIMIT ${options.limit}` : '';
    const offsetQuery = options?.limit ? `OFFSET ${options.offset}` : '';

    const query = await pg.query(
      `SELECT * FROM points ${options ? `${limitQuery} ${offsetQuery}` : ''}`
    );
    return query.rows;
  }

  static async insert(values: Values) {
    const query = await pg.query(
      `INSERT INTO points(image, name, email, whatsapp, city, state, latitude, longitude) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, name, email`,
      [
        values.image || '',
        values.name,
        values.email,
        values.whatsapp,
        values.city,
        values.state,
        String(values.latitude),
        String(values.longitude),
      ]
    );

    return query.rows;
  }
}

export default Point;
