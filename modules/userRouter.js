import express from 'express';
import {getUsers, getUser, createUser, deleteUser, updateUser, loginUser} from "./Controller.js";

const userRouter = express.Router();

userRouter.route('/')
    .get(getUsers)
    .post(createUser);

userRouter.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

userRouter.route('/login')
    .get(loginUser);

export default userRouter;