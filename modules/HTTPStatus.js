import database from './mysql_config';
import Response from './response';
import QUERY from './query.js';
import User from './User';

const HTTPStatus = {
    OK: { code: 200, status: 'OK' },
    CREATED: { code: 201, status: 'CREATED' },
    NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
    BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
    NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
    INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR'}
};

export const getUsers = (req, res) => {
    database.query(QUERY.SELECT_USERS, (error, results) => {
        if (!results){
            res.status(HTTPStatus.NO_CONTENT).send(new Response(HTTPStatus.NO_CONTENT.code, HTTPStatus.NO_CONTENT.status, 'No users found.'));
        }else{
            res.status(HTTPStatus.OK.code).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status, 'Users retrieved.', results));
        }
    })
};

export const getUser = (req, res) => {
    database.query(QUERY.SELECT_USER, [ req.params.id ], (error, results) => {
        if(!results[0]){
            res.status(HTTPStatus.NOT_FOUND).send(new Response(HTTPStatus.NOT_FOUND.code, HTTPStatus.NOT_FOUND.status, 'User not found.'));
        }else{
            res.status(HTTPStatus.OK.code).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status, 'User retrieved', results[0]));
        }
    });
};

export const createUser = (req, res) => {
    database.query(QUERY.CREATE_USER, Object.values(req.body), (error, results) => {
        if(!results){
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(new Response(HTTPStatus.INTERNAL_SERVER_ERROR.code, HTTPStatus.INTERNAL_SERVER_ERROR.status, 'Error creating user'));
        }else{ 
            const user = new User({id: results.insertedId, ...req.body, created_at: new Date() });
            res.status(HTTPStatus.OK).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status), 'User created', { user })
        }
    });
};

export const updateUser = (req, res) => {
    database.query(QUERY.SELECT_USER, [req.params.id], (error, results) => {
        if(!results[0]){
            res.status(HTTPStatus.NOT_FOUND).send(new Response(HTTPStatus.NOT_FOUND.code, HTTPStatus.NOT_FOUND.status, 'Requested user not found'));
        }else{
            database.query(QUERY.UPDATE_USER, [ Object.values(req.body), req.params.id ], (error, results) => {
                if(!error){
                    res.status(HTTPStatus.OK).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status, 'User updated'), { id: req.params.id, ...req.body});
                }else{
                    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(HTTPStatus.INTERNAL_SERVER_ERROR.code, HTTPStatus.INTERNAL_SERVER_ERROR.status, 'Error updating user with id')
                }
            });
        }
    });
};

export const deleteUser = (req, res) => {
    database.query(QUERY.DELETE_USER, [req.params.id], (error, results) => {
        if(results.affectedRows > 0){
            res.status(HTTPStatus.OK).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status, 'User deleted.', results[0]));
        }else{
            res.status(HTTPStatus.NOT_FOUND).send(new Response(HTTPStatus.NOT_FOUND.code, HTTPStatus.NOT_FOUND.status, 'Requested user not found'));
        }
    });
};

export default HTTPStatus;