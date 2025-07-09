//Tipo productos
-- Inserción de tipos de producto
INSERT INTO TipoProducto (nombre) VALUES 
  ('Café en Granos'),
  ('Filtros'),
  ('Cápsulas'),
  ('Cafeteras'),
  ('Café Torrado'),
  ('Molinillos'),
  ('Accesorios');

-- Productos: Café en Granos
INSERT INTO producto (`nombre`,`descripcion`,`clasificacion`,`precio`,`createdAt`,`updatedAt`,`stock`,`imagen`,`tipoProductoId`) VALUES 
('Bolsa-Fly', 'Bolsa con café importado desde Brasil, listo para su preparación.', 'cafe', 10000, '0025-06-14 10:30:00.000', '0025-06-14 11:30:00.000', 2, '/images/bolsa_fly.jpg', 1),
('Grano Oro', 'Café en granos premium de Colombia, tueste medio ideal para espresso.', 'cafe', 12000, '0025-06-14 10:45:00.000', '0025-06-14 11:45:00.000', 3, '/images/grano_oro.jpg', 1);

-- Productos: Filtros
INSERT INTO producto (`nombre`,`descripcion`,`clasificacion`,`precio`,`createdAt`,`updatedAt`,`stock`,`imagen`,`tipoProductoId`) VALUES 
('Filtro de café premium', 'Filtro de papel para cafeteras de goteo. Paquete de 50 unidades.', 'filtro', 8000, '0025-06-14 10:30:00.000', '0025-06-14 12:30:00.000', 6, '/images/filtro_premium.jpg', 2),
('Filtro reutilizable', 'Filtro de acero inoxidable para café sin residuos, lavable y duradero.', 'filtro', 9500, '0025-06-14 13:00:00.000', '0025-06-14 14:00:00.000', 4, '/images/filtro_reutilizable.jpg', 2);

-- Productos: Cápsulas
INSERT INTO producto (`nombre`,`descripcion`,`clasificacion`,`precio`,`createdAt`,`updatedAt`,`stock`,`imagen`,`tipoProductoId`) VALUES 
('Cápsulas Clásicas', 'Pack de 10 cápsulas de café tostado oscuro. Compatibles con Nespresso.', 'capsula', 15000, '0025-06-15 09:00:00.000', '0025-06-15 09:45:00.000', 10, '/images/capsulas_clasicas.jpg', 3),
('Cápsulas Descafeinadas', 'Café suave sin cafeína, ideal para la noche. Pack x10.', 'capsula', 14500, '0025-06-15 10:00:00.000', '0025-06-15 10:30:00.000', 8, '/images/capsulas_descafeinadas.jpg', 3);

-- Productos: Cafeteras
INSERT INTO producto (`nombre`,`descripcion`,`clasificacion`,`precio`,`createdAt`,`updatedAt`,`stock`,`imagen`,`tipoProductoId`) VALUES 
('Cafeterita italiana Bialetti', 'Cafetera mini italiana Bialetti, perfecta para la preparación de café torrado.', 'cafetera', 35000, '0025-06-20 12:40:00.000', '0025-06-20 12:41:00.000', 5, '/images/cafeterita_bialetti.jpg', 4),
('Cafetera de filtro', 'Cafetera de vidrio para filtro de papel, para los mejores cafés recién hechos después de la comida.', 'cafetera2', 75000, '0025-06-20 12:42:00.000', '0025-06-20 12:44:00.000', 5, '/images/cafetera_de_filtro_ronan.jpg', 4);

-- Productos: Café Torrado
INSERT INTO producto (`nombre`,`descripcion`,`clasificacion`,`precio`,`createdAt`,`updatedAt`,`stock`,`imagen`,`tipoProductoId`) VALUES  
('Café Torrado Clásico', 'Tostado argentino con notas dulces. Molido grueso.', 'cafe torrado', 9000, '0025-06-21 08:30:00.000', '0025-06-21 09:00:00.000', 7, '/images/cafe_torrado_clasico.jpg', 5),
('Café Torrado Intenso', 'Café oscuro y potente, ideal para amantes del sabor fuerte.', 'cafe torrado', 9500, '0025-06-21 09:15:00.000', '0025-06-21 09:45:00.000', 6, '/images/cafe_torrado_intenso.jpg', 5);

-- Productos: Molinillos
INSERT INTO producto (`nombre`,`descripcion`,`clasificacion`,`precio`,`createdAt`,`updatedAt`,`stock`,`imagen`,`tipoProductoId`) VALUES 
('Molinillo Manual', 'Molinillo de café con muelas cónicas, ajuste de molienda fino a grueso.', 'molino', 21000, '0025-06-22 10:00:00.000', '0025-06-22 10:30:00.000', 4, '/images/molinillo_manual.jpg', 6),
('Molinillo Eléctrico', 'Potente motor para moler hasta 12 tazas. Ideal para uso diario.', 'molino', 28000, '0025-06-22 11:00:00.000', '0025-06-22 11:30:00.000', 5, '/images/molinillo_electrico.jpg', 6);

-- Productos: Accesorios
INSERT INTO producto (`nombre`,`descripcion`,`clasificacion`,`precio`,`createdAt`,`updatedAt`,`stock`,`imagen`,`tipoProductoId`) VALUES 
('Cuchara medidora', 'Cuchara dosificadora de acero inoxidable para café molido.', 'accesorio', 4000, '0025-06-23 08:00:00.000', '0025-06-23 08:30:00.000', 10, '/images/cuchara_medidora.jpg', 7),
('Prensador de café', 'Prensador de aluminio para espresso. Base plana.', 'accesorio', 6000, '0025-06-23 09:00:00.000', '0025-06-23 09:30:00.000', 6, '/images/prensador_cafe.jpg', 7);

