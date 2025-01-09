import express from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.get('/list', userController.getAll);

userRouter.post('/create', userController.create);

userRouter.delete('/delete', userController.delete);

userRouter.patch('/update/name', userController.updateName);

userRouter.get('/get-single', userController.getSingle);

userRouter.patch('/password', userController.updatePassword);

userRouter.patch('/roles', userController.updateRole);

export default userRouter;

