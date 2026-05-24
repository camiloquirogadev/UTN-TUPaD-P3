import { PRODUCTS, getCategories } from "../../../data/data";
import type { Product } from "../../../types/product";
import { addToCart, getCartCount } from "../../../utils/cart";

// elementos del DOM
const contenedor = document.querySelector<HTMLElement>("#contenedor-productos");
const listaCategorias = document.querySelector<HTMLUListElement>("#lista-categorias");
const inputBusqueda = document.querySelector<HTMLInputElement>("#input-busqueda");
const titulo = document.querySelector<HTMLHeadingElement>("#titulo-catalogo");
const cartBadge = document.querySelector<HTMLSpanElement>("#cart-badge");
const toast = document.querySelector<HTMLDivElement>("#toast");

// estado de filtros
let categoriaActiva: number | null = null; // null = mostrar todas
let textoBusqueda = "";

// muestra un mensaje flotante por 2 segundos
const mostrarToast = (mensaje: string): void => {
  if (!toast) return;
  toast.innerHTML = mensaje;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
};

// actualiza el número del badge del carrito
const actualizarBadge = (): void => {
  if (cartBadge) cartBadge.textContent = String(getCartCount());
};

// carga las categorías en el aside y maneja el filtro activo
const cargarCategorias = (): void => {
  if (!listaCategorias) return;
  const categorias = getCategories();

  const liTodas = document.createElement("li");
  liTodas.innerHTML = `<button class="active" data-id="todas">Todas</button>`;
  listaCategorias.appendChild(liTodas);

  categorias.forEach((cat) => {
    const li = document.createElement("li");
    li.innerHTML = `<button data-id="${cat.id}">${cat.nombre}</button>`;
    listaCategorias.appendChild(li);
  });

  listaCategorias.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== "BUTTON") return;

    listaCategorias
      .querySelectorAll("button")
      .forEach((b) => b.classList.remove("active"));
    target.classList.add("active");

    const id = target.dataset.id;
    categoriaActiva = id === "todas" ? null : Number(id);
    renderProductos();
  });
};

// devuelve los productos que coinciden con la categoría y búsqueda activas
const filtrarProductos = (): Product[] => {
  return PRODUCTS.filter((p) => {
    const coincideCategoria =
      categoriaActiva === null ||
      p.categorias.some((c) => c.id === categoriaActiva);

    const coincideBusqueda = p.nombre
      .toLowerCase()
      .includes(textoBusqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda && !p.eliminado;
  });
};

// dibuja las tarjetas de producto en la grilla
const renderProductos = (): void => {
  if (!contenedor) return;
  contenedor.innerHTML = "";

  const productos = filtrarProductos();

  if (titulo) {
    titulo.textContent =
      categoriaActiva === null
        ? "Todos los productos"
        : getCategories().find((c) => c.id === categoriaActiva)?.nombre ??
          "Productos";
  }

  if (productos.length === 0) {
    contenedor.innerHTML = `<p class="sin-resultados">No se encontraron productos que coincidan con tu búsqueda.</p>`;
    return;
  }

  productos.forEach((producto) => {
    const article = document.createElement("article");
    article.classList.add("tarjeta-producto");

    const agotado = !producto.disponible || producto.stock === 0;

    article.innerHTML = `
      <img src="/img/${producto.imagen}" alt="${producto.nombre}"
           onerror="this.src='https://placehold.co/300x200/ff6347/ffffff?text=${encodeURIComponent(producto.nombre)}'">
      <div class="tarjeta-info">
        <h3>${producto.nombre}</h3>
        <p class="desc">${producto.descripcion}</p>
        <p class="precio">$${producto.precio.toLocaleString("es-AR")}</p>
        ${agotado ? '<p class="stock-agotado">Sin stock</p>' : ""}
        <button class="btn-agregar" ${agotado ? "disabled" : ""}>
          ${agotado ? "No disponible" : "Agregar al carrito"}
        </button>
      </div>
    `;

    const boton = article.querySelector<HTMLButtonElement>(".btn-agregar");
    boton?.addEventListener("click", () => {
      addToCart(producto);
      actualizarBadge();
      mostrarToast(`<i class="fa-solid fa-circle-check"></i> "${producto.nombre}" agregado al carrito`);
    });

    contenedor.appendChild(article);
  });
};

// filtra en tiempo real al escribir en el buscador
inputBusqueda?.addEventListener("input", (_event: Event) => {
  textoBusqueda = inputBusqueda.value.trim();
  renderProductos();
});

// inicio
cargarCategorias();
renderProductos();
actualizarBadge();
