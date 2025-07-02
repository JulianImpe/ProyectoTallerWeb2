import { TipoProducto } from "../../generated/prisma";

export interface ProductoDTO {
    nombre: string;
    precio: number;
    stock: number;
    descripcion: string;
    imagen: string;
    clasificacion: string;
    tipoProducto: number;
}
