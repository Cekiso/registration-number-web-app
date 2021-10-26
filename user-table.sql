create table town(
	id serial not null primary key,
	townname varchar(50) not null,
	startstring varchar(50) not null
);

create table regnumbers(
	id serial not null primary key,
	registration varchar(50) not null,
	registration_id int,
	foreign key (registration_id) references town(id)
);

insert into town (townname,startstring) values ('Cape Town','CA');
insert into town (townname,startstring) values ('Gauteng','GP');
insert into town (townname,startstring) values ('Paarl','CJ');



