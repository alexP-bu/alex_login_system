
CREATE DATABASE IF NOT EXISTS socialnetworkdb;
USE socialnetworkdb;

CREATE TABLE users(
    username   VARCHAR(255) DEFAULT NOT NULL,
    pwhash     VARCHAR(255) DEFAULT NOT NULL,
    firstname  VARCHAR(255) DEFAULT NULL,
    email      VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (username),
    CONSTRAINT UQ_Users_Username UNIQUE (username)
);

CREATE TABLE tokens(
    token    VARCHAR(255) DEFAULT NOT NULL,
    username VARCHAR(255) DEFAULT NOT NULL,
    stamp    DATETIME DEFAULT NOT NULL,
    PRIMARY KEY(username),
);