import { ProductoDTO } from "../dtos/producto.dto";
import { ProductoService } from "../services/producto.service";
import { Request, Response } from "express";

export class ProductoController {
    constructor(private productoService: ProductoService) { }
    public crearProducto = async (req: Request, res: Response) => {
        try {
            const { nombre, descripcion, precio, stock, imagen, clasificacion } = req.body;
            const producto: ProductoDTO = {
                nombre,
                descripcion,
                precio,
                stock,
                imagen,
                clasificacion
            };
            const newProducto = await this.productoService.crearProducto(producto)
            res.status(201).json(newProducto);
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    public obtenerProductos = async (req: Request, res: Response) => {
        try {
            const productos = await this.productoService.obtenerProductos();
            res.status(200).json(productos);
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };
}