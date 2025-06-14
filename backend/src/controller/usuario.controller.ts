import { Request, Response } from "express";
import { UsuarioService } from "./../services/usuario.service";
import UsuarioDTO from "../dtos/usuario.dto";

export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  public crearUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre, apellido, email, contraseña, direccion } = req.body;

      if(!nombre || !apellido || !email || !contraseña || !direccion) res.status(400).json({ error: "Todos los campos son obligatorios" });

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

  public obtenerUsuarios = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const users = await this.usuarioService.obtenerUsuarios();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public obtenerUsuarioPorEmail = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { email } = req.body;
      if(!email) res.status(400).json({ error: "Email es obligatorio" });

      const user = await this.usuarioService.obtenerUsuarioPorEmail(email);

      if (!user) res.status(404).json({ error: "Usuario no encontrado" });
      else res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public iniciarSesion = async (req: Request, res: Response) => {
    try {
      const { email, contraseña } = req.body;
      if (!email || !contraseña)
        res.status(400).json({ error: "Email y contraseña son obligatorios" });

      const user = await this.usuarioService.iniciarSesion(email, contraseña);

      if (!user) res.status(401).json({ error: "Credenciales incorrectas" });
      else res.status(200).json(user);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public actualizarContraseña = async (req: Request, res: Response) => {
    try {
      const { email, nuevaContraseña } = req.body;
      if (!email || !nuevaContraseña)
        res.status(400).json({ error: "Email y contraseña son obligatorios" });

      const user = await this.usuarioService.actualizarContraseña(
        email,
        nuevaContraseña
      );
      if (!user) res.status(404).json({ error: "Usuario no encontrado" });
      else res.status(200).json(user);
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
