import database from './mysql_config.js';
import Response from './Response.js';
import QUERY from './query.js';
import User from './User.js';
import HTTPStatus from './HTTPStatus.js';
import bcrypt from 'bcrypt';

export const getUsers = (req, res) => {
    database.query(QUERY.SELECT_USERS, (error, results) => {
        if (!results){
            res.status(HTTPStatus.NO_CONTENT.code).send(new Response(HTTPStatus.NO_CONTENT.code, HTTPStatus.NO_CONTENT.status, 'No users found.'));
        }else{
            res.status(HTTPStatus.OK.code).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status, 'Users retrieved.', results));
        }
    });
};

export const getUser = (req, res) => {
    database.query(QUERY.SELECT_USER, [req.query.username], (error, results) => {
        if(!results[0]){
            res.status(HTTPStatus.NOT_FOUND.code).send(new Response(HTTPStatus.NOT_FOUND.code, HTTPStatus.NOT_FOUND.status, 'User not found.'));
        }else{
            console.log(req.query.password);
            console.log(results[0].pwhash);
            bcrypt.compare(req.query.password, results[0].pwhash, (err, result) => {
                if(result){
                    res.status(HTTPStatus.OK.code).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status, 'User retrieved', results[0]));
                }else{
                    res.status(HTTPStatus.BAD_REQUEST.code).send(new Response(HTTPStatus.BAD_REQUEST.code, HTTPStatus.BAD_REQUEST.status, 'Invalid password!'))
                }
            });
        }
    });
};

export const createUser = (req, res) => {
    let saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (error, hash) => {
            req.body.password = hash;
            database.query(QUERY.CREATE_USER, Object.values(req.body), (errors, results) => {
                if(!results){
                    if(errors.code == 'ER_DUP_ENTRY'){
                        res.status(HTTPStatus.BAD_REQUEST.code).send(new Response(HTTPStatus.BAD_REQUEST.code, HTTPStatus.BAD_REQUEST.status, 'User already exists'));
                    }else{
                        res.status(errors.code).send(new Response(errors.code, errors.status, 'Error creating user'));
                    }
                }else{ 
                    const user = {id: results.insertedId, ...req.body, created_at: new Date()};
                    res.status(HTTPStatus.OK.code).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status), 'User created', { user })
                }
            });
        });
    });
};

export const updateUser = (req, res) => {
    database.query(QUERY.SELECT_USER, [req.body.username], (error, results) => {
        if(!results[0]){
            res.status(HTTPStatus.NOT_FOUND.code).send(new Response(HTTPStatus.NOT_FOUND.code, HTTPStatus.NOT_FOUND.status, 'Requested user not found'));
        }else{
            database.query(QUERY.UPDATE_USER, [ Object.values(req.body), req.params.id ], (err, result) => {
                if(!err){
                    res.status(HTTPStatus.OK.code).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status, 'User updated'), { id: req.params.id, ...req.body});
                }else{
                    res.status(HTTPStatus.INTERNAL_SERVER_ERROR.code).send(HTTPStatus.INTERNAL_SERVER_ERROR.code, HTTPStatus.INTERNAL_SERVER_ERROR.status, 'Error updating user with id')
                }
            });
        }
    });
};

export const deleteUser = (req, res) => {
    database.query(QUERY.DELETE_USER, [req.body.username], (error, results) => {
        if(results.affectedRows > 0){
            res.status(HTTPStatus.OK.code).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status, 'User deleted.', results[0]));
        }else{
            res.status(HTTPStatus.NOT_FOUND.code).send(new Response(HTTPStatus.NOT_FOUND.code, HTTPStatus.NOT_FOUND.status, 'Requested user not found'));
        }
    });
};