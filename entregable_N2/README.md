# SandwichMania

## 📦 Entregable N° 1 – Curso JavaScript Flex (CoderHouse)

**Autor:** Fernando F. Salomón  
**Repositorio:** [GitHub - Entregable N°2](https://github.com/fernandosalomon/CH_js_flex/tree/main/entregable_N2)  

---

## 📜 Descripción general

**SandwichMania** es un simulador de e-commerce para la venta de sándwiches, desarrollado como parte del curso **JavaScript Flex** de CoderHouse.  
El proyecto aplica conceptos de:

- Funciones de orden superior
- Manipulación de DOM
- Manejo de JSON
- Arrays y objetos
- Almacenamiento en `localStorage` y `sessionStorage`

El objetivo es ofrecer una experiencia interactiva en la que el usuario pueda armar su propio sándwich seleccionando el tamaño y los ingredientes, y obtener un cálculo dinámico del precio final.

---

## 🚀 Flujo de uso

1. **Inicio**
   - Página principal con *navbar*, *footer*, mensaje de bienvenida y botón para iniciar el simulador.

2. **Selección del pedido**
   - El usuario elige el **tamaño** del sándwich (*Normal* o *Grande*).
   - Selecciona ingredientes en 5 categorías:
     1. Pan
     2. Proteína
     3. Quesos
     4. Agregados
     5. Aderezos  
   - El simulador valida que se cumpla el número permitido de selecciones en cada categoría.

3. **Resumen previo**
   - Se muestra el **precio sin IVA** y dos botones:
     - **Confirmar pedido**
     - **Cancelar pedido**

4. **Confirmación de compra**
   - Vista con desglose:
     - Precio sin IVA
     - IVA
     - Precio final con IVA  
   - Opción de **confirmar compra** o **cancelar**.

5. **Pantalla final**
   - Mensaje de agradecimiento.
   - Instrucciones para retirar y pagar el pedido en el mostrador.

---

## 🛠️ Estructura del proyecto

```
SandwichMania/
├── index.html # Página principal
├── js/
│ ├── app.js # Lógica principal del simulador
│ └── localStorage.js # Datos iniciales y carga en localStorage
├── css/
│ └── style.css # Framework CSS Bootstrap
├── img/
└── README.md
```

---

## 📂 Componentes principales

### HTML (`index.html`)
- Contiene la estructura base: *navbar*, *footer*, descripción del negocio y botón de inicio.
- Punto de montaje para la interfaz dinámica del simulador.

### JavaScript
- **`src/app.js`**
  - Controla la lógica del simulador.
  - Carga dinámica de ingredientes en el DOM.
  - Validación de selección de ingredientes.
  - Control del estado de los botones.
  - Cálculo del precio sin IVA en tiempo real.
- **`src/localStorage.js`**
  - Define categorías, precios e imágenes de ingredientes.
  - Carga inicial de datos en `localStorage`.

### CSS
- Utiliza **Bootstrap** para la maquetación y estilos.
- Personalización mínima en estilos propios.

---

## 💾 Manejo de datos

- **`localStorage`**
  - Almacena las categorías de ingredientes, sus precios e imágenes.
- **`sessionStorage`**
  - Guarda el tamaño y los ingredientes elegidos para mantenerlos durante la sesión del usuario.

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