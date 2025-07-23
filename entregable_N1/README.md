# SandwithMania

### Entregable N° 1
### Autor: Fernando F. Salomón
### Curso: JavaScript Flex - CoderHouse

## Descripción general

En este entregable aplicamos los conceptos de variables, funciones, arrays y objetos aprendidos hasta ahora en el curso de JavaScript, para construir un simulador de un e-commerce de venta de sandwitches llamado **SandwitchMania**. 

La página de inicio contiene un diseño muy básico, con un boton que permite inicializar el simulador.

Usando la función integrada de JS, ```prompt()```, le pedimos al usuario que arme su sandwitch, mostrando en cada sección (Pan, Proteina, Quesos, Agregados y Aderezos) las opciones disponibles.

Al finalizar, se le muestra al usuario los ingredientes elegidos y el precio final. Se le permite que confirme el pedido o se le dá la opción de comenzar a elegir los ingredientes desde el comienzo.

## Estructura del simulador

## Componentes principales

* Página HTML: Consta de un título, una descripción del negocio y un boton para iniciar el simulador.

* Archivo JS: Se llama script.js y se encuentra dentro de la carpeta src. Contiene toda la lógica del simulador.

### Estructura del archivo .js

Consta de dos variables globales:

* ```prices```: Es un objeto con todos los ingredientes disponibles y sus precios.

* ```ingredients```: Es un array de objetos. Cada objeto corresponde a una de las cinco secciones de ingredientes: Pan, Proteina, Quesos, Agregados y Aderezos. Contiene el nombre de la sección, la cantidad de ingredientes que se puede elegir por sección dependiendo del tamaño de combo elegido y las opciones de ingredientes de esa sección.

Además, consta de tres funciones principales:

* ```main_menu()```: La función de inicio. Aquí arranca el script y llama a todas las otras funciones.

* ```chCombo()```: Pide al usuario mediante un prompt elegir entre dos tipos distintos de combos (tamaños de sandwith): 1. Normal ó 2. Grande. Además permite salir del simulador. La función devuelve dos valores tipo string: 'normal_combo" o 'big_combo', dependiendo de la elección del usuario. Puede devolver un tercer valor, '-1', que da la señal para salir del simulador.

* ```build_sandwith(chCombo)```: Recibe el tipo de combo elegido por el usuario. Pide al usuario mediante prompt elegir los ingredientes disponibles dentro de cinco secciones: Pan, Proteina, Quesos, Agregados y Aderezos. Para las primeras dos se debe elegir algún ingrediente. En las últimas tres el usuario tiene la opción de no agregar ese ingrediente. La función retorna un objeto cuyas propiedades son las diferentes secciones y los valores de las propiedades son arrays con las opciones elegidas. También se puede salir del simulador en cualquier momento (usando la opción 'Q'), con lo que la función devuelve '-1' (señal de salida).

* ```show_final(chCombo, userSandwitch)```: Recibe el tipo de combo elegido por el usuario y el objeto con la elección de ingredientes del usuario. Muestra toda la información del pedido en la pantalla, incluido el precio final sin y con IVA (para calcular el precio llama a la función calculate_price()). Por prompt pide al usuario que confirme si el pedido es correcto (ingresar 1), con lo que muestra un cartel para acercarse al mostrador y pagar, si desea comenzar a armar el sandwitch desde el inicio (ingresar 2), con lo que reinicia el simulador, o salir del simulador (ingresar 'Q').

* ```calculate_price(userSandwitch)```: Recibe un objeto con la elección de ingredientes del usuario. Suma el precio de todos los ingredientes, buscando cada uno de ellos en el objeto prices, y devuelve un valor float con ese precio final.

En todos los casos donde se utiliza la función ```prompt()``` para permitir al usuario elegir una opción se realiza una validación del valor ingresado por el usuario.

