CREATE DATABASE IF NOT EXISTS serverdb;
USE serverdb;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS salts;

CREATE TABLE users(
    id INTEGER NOT NULL,
    username VARCHAR(255),
    pwhash VARCHAR(255),
    firstname VARCHAR(255),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Users_Email UNIQUE (email),
);

CREATE TABLE salts(
    id INTEGER NOT NULL,
    userid INTEGER,
    salt VARCHAR(255),
    PRIMARY KEY(id),
);

CREATE TABLE tokens(
    id INTEGER NOT NULL,
    userid INT,
    token VARCHAR(255),
    stamp DATETIME,
    PRIMARY KEY(id),
);