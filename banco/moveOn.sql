create database moveOn;

use moveOn;

create table usuario(
idusuario	int primary key auto_increment,
nome		varchar(50),
email		varchar(100),
senha		varchar(45)
);