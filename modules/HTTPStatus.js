import database from './mysql_config';
import Response from './response    '
import QUERY from './query.js'

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
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(new Response(HTTPStatus.INTERNAL_SERVER_ERROR.code, HTTPStatus.INTERNAL_SERVER_ERROR.status, 'No users found.'));
        }
    })
};

export const getUser = (req, res) => {
    database.query(QUERY.SELECT_USER, [ req.params.id ], (error, results) => {
        if(!results){
            res.status(HTTPStatus.OK).send(new Response(HTTPStatus.OK.code, HTTPStatus.NO_CONTENT.status, 'User not found.'));
        }else{
            
        }
    });
}