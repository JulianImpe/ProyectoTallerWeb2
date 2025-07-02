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