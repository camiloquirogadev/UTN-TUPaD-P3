import {
  getCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getTotal,
  getCartCount,
} from "../../../utils/cart";

const cartContent = document.querySelector<HTMLDivElement>("#cart-content");
const cartBadge = document.querySelector<HTMLSpanElement>("#cart-badge");

// actualiza el número del badge del carrito
const actualizarBadge = (): void => {
  if (cartBadge) cartBadge.textContent = String(getCartCount());
};

// dibuja el carrito completo (vacío o con ítems)
const renderCarrito = (): void => {
  if (!cartContent) return;

  const items = getCart();

  if (items.length === 0) {
    cartContent.innerHTML = `
      <div class="cart-vacio">
        <p><i class="fa-solid fa-basket-shopping"></i></p>
        <p class="cart-vacio-texto">Tu carrito está vacío.</p>
        <p><a href="../home/home.html">Volver al catálogo</a></p>
      </div>
    `;
    actualizarBadge();
    return;
  }

  let html = "";
  items.forEach((item) => {
    const subtotal = item.product.precio * item.cantidad;
    html += `
      <div class="cart-item" data-id="${item.product.id}">
        <img src="/img/${item.product.imagen}" alt="${item.product.nombre}"
             onerror="this.src='https://placehold.co/70x70/ff6347/ffffff?text=${encodeURIComponent(item.product.nombre.charAt(0))}'">
        <div class="cart-item-info">
          <h3>${item.product.nombre}</h3>
          <p class="precio-unit">$${item.product.precio.toLocaleString("es-AR")} c/u</p>
        </div>
        <div class="cart-controls">
          <button class="btn-menos">−</button>
          <span class="cantidad">${item.cantidad}</span>
          <button class="btn-mas">+</button>
        </div>
        <div class="cart-subtotal">$${subtotal.toLocaleString("es-AR")}</div>
        <button class="btn-eliminar" title="Eliminar"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;
  });

  html += `
    <div class="cart-footer">
      <button class="btn-vaciar" id="btn-vaciar">Vaciar carrito</button>
      <div class="cart-total">Total: <span>$${getTotal().toLocaleString("es-AR")}</span></div>
    </div>
  `;

  cartContent.innerHTML = html;
  actualizarBadge();
  asignarEventos();
};

// asigna los eventos de cantidad y eliminación a cada ítem del carrito
const asignarEventos = (): void => {
  if (!cartContent) return;

  const itemsDOM = cartContent.querySelectorAll<HTMLDivElement>(".cart-item");

  itemsDOM.forEach((itemEl) => {
    const id = Number(itemEl.dataset.id);
    const cantidadActual = getCart().find((i) => i.product.id === id)?.cantidad ?? 1;

    itemEl.querySelector(".btn-mas")?.addEventListener("click", () => {
      updateQuantity(id, cantidadActual + 1);
      renderCarrito();
    });

    itemEl.querySelector(".btn-menos")?.addEventListener("click", () => {
      updateQuantity(id, cantidadActual - 1);
      renderCarrito();
    });

    itemEl.querySelector(".btn-eliminar")?.addEventListener("click", () => {
      removeFromCart(id);
      renderCarrito();
    });
  });

  cartContent.querySelector("#btn-vaciar")?.addEventListener("click", () => {
    clearCart();
    renderCarrito();
  });
};

// inicio
renderCarrito();
