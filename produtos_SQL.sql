create table categorias_itens(
id int primary key auto_increment,
categoria varchar(35));


create table cadastro_produtos(
id int primary key auto_increment,
item varchar(50) not null,
categoria int,
preco_compra decimal(10,2),
preco_venda decimal(10,2) not null,
quant_estoque int not null default 0,
constraint fk_categoria foreign key (categoria) references categorias_itens(id)

);

create table auditoria_estoque(
id int primary key auto_increment,
idProduto int not null,
estoqAnterior int not null default 0,
estoqAtual int not null,
diferenca int not null,
dataAlteracao timestamp default current_timestamp,
constraint fk_idProduto foreign key (idProduto) references cadastro_produtos(id));

delimiter $$
create trigger tg_audit_estoq after update on cadastro_produtos
for each row
begin
   insert into auditoria_estoque (idProduto,estoqAnterior,estoqAtual,diferenca) 
   values (new.id,old.quant_estoque,new.quant_estoque,new.quant_estoque - old.quant_estoque );
 end$$
 delimiter ;
 
 delimiter $$
create trigger tg_audit_estoq_add after insert on cadastro_produtos
for each row
begin
   insert into auditoria_estoque (idProduto,estoqAnterior,estoqAtual,diferenca) 
   values (new.id,0,new.quant_estoque,new.quant_estoque );
 end$$
 delimiter ;
 
select * from auditoria_estoque;
insert into cadastro_produtos (item,categoria,preco_compra,preco_venda,quant_estoque) values ("ração dog salmão 5kg",1,35.5,80.50,10 );
update cadastro_produtos set quant_estoque = 8 where id =1;