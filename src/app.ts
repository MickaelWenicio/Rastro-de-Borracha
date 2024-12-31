import dotenv from "dotenv";
import express from 'express';
import userRouter from "./routes/userRoutes";

dotenv.config();

export const app = express();

app.use(express.json());
app.use('/user', userRouter);

