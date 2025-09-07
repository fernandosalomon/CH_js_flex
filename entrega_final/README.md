# SandwichMania

## 📦 Entrega Final – Curso JavaScript Flex (CoderHouse)

**Autor:** Fernando F. Salomón  
**Repositorio:** [GitHub - Entrega Final](https://github.com/fernandosalomon/CH_js_flex/tree/main/entrega_final)

---

## 📜 Descripción general

**SandwichMania** es un simulador de e-commerce para la venta de sándwiches, desarrollado como parte del curso **JavaScript Flex** de CoderHouse.  
El proyecto aplica conceptos de:

- Funciones de orden superior
- Manipulación de DOM
- Manejo de JSON
- Arrays y objetos
- Almacenamiento en `localStorage`

El objetivo es ofrecer una experiencia interactiva en la que el usuario pueda armar su propio sándwich seleccionando el tamaño y los ingredientes, y obtener un cálculo dinámico del precio final.

---

## 🚀 Flujo de uso

1. **Inicio**

   - Página principal con _navbar_, _footer_, mensaje de bienvenida y botón para iniciar el simulador.

2. **Selección del pedido**

   - El usuario elige el **tamaño** del sándwich (_Normal_ o _Grande_).
   - Selecciona ingredientes en 5 categorías:
     1. Pan
     2. Proteína
     3. Quesos
     4. Agregados
     5. Aderezos
   - El simulador valida que se cumpla el número permitido de selecciones en cada categoría.

3. **Carrito**

   - Se muestra un carrito con los diferentes sandwitches armados correspondientes al pedido. Se muestra un panel con el precio sin IVA, el IVA y el precio final con IVA. Hay un botón de llamado a la acción para confirmar el pedido.

4. **Pantalla final**
   - Mensaje de agradecimiento.
   - Instrucciones para retirar y pagar el pedido en el mostrador.
   - Utiliza la libreria Sweetalert2 (https://sweetalert2.github.io/)

---

## 🛠️ Estructura del proyecto

```
SandwichMania/
├── index.html # Página principal
├── js/
│ ├── app.js # Lógica principal del simulador
├── css/
│ └── style.css # Framework CSS Bootstrap
├── db/
│ └── ingredients.json # Archivo JSON con la lista de ingredientes, precios y categorias
│ └── options.json # Archivo JSON con las opciones de ingredientes
├── img/
└── README.md
```

---

## 📂 Componentes principales

### HTML (`index.html`)

- Contiene la estructura base: _navbar_, _footer_, descripción del negocio y botón de inicio.
- Punto de montaje para la interfaz dinámica del simulador.

### JavaScript

- **`js/app.js`**
  - Controla la lógica del simulador.
  - Carga dinámica de ingredientes en el DOM.
  - Validación de selección de ingredientes.
  - Control del estado de los botones.
  - Cálculo del precio sin IVA en tiempo real.
  - Pide de manera asincrónica los datos de ingredientes y opciones usando fetch().

### CSS

- Utiliza **Bootstrap** para la maquetación y estilos.
- Personalización mínima en estilos propios.

---

## 💾 Manejo de datos

- Los datos de ingredientes y opciones disponibles se obtienen de manera asincrónica utilizando la función fetch(), simulando un pedido de datos a una base de datos.

---

## 📌 Características clave

- Interfaz dinámica con manipulación del DOM.
- Validación en tiempo real de las elecciones del usuario.
- Cálculo automático del precio según ingredientes seleccionados.
- Persistencia de datos usando almacenamiento web.
- Flujo completo de compra desde la selección hasta la confirmación final.

---

## 📜 Licencia

Este proyecto se desarrolló con fines educativos como parte del curso **JavaScript Flex** de CoderHouse.
