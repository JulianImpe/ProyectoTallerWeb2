import { Router } from "express";
import { UsuarioController } from "../../controller/usuario.controller";
import { UsuarioService } from "../../services/usuario.service";

export const usuarioRouter = Router();

const usuarioService = new UsuarioService();
const usuarioController = new UsuarioController(usuarioService);
usuarioRouter.get('/', usuarioController.obtenerUsuarios.bind(usuarioController));
usuarioRouter.post('/', usuarioController.crearUsuario.bind(usuarioController));