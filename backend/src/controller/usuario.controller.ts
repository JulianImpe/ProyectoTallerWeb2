import { Request, Response } from "express";
import { UsuarioService } from "./../services/usuario.service";
import UsuarioDTO from "../dtos/usuario.dto";

export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  public crearUsuario = async (req: Request, res: Response) => {
    try {
      const { nombre, apellido, email, contraseña, direccion } = req.body;

      if (!nombre || !apellido || !email || !contraseña || !direccion) {
        res.status(400).json({ error: "Todos los campos son obligatorios" });
        return;
      }

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

  public obtenerUsuarioPorEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      if (!email) {
        res.status(400).json({ error: "Email es obligatorio" });
        return;
      }

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
      if (!email || !contraseña) {
        res.status(400).json({ error: "Email y contraseña son obligatorios" });
        return;
      }

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
      if (!email || !nuevaContraseña) {
        res.status(400).json({ error: "Email y contraseña son obligatorios" });
        return;
      }

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

  public validarToken = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Token es obligatorio o inválido" });
        return;
      } else {
        const token = authHeader.split(" ")[1];

        const user = await this.usuarioService.validarToken(token);
        if (!user) res.status(401).json({ error: "Token inválido o expirado" });
        else res.status(200).json(user);
      }
    } catch (error) {
      console.error("Error al validar el token:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public obtenerCarritoPorUsuarioId = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
         res
          .status(401)
          .json({ error: "Token es obligatorio o inválido" });
          return;
      } else {
        const token = authHeader.split(" ")[1];
        const carrito = await this.usuarioService.obtenerCarritoPorUsuarioId(
          token
        );
        if (!carrito) res.status(404).json({ error: "Carrito no encontrado" });
        else res.status(200).json(carrito);
      }
    } catch (error) {
      console.error("Error al obtener el carrito por usuario ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public agregarAlCarrito = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res
          .status(401)
          .json({ error: "Token es obligatorio o inválido" });
        return;
      }

      const token = authHeader.split(" ")[1];
      const { id } = req.body;
      if (!token || !id) {
        res.status(400).json({ error: "Token y id de producto son obligatorios" });
      }
      const carrito = await this.usuarioService.agregarAlCarrito(
        token,
        id
      );
      if (!carrito) res.status(404).json({ error: "Carrito no encontrado" });
      else res.status(200).json(carrito);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
