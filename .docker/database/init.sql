CREATE DATABASE IF NOT EXISTS rinha;
USE rinha;
CREATE TABLE IF NOT EXISTS pessoas (
    apelido varchar(32) unique not null,
    nome varchar(100) not null,
    nascimento date not null,
    stack json
)
