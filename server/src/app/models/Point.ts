import pg from '../../database';

interface Filter {
  city?: string;
  state?: string;
  items?: string;
}

interface Options {
  limit?: number;
  offset?: number;
  where?: Filter;
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
    console.log(options?.where);

    const queryText = `SELECT DISTINCT points.id, image, name, email, whatsapp, city, state, latitude, longitude FROM points 
    INNER JOIN point_items ON point_items.point_id = points.id
    ${
      options?.where?.city || options?.where?.items || options?.where?.state
        ? 'WHERE '
        : ''
    }
    ${options?.where?.city ? `city = '${options.where.city}'` : ''}
    ${
      options?.where?.state
        ? `${options.where?.city ? ' AND ' : ''} state = '${
            options.where.state
          }'`
        : ''
    }
    ${
      options?.where?.items
        ? `${
            options.where?.city || options.where?.state ? ' AND ' : ''
          } point_items.item_id IN (${options.where.items})`
        : ''
    }
    ${options ? `${limitQuery} ${offsetQuery}` : ''}`;
    console.log(queryText);
    const query = await pg.query(queryText);
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

  static async findById(id: number) {
    const query = await pg.query(`SELECT * FROM points WHERE id = $1`, [
      String(id),
    ]);

    return query.rows[0];
  }

  static async includeItems(pointId: number) {
    const query = await pg.query(
      `SELECT items.id, title FROM items 
        INNER JOIN point_items ON point_items.item_id = items.id 
        WHERE point_items.point_id = $1`,
      [String(pointId)]
    );

    return query.rows;
  }
}

export default Point;
