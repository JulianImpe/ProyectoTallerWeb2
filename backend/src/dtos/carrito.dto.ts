export interface CarritoDTO {
    id: number;
    id_usuario: number;
    items: ItemCarritoDTO[];
}

export interface ItemCarritoDTO {
    id_item: number;
    id_producto: number;
    id_carrito: number;
    nombre: string;
    precio: number;
    imagen: string;
    cantidad: number;
}
