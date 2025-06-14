import { ProductoDTO } from "../dtos/producto.dto";
import { ProductoService } from "../services/producto.service";
import { Request, Response } from "express";

export class ProductoController {
  constructor(private productoService: ProductoService) {}

  public obtenerProductos = async (req: Request, res: Response) => {
    try {
      const products = await this.productoService.obtenerProductos();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public crearProducto = async (req: Request, res: Response) => {
    try {
      const { nombre, descripcion, precio, stock, imagen, clasificacion } =
        req.body;
      const producto: ProductoDTO = {
        nombre,
        descripcion,
        precio,
        stock,
        imagen,
        clasificacion,
      };

      const newProduct = await this.productoService.crearProducto(producto);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public obtenerProductoPorId = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const producto = await this.productoService.obtenerProductoPorId(id);
      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.status(200).json(producto);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
