import { PrismaClient, Usuario } from "../../generated/prisma";
import { cifrarContraseña, compararContraseñas } from "../auth/bcrypt";
import { createToken, DatosEncriptados, decodeToken } from "../auth/jwt";
import { CarritoDTO } from "../dtos/carrito.dto";
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
          rol: "user",
        },
      });
      const userId = newUser.id;
      await this.prisma.carrito.create({
        data: {
          usuarioId: userId,
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
      if (user && (await compararContraseñas(contraseña, user.contrasena))) {
        return await createToken({
          id: user.id,
          email: user.email,
          rol: user.rol,
        } as DatosEncriptados);
      } else return null;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw new Error("Internal server error");
    }
  }

  public async validarToken(token: string): Promise<Usuario | null> {
    try {
      const decoded = await decodeToken(token);
      if (!decoded) return null;
      const user = await this.prisma.usuario.findUnique({
        where: { email: decoded.email },
      });
      return user;
    } catch (error) {
      console.error("Error al validar el token:", error);
      throw new Error("Internal server error");
    }
  }

  public async obtenerCarritoPorUsuarioId(
    token: string
  ): Promise<CarritoDTO | null> {
    try {
      const { id } = await decodeToken(token);
      if (!id) return null;

      const carrito = await this.prisma.carrito.findUnique({
        where: { usuarioId: id },
        include: {
          items: {
            include: {
              producto: true,
            },
          },
        },
      });

      if (!carrito) return null;

      const carritoDTO: CarritoDTO = {
        id: carrito.id,
        id_usuario: carrito.usuarioId,
        items: carrito.items.map((item) => ({
          id_item: item.id,
          id_producto: item.producto.id,
          id_carrito: item.carritoId,
          nombre: item.producto.nombre,
          precio: item.producto.precio,
          imagen: item.producto.imagen,
          cantidad: item.cantidad,
        })),
      };

      return carritoDTO;
    } catch (error) {
      console.error("Error al obtener el carrito por usuario ID:", error);
      throw new Error("Internal server error");
    }
  }

  public async agregarAlCarrito(
    token: string,
    productoId: number
  ): Promise<CarritoDTO | null> {
    try {
      const { id } = await decodeToken(token);
      if (!id) return null;
      const carrito = await this.prisma.carrito.findUnique({
        where: { usuarioId: id },
        include: { items: true },
      });

      if (!carrito) return null;

      const existingItem = carrito.items.find(
        (item) => item.productoId === productoId
      );

      if (existingItem) {
        await this.prisma.itemCarrito.update({
          where: { id: existingItem.id },
          data: { cantidad: existingItem.cantidad + 1 },
        });
      } else {
        await this.prisma.itemCarrito.create({
          data: {
            carritoId: carrito.id,
            productoId,
            cantidad: 1,
          },
        });
      }

      return await this.obtenerCarritoPorUsuarioId(token);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      throw new Error("Internal server error");
    }
  }

  public async eliminarProductosDelCarrito(token: string){
    try {
      const { id } = await decodeToken(token);
      if (!id) return null;
      await this.prisma.itemCarrito.deleteMany({
        where: {
          carrito: {
            usuarioId: id
          }
        }
      });
      return await this.obtenerCarritoPorUsuarioId(token);
    } catch (error) {
      console.error("Error al eliminar productos del carrito:", error);
      throw new Error("Internal server error");
    }
  }

  public async eliminarProductoDelCarritoPorId(token: string, idItem: number){
    try {
      const { id } = await decodeToken(token);
      if (!id) return null;
      await this.prisma.itemCarrito.delete({
        where: {
          id: idItem
        }
      });
      return await this.obtenerCarritoPorUsuarioId(token);
    } catch (error) {
      console.error("Error al eliminar productos del carrito:", error);
      throw new Error("Internal server error");
    }
  }
}
