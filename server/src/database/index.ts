import { Pool } from 'pg';
import databaseConfig from '../config/database';

const pool = new Pool(databaseConfig);

export default {
  query(text: string, params?: string[]) {
    return pool.query(text, params);
  },
};
