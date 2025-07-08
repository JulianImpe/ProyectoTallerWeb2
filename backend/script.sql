//Tipo productos
INSERT INTO TipoProducto (nombre) VALUES 
  ('Café en Granos'),
  ('Filtros'),
  ('Cápsulas'),
  ('Cafeteras'),
  ('Café Torrado'),
  ('Molinillos'),
  ('Accesorios');

INSERT INTO producto (`nombre`,`descripcion`,`clasificacion`,`precio`,`createdAt`,`updatedAt`,`stock`,`imagen`,`tipoProductoId`) VALUES ('Bolsa-Fly','Bolsa con café importado desde brasil, listo para su preparación.','cafe',10000,'0025-06-14 10:30:00.000','0025-06-14 11:30:00.000',2,'/images/bolsa_fly.jpg', 1);
INSERT INTO producto (`nombre`,`descripcion`,`clasificacion`,`precio`,`createdAt`,`updatedAt`,`stock`,`imagen`,`tipoPrtipoProductoIdoducto`) VALUES ('Filtro de café premiun.','Filtro de café para café premiun y cafeteras de cafe instantaneo.','filtro',8000,'0025-06-14 10:30:00.000','0025-06-14 12:30:00.000',6,'/images/Filtro_cafe_premiun.jpg',2);
INSERT INTO producto (`nombre`,`descripcion`,`clasificacion`,`precio`,`createdAt`,`updatedAt`,`stock`,`imagen`,`tipoProductoId`) VALUES ('Cafeterita italiana biaretti','Cafetera mini italiana Bialetti, perfecta para la preparacion de café torrado.','cafetera',35000,'0025-06-20 12:40:00.000','0025-06-20 12:41:00.000',5,'/images/cafeterita_bialetti.jpg',4);
INSERT INTO producto (`nombre`,`descripcion`,`clasificacion`,`precio`,`createdAt`,`updatedAt`,`stock`,`imagen`,`tipoProductoId`) VALUES ('Cafetera de filtro','Cafetera de vidrio para filtro de papel, para los mejores cafés recien hechos después de la comida','cafetera2',75000,'0025-06-20 12:42:00.000','0025-06-20 12:44:00.000',5,'/images/cafetera_de_filtro_ronan.jpg',4);
