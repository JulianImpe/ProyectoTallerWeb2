import { TipoProducto } from "../../generated/prisma";
import { ProductoDTO } from "../dtos/producto.dto";
import { ProductoService } from "../services/producto.service";
import { Request, Response } from "express";

export class ProductoController {
    constructor(private productoService: ProductoService) { }
    public crearProducto = async (req: Request, res: Response) => {
        try {
            const { nombre, descripcion, precio, stock, imagen, clasificacion, tipoProducto } = req.body;
            const producto: ProductoDTO = {
                nombre,
                descripcion,
                precio,
                stock,
                imagen,
                clasificacion,
                tipoProducto: Number(tipoProducto)
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
    public obtenerProductosPorTipoProducto = async(req: Request, res:Response) =>{
        try { 
        const { tipoProductoId } = req.params;
        const listaProductosPorTipo = await this.productoService.obtenerProductosPorTipoProducto(Number(tipoProductoId));
        res.status(200).json(listaProductosPorTipo);
        } catch (error) {
                        console.error("Error al traer los productos por tipo:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    public obtenerTiposDeProducto = async(req: Request, res: Response) => {
        try {
            const tipos = await this.productoService.obtenerTiposDeProducto();
            res.status(200).json(tipos);
        } catch (error) {
            console.error("Error al obtener los tipos de producto:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    public obtenerProductoPorId = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const producto = await this.productoService.obtenerProductoPorId(Number(id));
            if (!producto) {
                res.status(404).json({ error: "Product not found" });
            }
            res.status(200).json(producto);
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    public actualizarProductoPorId = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { nombre, descripcion, precio, stock, imagen, clasificacion, tipoProducto } = req.body;
            const producto: ProductoDTO = {
                nombre,
                descripcion,
                precio,
                stock,
                imagen,
                clasificacion,
                tipoProducto: Number(tipoProducto)
            };
            const updatedProducto = await this.productoService.actualizarProductoPorId(Number(id), producto);
            if (!updatedProducto) {
                res.status(404).json({ error: "Product not found" });
            }
            res.status(200).json(updatedProducto);
        } catch (error) {
            console.error("Error updating product by ID:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    public eliminarProductoPorId = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deletedProducto = await this.productoService.eliminarProductoPorId(Number(id));
            if (!deletedProducto) {
                res.status(404).json({ error: "Product not found" });
            }
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            console.error("Error deleting product by ID:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}