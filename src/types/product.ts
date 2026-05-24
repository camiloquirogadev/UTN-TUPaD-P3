import type { ICategory } from "./categoria";

export interface Product {
  readonly id: number;
  eliminado: boolean;
  readonly createdAt: string;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
  imagen: string;
  disponible: boolean;
  categorias: ICategory[];
}

export interface CartItem {
  product: Product;
  cantidad: number;
}
