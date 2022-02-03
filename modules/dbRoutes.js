import express from 'express';;
import {getUsers, getUser, createUser, deleteUser, updateUser} from "./Controller.js";

const dbRoutes = express.Router();

dbRoutes.route('/')
    .get(getUsers)
    .post(createUser);

dbRoutes.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

export default dbRoutes;