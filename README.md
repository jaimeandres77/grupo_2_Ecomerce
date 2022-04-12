# Grupo_2_Ecomerce
Proyecto Integrador equipo 2 - Digital House
## Descripcion del Proyecto

Se trata de un website sobre la venta de videojuegos de diferentes plataformas (PC, Xbox, PlayStation, etc.).

## Integrantes
- Fabián Forero -> Colombiano residente de bogotá, Técnologo en Análisis y Desarrollo de Sistemas de Información
- Johan Mauricio Peñuela -> Colombiano residente de Bogotá, Técnologo Industrial Me gusta estar en constante aprendizaje
- Jaime Andrés Artunduaga -> Estudiante de Ingeniería Multimedia de la ciudad de Cali, que le gusta la tecnología y aprender nuevas cosas cada día.  
- Sergio Andres Castro -> estudiante de producción musical y emprendedor en remates industriales y reciclaje, me gusta la música y la combinación de saberes.
## Referencias

- https://www.walmart.com.mx/videojuegos?msclkid=70067e6aa1cf1e1bf93a1ff045a6ccfd&utm_source=bing&utm_medium=cpc&utm_campaign=mg_lf_bing_ecomm_categorico_branding&utm_term=games&utm_content=mg_sem_categorico_07_videojuegos
- https://www.colombiagamer.com.co/ -→ Representa la estructura basica del la pagina (carrito, datos, etc, productos).
- https://gameshopvideojuegos.com/ --> En esta página podemos ver la posible separación por secciones y categorias que podría tener nuestra app web. 
- https://www.eneba.com/latam/store/games --> en esta pagina me gusto por su accesibilidad y claridad del contenido, los que si puede mejorar es una presentación más llamativa cuándo se ingresa a un juego.  

## Wireframes

- Wireframes del formulario de registro y del formulario de login https://www.figma.com/file/tqaICJq7KCr8df6yukjqhZ/login?node-id=0%3A1
- Wireframes del HomePage https://www.figma.com/file/U03naswxirOsKJRIz6Ka7C/WireFramesProyecto?node-id=0%3A1
- Wireframes Detalle Producto -> https://www.figma.com/file/U03naswxirOsKJRIz6Ka7C/WireFramesProyecto?node-id=2%3A2

## Tablero de Trabajo
- https://proyectointegradorg2.atlassian.net/jira/software/projects/GI2/boards/1

# Games Pro Shop
## Instalacion del proyecto
Para instalar el proyecto en su equipo y utilizarlo debe tener instalado los siguientes programas:
- NodeJS
- Git
- Navegador
- XAMPP (contiene phpmyadmin y MySQL)

Para esta instalacion esta dividido en dos secciones, la primera en la configuracion de la base de datos y la segunda la clonacion o descarga del proyecto para despues instalar las dependencias que va a necesitar para que funcione y dar permisos para conectarse a la base de datos.

### Configuracion de la base de datos MySQL
1. Abra la aplicacion de XAMPP y ejecute los servicios Apache y Mysql oprimiendo el boton **start** que esta en frente de los mismos nombres, ambos se deben estar ejecutando y se comprueba cuando esta de color verde y se muestra los puertos [Apache: (80, 443) y MySQL 3306], los puertos pueden variar segun la aplicacion del usuario.
2. En la seccion de MySQL junto al boton de start una vez se esta ejecutando se habilita el boton **Admin**, da clic en el y nos redireccionara a una pagina web de phpmyadmin (se debe estar ejecutando apache para que funcione), en caso de que no ingrese la pagina es la siguiente [http://localhost/phpmyadmin](http://localhost/phpmyadmin "http://localhost/phpmyadmin"), solo aplica cuando el puerto del apache es 80 si el puerto es diferente, por ejemplo 8080 la direccion de la pagina sera la siguiente http://localhost:8080/phpmyadmin.
3. Una vez dentro de phpmyadmin seleccionamos en la cabecera la opcion **SQL** y pegamos el contenido del siguiente link [Script SQL](https://drive.google.com/file/d/1VQ0Y48__V0VrvW8zDy4XFOh8Fu6W0Xfd/view?usp=sharing "Script SQL") en el recuadro, una vez pegado ejecutamos el script oprimiendo las teclas **control** + **Enter** o dando clic en el boton **go** que esta mas abajo del espacio en donde pegamos el script.
4. Si todo sale bien cambiara la ventana con cuadros mas pequeños donde la cabecera sera de colo verde.

###Instalacion del proyecto en el equipo
En este mismo repositorio a principios de la pagina hay un boton de color verde con el texto **code** al dar click en el hay dos opciones que podemos usar para tener el proyecto en el equipo:
1. La primera es la URL que nos esta dando, la copiamos y abrimos la terminal de git bash o la preferida por usted y nos ubicamos en la carpeta donde se instalara. Una vez ubicado en la carpeta en la que se instalara ejecutamos el siguiente comando ``` git clone URL ``` donde sustituiremos la URL por la que copiamos del repositorio, cuando termine la instalacion ejecutamos el comando ``` npm install ``` para instalar las dependencias necesarias para que funcione el proyecto.
2. La segunda opcion es la opcion **Download ZIP**, damos click y comenzara a descargarnos el proyecto. Una vez descargado descomprimir el proyecto en la carpeta donde lo colocaremos y esperamos a que se descomprima. Una vez descomprimido accedemos a la terminal git bash o la preferida por usted y nos ubicamos en la carpeta descomprimida (la carpeta debe tener la carpetas public y src junto con otros archivos) y ejecutamos el comando ``` npm install ``` para instalar las dependencias necesarias para que funcione el proyecto.

###Ejecucion del proyecto

Una vez instalado el proyecto junto con las dependencias y configurado la base de datos ejecutamos la terminal git bash o la preferida por usted y nos ubicamos en la carpeta del proyecto donde ejecutaremos uno de los dos siguientes comandos ``` npm start ``` o ``` npx nodemon src/app.js ```. Tener en cuenta que como minimo ademas de ejecutar el comando en la terminal en XAMPP tener corriendo MySQL y finalmente ingresamos en el navegador al siguiente link http://localhost:3000/ y navegamos en la pagina.