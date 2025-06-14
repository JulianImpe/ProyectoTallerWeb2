import { PrismaClient, Producto } from "../../generated/prisma";
import { ProductoDTO } from "../dtos/producto.dto";

export class ProductoService {
  private prisma = new PrismaClient();

  public async obtenerProductos(): Promise<Producto[]> {
    try {
      const products = await this.prisma.producto.findMany({});
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Internal server error");
    }
  }

  public async crearProducto(producto: ProductoDTO): Promise<Producto> {
    try {
      const newProduct = await this.prisma.producto.create({
        data: {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          stock: producto.stock,
          imagen: producto.imagen,
          clasificacion: producto.clasificacion,
        },
      });
      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Internal server error");
    }
  }

  public async obtenerProductoPorId(id: number): Promise<Producto | null> {
    try {
      const product = await this.prisma.producto.findUnique({
        where: { id },
      });
      return product;
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      throw new Error("Internal server error");
    }
  }
}
