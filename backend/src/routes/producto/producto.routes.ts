import { Router } from "express";
import { ProductoService } from "../../services/producto.service";
import { ProductoController } from "../../controller/producto.controller";

export const productoRouter = Router();

const productoService = new ProductoService();
const productoController = new ProductoController(productoService);

productoRouter.get('/', productoController.obtenerProductos.bind(productoController));
productoRouter.post('/', productoController.crearProducto.bind(productoController));
productoRouter.post('/tipo', productoController.obtenerProductosPorTipoProducto.bind(productoController));
productoRouter.get('/tipos', productoController.obtenerTiposDeProducto.bind(productoController));
productoRouter.get('/:id', productoController.obtenerProductoPorId.bind(productoController));
productoRouter.get('/nombre/:nombre', productoController.obtenerProductosPorNombre.bind(productoController));
productoRouter.get('/descripcion/:descripcion', productoController.obtenerProductosPorDescripcion.bind(productoController));
productoRouter.get('/precio/:precioMinimo/:precioMaximo', productoController.obtenerProductosPorRangoPrecio.bind(productoController));
productoRouter.put('/:id', productoController.actualizarProductoPorId.bind(productoController));
productoRouter.delete('/:id', productoController.eliminarProductoPorId.bind(productoController));