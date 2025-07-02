import { Router } from "express";
import { ProductoService } from "../../services/producto.service";
import { ProductoController } from "../../controller/producto.controller";

export const productoRouter = Router();

const productoService = new ProductoService();
const productoController = new ProductoController(productoService);

productoRouter.get('/', productoController.obtenerProductos.bind(productoController));
productoRouter.post('/', productoController.crearProducto.bind(productoController));
productoRouter.get('/tipo/:tipoProducto', productoController.obtenerProductosPorTipoProducto.bind(productoController));
productoRouter.get('/tipos', productoController.obtenerTiposDeProducto.bind(productoController));