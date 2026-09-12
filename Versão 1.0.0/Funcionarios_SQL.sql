create table estados(
id int primary key auto_increment,
estadoSigla char(02) not null unique,
nomeEstado varchar(75) not null);

create table cidades(
id int primary key auto_increment,
cidade varchar(90) not null,
estado int,
constraint fk_estado foreign key (estado) references estados(id));

create table departamentos(
id int primary key auto_increment,
departamento varchar(75) unique not null);

create table funcionarios(
id int primary key auto_increment,
nomeF varchar(75) not null,
cpf  varchar(15) not null unique,
rg varchar(20) not null unique,
dataNascimento date,
genero char(01) not null default 'n' check(genero in ('m','f','n')),
celular varchar(15) unique,
salario decimal(10,2) default 0,
email varchar(100) unique,
cep char(08),
logradouro varchar(100),
numero varchar (10),
bairro varchar(50),
cidade int,
departamento int,
cargo varchar(50) not null,
dataInicio timestamp default current_timestamp,
statusF varchar(11) default 'ativo' check(statusF in ('ativo','afastado','desligado')),
dataDemissao date null,
constraint fk_departamento foreign key (departamento) references departamentos(id),
constraint fk_cidade foreign key (cidade) references cidades(id)
);

create table auditoria_salarios(
id int primary key auto_increment,
funcId int,
salarioAtual decimal(10,2),
salarioOld decimal(10,2),
dataAteracao timestamp default current_timestamp,
constraint fk_funcId foreign key (funcId) references funcionarios(id));

delimiter $$
create trigger tg_salario after insert on funcionarios
for each row
begin
insert into auditoria_salarios (funcId,salarioAtual,salarioOld) values (new.id,new.salario,0);
end $$
delimiter ;

delimiter $$
create trigger tg_salario_update after update on funcionarios
for each row
begin
if old.salario <> new.salario then
    insert into auditoria_salarios (funcId,salarioAtual,salarioOld) values (new.id,new.salario,old.salario);
    end if;
end $$
delimiter ;

