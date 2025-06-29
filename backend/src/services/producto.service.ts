import { PrismaClient, Producto } from "../../generated/prisma";
import { ProductoDTO } from "../dtos/producto.dto";
import { TipoProducto } from "../../generated/prisma";//Nos traemos el tipo de producto desde prisma, ya que es un enum generado por Prisma.


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

  public async obtenerProductoPorId(id:number): Promise<Producto> {
    try {
      const productoEncontrado = await this.prisma.producto.findUnique({
        where: {
          id:id
        }
      });
      if (!productoEncontrado) {
        throw new Error("Producto no encontrado");
      }
      return productoEncontrado;
    } catch (error) {
      console.error("Error no se encontro el producto por id:", error);
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
          tipoProducto: producto.tipoProducto, // Assuming tipoProducto is part of ProductoDTO
          // Assuming tipoProducto is part of ProductoDTO
        },
      });
      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Internal server error");
    }
  }


  public async obtenerProductosPorTipoProducto(tipoProducto: TipoProducto): Promise<Producto[]> {
    try {
      const listaProductosPorTipo = await this.prisma.producto.findMany({
        where: {
          tipoProducto: {
            equals: tipoProducto
          }
        }
      });
      return listaProductosPorTipo;
    } catch (error) {
      console.error("Error fetching products by type:", error);
      throw new Error("Internal server error");
    }
  }
}


