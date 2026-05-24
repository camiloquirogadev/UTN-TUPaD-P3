import type { Product, CartItem } from "../types/product";

const CART_KEY = "cart";

// lee el carrito desde localStorage
export const getCart = (): CartItem[] => {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? (JSON.parse(raw) as CartItem[]) : [];
};

// guarda el carrito en localStorage
const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// agrega un producto; si ya existe, incrementa la cantidad
export const addToCart = (product: Product): void => {
  const cart = getCart();
  const existente = cart.find((item) => item.product.id === product.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    cart.push({ product, cantidad: 1 });
  }

  saveCart(cart);
};

// elimina un producto del carrito por su id
export const removeFromCart = (productId: number): void => {
  const cart = getCart().filter((item) => item.product.id !== productId);
  saveCart(cart);
};

// cambia la cantidad de un producto (mínimo 1)
export const updateQuantity = (productId: number, cantidad: number): void => {
  const cart = getCart();
  const item = cart.find((i) => i.product.id === productId);
  if (item) {
    item.cantidad = cantidad < 1 ? 1 : cantidad;
    saveCart(cart);
  }
};

// vacia el carrito por completo
export const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};

// calcula el total sumando precio × cantidad de cada ítem
export const getTotal = (): number => {
  return getCart().reduce(
    (total, item) => total + item.product.precio * item.cantidad,
    0
  );
};

// devuelve la cantidad total de ítems para el badge
export const getCartCount = (): number => {
  return getCart().reduce((count, item) => count + item.cantidad, 0);
};
