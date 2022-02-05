
CREATE DATABASE IF NOT EXISTS socialnetworkdb;
USE socialnetworkdb;

CREATE TABLE users(
    id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    username   VARCHAR(254) DEFAULT NULL,
    pwhash     VARCHAR(254) DEFAULT NULL,
    firstname  VARCHAR(254) DEFAULT NULL,
    email      VARCHAR(254) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Users_Email UNIQUE (email)
);

CREATE TABLE salts(
    id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    username   VARCHAR(254),
    salt       VARCHAR(254),
    PRIMARY KEY (id)
);

CREATE TABLE tokens(
    id    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    token VARCHAR(254),
    stamp DATETIME,
    PRIMARY KEY(id)
);