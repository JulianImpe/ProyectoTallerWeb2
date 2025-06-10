import { PrismaClient, Usuario } from "../../generated/prisma";
import UsuarioDTO from "../dtos/usuario.dto";
export class UsuarioService {
  private prisma = new PrismaClient();
  public async crearUsuario(usuario: UsuarioDTO): Promise<Usuario> {
    try {
      const newUser = await this.prisma.usuario.create({
        data: {
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          contrasena: usuario.contraseña,
          direccion: usuario.direccion,
        },
      });
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Internal server error");
    }
  }

  public async obtenerUsuarios(): Promise<Usuario[]> {
    try {
      const users = await this.prisma.usuario.findMany({});
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Internal server error");
    }
  }
}
