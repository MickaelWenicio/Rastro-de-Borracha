import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {Client} = pg;

const dbConfig = {
	user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DATABASE
};

const client = new Client(dbConfig);

client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
    }).catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});

export default client;
