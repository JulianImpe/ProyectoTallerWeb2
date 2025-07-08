import { Router } from "express";
import { UsuarioController } from "../../controller/usuario.controller";
import { UsuarioService } from "../../services/usuario.service";
import { authMiddleware, rolMiddleware } from "../../middlewares/auth.middleware";

export const usuarioRouter = Router();

const usuarioService = new UsuarioService();
const usuarioController = new UsuarioController(usuarioService);
usuarioRouter.get('/',  authMiddleware, rolMiddleware(['admin']), usuarioController.obtenerUsuarios.bind(usuarioController));
usuarioRouter.post('/', usuarioController.crearUsuario.bind(usuarioController));
usuarioRouter.post('/email', usuarioController.obtenerUsuarioPorEmail.bind(usuarioController));
usuarioRouter.post('/login', usuarioController.iniciarSesion.bind(usuarioController));
usuarioRouter.post('/actualizar', usuarioController.actualizarContraseña.bind(usuarioController));
usuarioRouter.post('/validar-token', usuarioController.validarToken.bind(usuarioController));
usuarioRouter.get('/carrito', usuarioController.obtenerCarritoPorUsuarioId.bind(usuarioController));
usuarioRouter.post('/agregar-al-carrito', usuarioController.agregarAlCarrito.bind(usuarioController));
usuarioRouter.delete('/carrito', usuarioController.eliminarProductosDelCarrito.bind(usuarioController));
usuarioRouter.delete('/carrito/:id', usuarioController.eliminarProductoDelCarritoPorId.bind(usuarioController));

