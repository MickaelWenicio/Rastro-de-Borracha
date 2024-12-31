import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DATABASE,
};

const client = new Client(dbConfig);

export const connectDb = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');
  } catch (err) {
    console.error('Error connecting to PostgreSQL database', err);
    process.exit(1);
  }
};

connectDb();

export default client;
