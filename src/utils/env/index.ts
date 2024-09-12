import * as dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || '';
const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);
const DB_USER = process.env.DB_USERNAME || '';
const DB_DB = process.env.DB_DATABASE || '';
const DB_PASS = process.env.DB_PASSWORD || '';

export {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_DB,
  DB_PASS,
};
