import express from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.get('/list', userController.getAll);

userRouter.post('/create', userController.create);

export default userRouter;

