create database moveOn;

use moveOn;

create table usuario(
idusuario	int primary key auto_increment,
nome		varchar(50),
email		varchar(100),
idade		int,
senha		varchar(45)
);

create table danca(
iddanca	int primary key auto_increment,
nome_danca	varchar(20),
fkusuario	int,
foreign key (fkusuario) references usuario(idusuario)
);

create table perguntas(
idperguntas	int primary key auto_increment,
perguntas	varchar(255)
);

create table respostas(
idrespostas	int primary key auto_increment,
respostas	varchar(255),
fkperguntas	int,
foreign key (fkperguntas) references perguntas(idperguntas)
);
