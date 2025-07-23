# SandwichMania

### Entregable N° 1
### Autor: Fernando F. Salomón
### Curso: JavaScript Flex - CoderHouse
https://github.com/fernandosalomon/CH_js_flex/tree/main/entregable_N1

## Descripción general

En este entregable aplicamos los conceptos de variables, funciones, arrays y objetos aprendidos hasta ahora en el curso de JavaScript, para construir un simulador de un e-commerce de venta de sándwiches llamado **SandwichMania**. 

La página de inicio contiene un diseño muy básico, con un boton que permite inicializar el simulador.

Usando la función integrada de JS, ```prompt()```, le pedimos al usuario que arme su sándwich, mostrando en cada sección (Pan, Proteina, Quesos, Agregados y Aderezos) las opciones disponibles.

Al finalizar, se le muestra al usuario los ingredientes elegidos y el precio final. Se le permite que confirme el pedido o se le dá la opción de comenzar a elegir los ingredientes desde el comienzo.

## Estructura del simulador

## Componentes principales

* Página HTML (./index.html): Consta de un título, una descripción del negocio y un boton para iniciar el simulador.

* Archivo JS (./src/script.js): Contiene toda la lógica del simulador.

### Estructura del archivo script.js

Consta de dos variables globales:

* ```prices```: Es un objeto con todos los ingredientes disponibles y sus precios.

* ```ingredients```: Es un array de objetos. Cada objeto corresponde a una de las cinco secciones de ingredientes: Pan, Proteina, Quesos, Agregados y Aderezos. Contiene el nombre de la sección, la cantidad de ingredientes que se puede elegir por sección dependiendo del tamaño de combo elegido y las opciones de ingredientes de esa sección.

Además, consta de tres funciones principales:

* ```mainMenu()```: La función de inicio. Aquí arranca el script y llama a todas las otras funciones.

* ```chooseCombo()```: Pide al usuario mediante un prompt elegir entre dos tipos distintos de combos (tamaños de sandwich): 1. Normal ó 2. Grande. Además permite salir del simulador. La función devuelve dos posibles valores tipo *string*: 'normalCombo" o 'bigCombo', dependiendo de la elección del usuario. Puede devolver un tercer valor, '-1', que es la señal para salir del simulador.

* ```buildSandwith(chCombo)```: Recibe el tipo de combo elegido por el usuario. Pide al usuario mediante prompt elegir los ingredientes disponibles dentro de cinco secciones: Pan, Proteina, Quesos, Agregados y Aderezos. Para las primeras dos se debe elegir algún ingrediente. En las últimas tres el usuario tiene la opción de no agregar ese ingrediente. La función retorna un objeto cuyas propiedades son las diferentes secciones y los valores de las propiedades es un array con las opciones elegidas en cada sección. También se puede salir del simulador en cualquier momento (usando la opción 'Q'), con lo que la función devuelve '-1' (señal de salida).

* ```showFinal(chCombo, userSandwitch)```: Recibe el tipo de combo elegido por el usuario y el objeto con la elección de ingredientes del usuario. Muestra la información del producto en la pantalla. Se pide al usuario confirmar que la orden es correcta (Oprimiendo "Aceptar") o volver a elegir los ingredientes (Oprimiendo "Cancelar"), mediante la función  ```confirm()```.

* ```calculatePrice(userSandwitch)```: Recibe un objeto con la elección de ingredientes del usuario. Suma el precio de todos los ingredientes, buscando cada uno de ellos en el objeto ```prices```, y devuelve un valor float con el precio final.

* ```priceMenu(userSandwitch)```: Recibe un objeto con la elección de ingredientes del usuario. Llama a la función ```calculatePrice()``` y muestra el precio final sin y con IVA. Pide al usuario confirmar el pedido o cancelarlo, mediante la función ```confirm()```. Si el usuario confirma el pedido, muestra un mensaje indicandole que vaya al mostrador para realizar el pago.

En todos los casos, se realiza una validación del valor ingresado por el usuario a la función ```prompt()```.

