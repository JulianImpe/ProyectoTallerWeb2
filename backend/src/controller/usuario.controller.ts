import { Request, Response } from "express";
import { UsuarioService } from "./../services/usuario.service";
import UsuarioDTO from "../dtos/usuario.dto";

export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  public crearUsuario = async (req: Request, res: Response) => {
    try {
      const { nombre, apellido, email, contraseña, direccion } = req.body;
      const usuario: UsuarioDTO = {
        nombre,
        apellido,
        email,
        contraseña,
        direccion,
      };

      const newUser = await this.usuarioService.crearUsuario(usuario);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public obtenerUsuarios = async (req: Request, res: Response) => {
    try {
      const users = await this.usuarioService.obtenerUsuarios();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
