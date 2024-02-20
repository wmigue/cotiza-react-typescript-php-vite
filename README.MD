# COMO SUBIR EL BUILD
- al hacer el build, en env.local asignar el ambiente antes del build.
- Tener en cuenta la ruta de los archivos transpilados, en el index.html modificar la ruta si es necesario o causa algun error, ejemplo:<script type="module" crossorigin src="../cotizador/assets/index-7b0e7c23.js"></script>   
- las imagenes alojarlas en: public_html/canavesio/assets y en public_html/canavesio/public y en public_html/canavesio/public/imagenes-cotizacion.
- el backend subirlo en el mismo directorio en /src/backend
- la cadena de conexion del los archivos del backend tiene un nivel menos reemplazar con: require("../../../conexion.php");

# NPM RUN DEV
- LEVANTAR APACHE XAMP5 PARA BACKEND PHP
