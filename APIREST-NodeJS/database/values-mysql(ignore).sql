-- INSERT BRANDS
INSERT INTO brands(name, active, created_at, modified_at) 
values ('Samsung', '1', now(), now());
INSERT INTO brands(name, active, created_at, modified_at) 
values ('LG', '1', now(), now());
INSERT INTO brands(name, active, created_at, modified_at)  
values ('Sony', '1', now(), now());
INSERT INTO brands(name, active, created_at, modified_at) 
values ('Lenovo', '1', now(), now());
INSERT INTO brands(name, active, created_at, modified_at) 
values ('HP', '1', now(), now());
INSERT INTO brands(name, active, created_at, modified_at) 
values ('Casio', '0', now(), now());
INSERT INTO brands(name, active, created_at, modified_at) 
values ('CARTON Y ESTIBA', '0', now(), now());
INSERT INTO brands(name, active, created_at, modified_at) 
values ('Apple', '0', now(), now());


-- INSERT STATUS
INSERT INTO status(name, active, created_at, modified_at) 
values ('En uso', '1', now(), now());
INSERT INTO status(name, active, created_at, modified_at) 
values ('Depreciado', '1', now(), now());
INSERT INTO status(name, active, created_at, modified_at) 
values ('En Bodega', '1', now(), now());
INSERT INTO status(name, active, created_at, modified_at) 
values ('En reparación', '1', now(), now());
INSERT INTO status(name, active, created_at, modified_at) 
values ('Perdido', '1', now(), now());


-- INSERT TYPES
INSERT INTO types(name, active, created_at, modified_at) 
values ('Computo', '1', now(), now());
INSERT INTO types(name, active, created_at, modified_at) 
values ('Moviles', '1', now(), now());
INSERT INTO types(name, active, created_at, modified_at) 
values ('Cocina', '1', now(), now());
INSERT INTO types(name, active, created_at, modified_at) 
values ('Aseo', '1', now(), now());


-- INSER USERS
INSERT INTO users(name, email, active, created_at, modified_at) 
values ('Adrian', 'adrian@gmail.com', '1', now(), now());
INSERT INTO users(name, email, active, created_at, modified_at) 
values ('Pedro', 'pedro@gmail.com', '1', now(), now());
INSERT INTO users(name, email, active, created_at, modified_at) 
values ('Elena', 'elena@gmail.com', '1', now(), now());
INSERT INTO users(name, email, active, created_at, modified_at)  
values ('Julio', 'julio@gmail.com', '1', now(), now());
INSERT INTO users(name, email, active, created_at, modified_at) 
values ('Andrea', 'andrea@gmail.com', '1', now(), now());


-- INSERT INVENTORY
INSERT INTO inventory(serial, model, description, photo, colour, sold_at, price, user_id, brand_id, type_id, status_id, created_at, modified_at) 
values ('1245A', 'XCFG', 'Portatil Intel Core i5', 'https://bit.ly/3wpIiw8', 'Azul Oscuro', '2022-01-01', 
2300000, 1, 4, 1, 1, now(), now());
INSERT INTO inventory(serial, model, description, photo, colour, sold_at, price, user_id, brand_id, type_id, status_id, created_at, modified_at) 
values ('1245B', 'XCFK', 'Pantalla 24 Pulgadas', 'https://bit.ly/3wklzBL', 'Negro Carbon', '2021-12-01', 
850000, 1, 4, 1, 1, now(), now());
INSERT INTO inventory(serial, model, description, photo, colour, sold_at, price, user_id, brand_id, type_id, status_id, created_at, modified_at) 
values ('1247XZ', 'XCFIO', 'Computador escritorio All-in-One', 'https://bit.ly/37TMmeO', 'Negro', '2022-02-28', 
3620000, 5, 5, 3, 1, now(), now());
INSERT INTO inventory(serial, model, description, photo, colour, sold_at, price, user_id, brand_id, type_id, status_id, created_at, modified_at) 
values ('1245XX', 'ER 100S 4E V1', 'Estiba Plastica Er 100s 4e V1', 'https://bit.ly/3PtojnP', 'Azul', '2022-03-12', 
259800, 2, 7, 1, 5, now(), now());
INSERT INTO inventory(serial, model, description, photo, colour, sold_at, price, user_id, brand_id, type_id, status_id, created_at, modified_at) 
values ('ZXSD', 'RRSS B21', 'iPhone 12 MAX', 'https://bit.ly/38t3gkZ', 'Blanco', '2022-04-19', 
7850000, 3, 8, 2, 4, now(), now());