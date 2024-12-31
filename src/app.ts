import dotenv from "dotenv";
import express from 'express';

export const app = express();

app.use(express.json());

dotenv.config();
