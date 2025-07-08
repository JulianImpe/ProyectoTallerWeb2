import { PrismaClient, Producto } from "../../generated/prisma";
import { ProductoDTO } from "../dtos/producto.dto";
import { TipoProducto } from "../../generated/prisma";//Nos traemos el tipo de producto desde prisma, ya que es un enum generado por Prisma.


export class ProductoService {
  private prisma = new PrismaClient();
  public async obtenerProductosPorNombre(nombre: string): Promise<Producto[]> {
    try {
      const productos = await this.prisma.producto.findMany({
        where: {
          nombre: {
            contains: nombre,
          },
        },
      });
      return productos;
    } catch (error) {
      console.error("Error al encontrar productos por nombre:", error);
      throw new Error("Internal server error");
    }
  }

  public async obtenerProductosPorDescripcion(descripcion: string): Promise<Producto[]> {
    try {
      const productos = await this.prisma.producto.findMany({
        where: {
          descripcion: {
            contains: descripcion,
          },
        },
      });
      return productos;
    } catch (error) {
      console.error("Error al encontrar productos por descripcion:", error);
      throw new Error("Internal server error");
    }
  }
  public async obtenerProductosPorRangoPrecio(precioMinimo: number, precioMaximo: number): Promise<Producto[]> {
    try {
      console.log("Buscando productos con precio entre:", precioMinimo, "y", precioMaximo);
      const productos = await this.prisma.producto.findMany({
        where: {
          precio: {
            gte: precioMinimo,//Mayor que o igual
            lte: precioMaximo,//Menor que o igual
          },
        },
      });
      return productos;
    } catch (error) {
      console.error("Error al encontrar productos por precio:", error);
      throw new Error("Internal server error");
    }
  }
  public async obtenerProductosPorStock(stock: number): Promise<Producto[]> {
    try {
      const productos = await this.prisma.producto.findMany({
        where: {
          stock: {
            equals: stock,
          },
        },
      });
      return productos;
    } catch (error) {
      console.error("Error al encontrar productos por stock:", error);
      throw new Error("Internal server error");
    }
  }

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
      const tipo = await this.prisma.tipoProducto.findUnique({
        where: {
          id: producto.tipoProducto,
        },
      });
      const newProduct = await this.prisma.producto.create({
        data: {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          stock: producto.stock,
          imagen: producto.imagen,
          clasificacion: producto.clasificacion,
          tipoProducto: {
            connect: {
              id: producto.tipoProducto,
            },
          },
        },
      });
      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Internal server error");
    }
  }


  public async obtenerProductosPorTipoProducto(tipoProducto: string): Promise<Producto[]> {
    try {
      const listaProductosPorTipo = await this.prisma.producto.findMany({
        where: {
          tipoProducto: {
            nombre: tipoProducto
          }
        }
      });
      return listaProductosPorTipo;
    } catch (error) {
      console.error("Error fetching products by type:", error);
      throw new Error("Internal server error");
    }
  }

  public async obtenerTiposDeProducto() {
    try {
      const tipos = await this.prisma.tipoProducto.findMany({});
      return tipos;
    } catch (error) {
      console.error("Error fetching products by type:", error);
      throw new Error("Internal server error");
    }
  }

  public async obtenerProductoPorId(id: number): Promise<Producto | null> {
    try {
      const producto = await this.prisma.producto.findUnique({
        where: { id },
      });
      return producto;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw new Error("Internal server error");
    }
  }

  public async actualizarProductoPorId(id: number, producto: ProductoDTO): Promise<Producto> {
    try {
      const updatedProduct = await this.prisma.producto.update({
        where: { id },
        data: {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          stock: producto.stock,
          imagen: producto.imagen,
          clasificacion: producto.clasificacion,
          tipoProducto: {
            connect: {
              id: producto.tipoProducto,
            },
          },
        },
      });
      return updatedProduct;
    } catch (error) {
      console.error("Error updating product by ID:", error);
      throw new Error("Internal server error");
    }
  }

  public async eliminarProductoPorId(id: number): Promise<Producto> {
    try {
      const deletedProduct = await this.prisma.producto.delete({
        where: { id }
      });
      return deletedProduct;
    } catch (error: any) {
      console.error('Error deleting product by ID:', error);

      if (error.code === 'P2003') {
        throw new Error(
          'No se pudo eliminar el producto porque se encuentra en el carrito de algún usuario.'
        );
      }

      throw new Error('Internal server error');
    }
  }

}


