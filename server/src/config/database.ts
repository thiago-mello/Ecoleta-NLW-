import 'dotenv/config';

export default {
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
};
