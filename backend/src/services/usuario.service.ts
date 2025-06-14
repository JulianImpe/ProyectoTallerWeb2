import { PrismaClient, Usuario } from "../../generated/prisma";
import { cifrarContraseña, compararContraseñas } from "../auth/bcrypt";
import UsuarioDTO from "../dtos/usuario.dto";
export class UsuarioService {
  private prisma = new PrismaClient();
  public async crearUsuario(usuario: UsuarioDTO): Promise<Usuario> {
    try {
      const contraseñaCifrada = await cifrarContraseña(usuario.contraseña);
      const newUser = await this.prisma.usuario.create({
        data: {
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          contrasena: contraseñaCifrada,
          direccion: usuario.direccion,
        },
      });
      return newUser;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw new Error("Internal server error");
    }
  }

  public async obtenerUsuarios(): Promise<Usuario[]> {
    try {
      const users = await this.prisma.usuario.findMany({});
      return users;
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      throw new Error("Internal server error");
    }
  }

  public async obtenerUsuarioPorEmail(email: string): Promise<Usuario | null> {
    try {
      const user = await this.prisma.usuario.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error("Error al obtener el usuario por email:", error);
      throw new Error("Internal server error");
    }
  }

  public async actualizarContraseña(email: string, nuevaContraseña: string) {
    try {
      const contraseñaCifrada = await cifrarContraseña(nuevaContraseña);
      const user = await this.prisma.usuario.update({
        where: { email },
        data: {
          contrasena: contraseñaCifrada,
        },
      });
      return user;
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      throw new Error("Internal server error");
    }
  }

  public async iniciarSesion(email: string, contraseña: string) {
    try {
      const user = await this.prisma.usuario.findUnique({
        where: { email },
      });
      if (user && (await compararContraseñas(contraseña, user.contrasena)))
        return user;
      else return null;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw new Error("Internal server error");
    }
  }
}
