import express from 'express';
import {getUsers, getUser, createUser, deleteUser, updateUser} from "./Controller.js";

const userRouter = express.Router();

userRouter.route('/')
    .get(getUsers)
    .post(createUser);

userRouter.route('/login')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

export default userRouter;