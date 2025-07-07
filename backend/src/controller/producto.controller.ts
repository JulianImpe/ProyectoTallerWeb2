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
                tipoProducto 
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
            const { tipoProducto } = req.params;
            const listaProductosPorTipo = await this.productoService.obtenerProductosPorTipoProducto(tipoProducto as TipoProducto);
        res.status(200).json(listaProductosPorTipo);
        } catch (error) {
                        console.error("Error al traer los productos por tipo:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    public obtenerProductosPorNombre = async(req: Request, res:Response) =>{
        try { 
            const { nombre } = req.params;
            const listaProductosPorNombre = await this.productoService.obtenerProductosPorNombre(nombre);
        res.status(200).json(listaProductosPorNombre);
        } catch (error) {
                        console.error("Error al traer los productos por tipo:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    public obtenerProductosPorRangoPrecio = async(req: Request, res:Response) =>{
        try { 
            const { precioMinimo } = req.params;
            const { precioMaximo } = req.params;
            const listaProductosPorRangoPrecio = await this.productoService.obtenerProductosPorRangoPrecio(Number(precioMinimo), Number(precioMaximo));
        res.status(200).json(listaProductosPorRangoPrecio);
        } catch (error) {
                        console.error("Error al traer los productos por precio:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    public obtenerProductosPorDescripcion = async(req: Request, res:Response) =>{
        try { 
            const { descripcion } = req.params;
            const listaProductosPorTipo = await this.productoService.obtenerProductosPorDescripcion(descripcion);
        res.status(200).json(listaProductosPorTipo);
        } catch (error) {
                        console.error("Error al traer los productos por descripcion:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    public obtenerProductosPorStock = async(req: Request, res:Response) =>{
        try { 
            const { stock } = req.params;
            const listaProductosPorTipo = await this.productoService.obtenerProductosPorStock(Number(stock));
        res.status(200).json(listaProductosPorTipo);
        } catch (error) {
                        console.error("Error al traer los productos por stock:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    public obtenerProductoPorId = async(req: Request, res:Response) =>{
        try { 
            const { id } = req.params;
            const productoBuscado = await this.productoService.obtenerProductoPorId(Number(id));
        res.status(200).json(productoBuscado);
        } catch (error) {
                        console.error("Error al traer el producto por id", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}