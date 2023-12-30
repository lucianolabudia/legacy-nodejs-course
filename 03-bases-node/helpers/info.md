# Información
Este archivo JavaScript, multiplicar.js, es un módulo que exporta una única función crearArchivo. Esta función genera una tabla de multiplicar para un número dado y escribe el resultado en un archivo de texto. Utiliza el módulo fs (file system) de Node.js para escribir en el archivo, y el paquete npm colors para colorear la salida de la consola.

La función crearArchivo es una función asíncrona que toma tres parámetros: base, listar y hasta. El parámetro base es el número para el cual se genera la tabla de multiplicar. El parámetro listar es un booleano que determina si la tabla de multiplicar se imprime en la consola. El parámetro hasta determina el límite de la tabla de multiplicar.

Dentro de la función, se inicializan dos cadenas vacías salida y consola. Un bucle for luego itera desde 1 hasta hasta, y para cada iteración, añade una línea a las cadenas salida y consola. La cadena salida es una representación en texto plano de la tabla de multiplicar, mientras que la cadena consola es una versión coloreada para la salida de la consola.

Si el parámetro listar es true, la función imprime la cadena consola en la consola, junto con algún texto adicional coloreado. Independientemente del valor de listar, la función escribe la cadena salida en un archivo de texto en el directorio ./salida. El nombre del archivo es tabla- seguido del valor de base.

Finalmente, la función devuelve el nombre del archivo que creó. Si ocurre algún error durante la ejecución de la función, se captura y se vuelve a lanzar para ser manejado por el llamante.