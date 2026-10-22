create table cliente(
id int primary key auto_increment,
nome varchar(75) not null,
data_nascimento date,
email varchar(40) unique,
cpf varchar(14) unique,
genero char(01) default 'n' check(genero in ('m','f','n')),
celular varchar(15) unique,
data_cadastro datetime default now() 
);

create table especies(
id int primary key auto_increment,
especie varchar(35) unique
);

create table racas(
id int primary key auto_increment,
especie int not null,
raca varchar(35),
constraint fk_raca foreign key (especie) references especies(id));

create table  pets(
id int primary key auto_increment,
nome varchar(35) default 'Sem nome',
dono int not null,
especie int not null,
raca int,
sexo char(01) not null check(sexo in('f','m')),
castrado char(01) check(castrado in('s','n')), 
data_nascimento date,
data_cadastro datetime default now() ,
constraint fk_pets_dono foreign key (dono) references cliente(id),
constraint fk_pets_especie foreign key (especie) references especies(id),
constraint fk_pets_raca foreign key (raca) references racas(id)
);

insert into cliente (nome,data_nascimento,email,cpf,genero,celular) values ('Maria Marta','2000-10-02','Mariama@gmail.com','31214321310','f','5599993999');
select * from cliente;

insert into pets(nome,dono,especie,raca,sexo,castrado,data_nascimento) values ('Maré',1,1,1,'f','n','2022-05-10');
insert into pets(nome,dono,especie,raca,sexo,castrado,data_nascimento) values ('Mamaco',1,1,1,'m','s','2020-06-20');



SELECT 
    pets.nome AS 'Nome do animal',
    cliente.nome AS 'Dono',        
    especies.especie AS 'Especie', 
    racas.raca AS 'Raça',         
    pets.data_nascimento AS 'Nascimento'
FROM pets
JOIN cliente ON pets.dono = cliente.id
JOIN especies ON pets.especie = especies.id 
LEFT JOIN racas ON pets.raca = racas.id;    



