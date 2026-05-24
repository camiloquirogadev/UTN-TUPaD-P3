# Food Store — Evaluación Parcial 1 Programación III

**Alumno:** Camilo Quiroga  
**Materia:** Programación III — Tecnicatura Universitaria en Programación (UTN)

---

## Descripción

Food Store es una aplicación de catálogo de comidas desarrollada con Vite y TypeScript, sin frameworks. Permite explorar productos, buscarlos por nombre, filtrarlos por categoría y armar un carrito de compras que se guarda en `localStorage`.

Desarrollado exclusivamente con HTML5, CSS3 y TypeScript. No se usaron frameworks (React, Angular, etc.). Vite se usa solo como herramienta de build.

Funcionalidades incluidas:

- Catálogo dinámico con tarjetas de producto
- Búsqueda por nombre en tiempo real
- Filtrado por categoría desde el menú lateral
- Carrito con persistencia en localStorage (agregar, modificar cantidad, eliminar)
- Cálculo automático del total
- Badge con cantidad de ítems y toast de confirmación al agregar

---

## Estructura del proyecto

```
src/
├── pages/
│   └── store/
│       ├── home/
│       │   ├── home.html    ← catálogo de productos
│       │   └── home.ts      ← lógica: render, búsqueda, filtros
│       └── cart/
│           ├── cart.html    ← vista del carrito
│           └── cart.ts      ← lógica: render, cantidades, total
├── types/
│   ├── product.ts           ← interfaces Product y CartItem
│   └── categoria.ts         ← interface ICategory
└── data/
    └── data.ts              ← PRODUCTS y getCategories()
```

---

## Cómo ejecutar

Necesitás tener Node.js instalado.

```bash
npm install
npm run dev
```

El proyecto queda disponible en `http://localhost:5173`.

Si usás pnpm:

```bash
pnpm install
pnpm dev
```
