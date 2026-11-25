/**
 * tecnoforPythonData.js
 * Material didáctico, ejercicios resueltos y biblioteca de documentación de Python
 * Sincronizado desde el repositorio Blancadum/aprendiendo-python para TecnoFor.
 */

export const PYTHON_REPO_URL = 'https://github.com/Blancadum/aprendiendo-python';
export const PYTHON_REPO_NAME = 'Blancadum/aprendiendo-python';

export const PYTHON_DOCS = [
  {
    "id": "cheatsheet",
    "title": "CheatSheet Oficial de Python",
    "badge": "Chuleta Rápida",
    "category": "Referencia",
    "desc": "Resumen ultrarrápido de sintaxis: tipos de datos, estructuras, métodos y operadores en una sola hoja.",
    "url": "/fuentes/tecnofor/python/CheatSheet Python.pdf",
    "size": "3.4 MB",
    "color": "#10b981"
  },
  {
    "id": "manual-python",
    "title": "Manual Completo de Python",
    "badge": "Libro de Texto",
    "category": "Fundamentos",
    "desc": "Manual exhaustivo que cubre desde la sintaxis elemental hasta la programación orientada a objetos y excepciones.",
    "url": "/fuentes/tecnofor/python/Manual de Python.pdf",
    "size": "1.3 MB",
    "color": "#0ea5e9"
  },
  {
    "id": "python-para-todos",
    "title": "Python para Todos (Explorando la Información)",
    "badge": "Libro Libre",
    "category": "Fundamentos",
    "desc": "Texto de referencia universitaria sobre informática aplicada, procesamiento de cadenas, ficheros y colecciones.",
    "url": "/fuentes/tecnofor/python/Python para todos.pdf",
    "size": "1.2 MB",
    "color": "#8b5cf6"
  },
  {
    "id": "numpy",
    "title": "La Librería NumPy en Python",
    "badge": "Computación Numérica",
    "category": "Librerías",
    "desc": "Guía práctica de vectores, matrices multidimensionales (ndarrays), operaciones vectorizadas y filtrado numérico.",
    "url": "/fuentes/tecnofor/python/La librería NumPy en Python.pdf",
    "size": "258 KB",
    "color": "#f59e0b"
  },
  {
    "id": "pandas",
    "title": "La Librería Pandas en Python",
    "badge": "Análisis de Datos",
    "category": "Librerías",
    "desc": "Tratamiento estructurado de datos tabulares: Series, DataFrames, agrupaciones, limpieza y lectura de CSV/Excel.",
    "url": "/fuentes/tecnofor/python/La librería Pandas en Python.pdf",
    "size": "745 KB",
    "color": "#ec4899"
  },
  {
    "id": "matplotlib",
    "title": "La Librería Matplotlib en Python",
    "badge": "Visualización",
    "category": "Librerías",
    "desc": "Generación de gráficos estadísticos: líneas, barras, dispersión, histogramas y personalización estética.",
    "url": "/fuentes/tecnofor/python/La librería Matplotlib en Python.pdf",
    "size": "753 KB",
    "color": "#14b8a6"
  },
  {
    "id": "datetime",
    "title": "La Librería Datetime & Formatos de Fecha",
    "badge": "Fechas y Horas",
    "category": "Utilidades",
    "desc": "Manipulación de fechas (`date`), tiempos (`time`), marcas de tiempo y directivas de formato (`strftime`).",
    "url": "/fuentes/tecnofor/python/La librería Datetime en Python.pdf",
    "size": "165 KB",
    "color": "#6366f1"
  },
  {
    "id": "tensorflow",
    "title": "Introducción y Exposición de TensorFlow",
    "badge": "Deep Learning",
    "category": "IA / Machine Learning",
    "desc": "Fundamentos del framework líder para modelado, tensores, grafos computacionales y redes neuronales profundas.",
    "url": "/fuentes/tecnofor/python/Tensor-Flow.pdf",
    "size": "1.4 MB",
    "color": "#f97316"
  },
  {
    "id": "ifcd093po-ml",
    "title": "Libro Oficial IFCD093PO: Machine Learning Aplicado",
    "badge": "Certificación SEPE",
    "category": "IA / Machine Learning",
    "desc": "Manual formativo oficial del SEPE para Machine Learning: algoritmos supervisados, clasificación y regresión.",
    "url": "/fuentes/tecnofor/python/Libro IFCD093PO Machine Learning aplicado usando Python - Orbe.pdf",
    "size": "23 MB",
    "color": "#ef4444"
  }
];

export const PYTHON_EXERCISES = [
  {
    "id": "m1-01_ejercicio1",
    "filename": "01_ejercicio1.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "numero1 = int(input(\"Introduce un número:\"))",
    "desc": "# numero1 = int(input(\"Introduce un número:\"))\nSolicitar al usuario estos tres datos: nombre, apellido y la edad\nmostrar un mensaje de bienvenida con esos datos",
    "code": "'''\n    # numero1 = int(input(\"Introduce un número:\"))\n    Solicitar al usuario estos tres datos: nombre, apellido y la edad\n    mostrar un mensaje de bienvenida con esos datos\n'''\nnombre = input(\"Introduce tu nombre: \")\napellido = input(\"Introduce tu apellido: \")\nedad = input(\"Introduce tu edad: \")\n\nprint(\"Bienvenida al curso, \" + nombre + \" \" + apellido + \". Tienes \" + edad + \" años.\")\n# otra forma de mostrar información: f\"literal {variable}\"\"\nprint(f\"Bienvenido {nombre} {apellido} y tienes {edad} años\")"
  },
  {
    "id": "m1-02_ejercicio2",
    "filename": "02_ejercicio2.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Ejercicio2",
    "desc": "Solicitar 2 números enteros al usuario y mostrar el resultado de:\nsuma, resta, multiplicación, división, división entera, potencia, resto de la división",
    "code": "'''\n    Solicitar 2 números enteros al usuario y mostrar el resultado de:\n    suma, resta, multiplicación, división, división entera, potencia, resto de la división\n'''\n\nnumero1 = input(\"Introduce un primer número: \")\nnumero2 = input(\"Introduce un segundo número: \")\n\nprint(\"La suma sería: \" + str(int(numero1) + (int(numero2))))\nprint(\"La multiplicación sería: \" + str(int(numero1) * (int(numero2))))\nprint(\"La resta sería: \" + str(int(numero1) - (int(numero2))))\nprint(\"La división sería:\" + str(int(numero1) / (int(numero2))))\nprint(\"La división entera sería: \" + str(int(numero1) // (int(numero2))))\nprint(\"El módulo sería: \" + str(int(numero1) % (int(numero2))))\nprint(\"La potencia sería: \" + str(int(numero1)**2))\n\n## Forma alternativa\n\nnumero1 = int(input(\"Introduce el primer número: \"))\nnumero2 = int(input(\"Introduce el segundo número: \"))\n\nsuma = numero1 + numero2\nresta = numero1 - numero2\nmultiplicacion = numero1 * numero2\ndivision = numero1 / numero2\ndivision_entera = numero1 // numero2\npotencia = numero1 ** numero2\nresto = numero1 % numero2\n\nprint(f\"Suma: {suma}\")\nprint(f\"Resta: {resta}\")\nprint(f\"Multiplicación: {multiplicacion}\")\nprint(f\"División: {division}\")\nprint(f\"División entera: {division_entera}\")\nprint(f\"Potencia: {potencia}\")\nprint(f\"Resto de la división: {resto}\")"
  },
  {
    "id": "m1-03_ejercicio3",
    "filename": "03_ejercicio3.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Solicitar el precio de un producto",
    "desc": "Solicitar el precio de un producto\n- aplicar descuento 10%\n- aplicar 21% de IVA\nMostrar desglose: precio inicial, importe dto, importe IVA, importe total",
    "code": "'''\n    Solicitar el precio de un producto\n    - aplicar descuento 10%\n    - aplicar 21% de IVA\n    Mostrar desglose: precio inicial, importe dto, importe IVA, importe total\n'''\n\nprecio_inicial = float(input(\"Introduce el precio del producto: \"))\ndto = float((precio_inicial * 10) / 100)\nprecio_dto = precio_inicial - dto\niva = float(precio_inicial*21/200)\nprecio_iva = precio_dto + iva\nprecio_final = precio_inicial - dto + iva\nprint(f\"El precio inicial era de: {precio_inicial},\\nhaciéndole el descuento de {dto} queda en {precio_dto},\\nmás el IVA ({iva}), sería {precio_iva}.\\nTotal de {precio_final} lereles\")\n\n# Forma alternativa"
  },
  {
    "id": "m1-04_temperatura",
    "filename": "04_temperatura.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Temperatura",
    "desc": "Conversión de grados centígrados a Fahrenheit\nSolicitar la temperatura en grados centígrados (float)\naplicar la fórmula para obtener los grados Fahrenheit",
    "code": "'''\n    Conversión de grados centígrados a Fahrenheit\n    Solicitar la temperatura en grados centígrados (float)\n    aplicar la fórmula para obtener los grados Fahrenheit\n'''\n\ncelsius = float(input(\"Introduce la temperatura en grados centígrados: \"))\nfahrenheit = (celsius * 9/5) + 32\n\nprint(f\"La temperatura en grados Fahrenheit es: {fahrenheit}\")"
  },
  {
    "id": "m1-05_conversor",
    "filename": "05_conversor.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Conversor",
    "desc": "Solicitar importe en euros\nSolicitar a cómo está el cambio a dolares\nMostrar la conversión x euros son x dolares",
    "code": "'''\n    Solicitar importe en euros\n    Solicitar a cómo está el cambio a dolares\n    Mostrar la conversión x euros son x dolares\n'''\n\nimporte_euros = float(input(\"Introduzca el importe en euros: \"))\ncambio_dolares = float(input(\"Introduzca el cambio a dólares: \"))\n\nimporte_dolares = importe_euros * cambio_dolares\nprint(f\"{importe_euros} euros son {importe_dolares} dólares\")"
  },
  {
    "id": "m1-06_operadores",
    "filename": "06_operadores.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Operadores",
    "desc": "Crea una variable puntos = 100\nun jugador comienza la partida con 100 puntos, gana 25, pierde 15 y después\nduplica su puntuación.\nMostrar puntuación final",
    "code": "'''\n    Crea una variable puntos = 100\n    un jugador comienza la partida con 100 puntos, gana 25, pierde 15 y después\n    duplica su puntuación.\n    Mostrar puntuación final\n'''\npuntos= 100\npuntos += 25\npuntos -= 15\npuntos *= 2\n\nprint(\"Cuántos puntos tiene?\", puntos)\nprint(f\"La puntuación final es: {puntos} \")"
  },
  {
    "id": "m1-07_caramelos",
    "filename": "07_caramelos.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Caramelos",
    "desc": "tenemos 47 caramelos a repartir entre 5 niños\nMostrar cuántos caramelos sobran",
    "code": "'''\n    tenemos 47 caramelos a repartir entre 5 niños\n    Mostrar cuántos caramelos sobran\n'''\n\ncaramelos = 47\nninos = 5\n\npor_nino = caramelos // ninos\nsobran = caramelos % ninos\n\nprint(f\"Cuántos caramelos hay en total: {caramelos}\")\nprint(f\"Esos caramelos repartidos entre {ninos} niños: {por_nino} caramelos por niño\")\nprint(f\"Y sobran: {sobran} caramelos\")"
  },
  {
    "id": "m1-08_banco",
    "filename": "08_banco.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Banco",
    "desc": "Una persona tiene en su cuenta 1250€\n- Recibe una transferencia de 357€\n- Paga 3 facturas de 85€ cada una\n- Recibe un bizum de 200€\n- retira el 10% de su saldo (necesitaréis otra variable)\nMostrar saldo final",
    "code": "'''\n    Una persona tiene en su cuenta 1250€\n     - Recibe una transferencia de 357€\n     - Paga 3 facturas de 85€ cada una\n     - Recibe un bizum de 200€\n     - retira el 10% de su saldo (necesitaréis otra variable)\n    Mostrar saldo final\n'''\n\nsaldo = 1250\nsaldo += 375\nsaldo -= 3*85\nsaldo += 200\nretiro = saldo * 10 / 100\nsaldo -= retiro\n\n\nprint(f\"El saldo final es: {int(saldo)}\")\nprint(\"Saldo Final:\", int(saldo))\nprint(\"Saldo Final:\", (saldo))"
  },
  {
    "id": "m1-09_fabrica",
    "filename": "09_fabrica.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Fabrica",
    "desc": "Una fábrica produce 350 productos al día\n- Aumenta la producción en 125 unidades\n- Reduce la producción en 75 unidades\n- Duplica la producción *2\n- Divide entre 5\n- Cuántas sobran respecto a la producción media por día\nCalcular cuántas unidades sobran al agrupar la producción en lotes de 12 unidades",
    "code": "'''\n    Una fábrica produce 350 productos al día\n    - Aumenta la producción en 125 unidades\n    - Reduce la producción en 75 unidades\n    - Duplica la producción *2\n    - Divide entre 5\n    - Cuántas sobran respecto a la producción media por día\n    Calcular cuántas unidades sobran al agrupar la producción en lotes de 12 unidades\n'''\n\nproduccion = 350\nproduccion += 125\nproduccion -= 75\nproduccion *= 2\nproduccion /= 5\nproduccion %= 12\nprint(f\"Unidades sobrantes {produccion}\")"
  },
  {
    "id": "m1-10_ejercicio_alumno",
    "filename": "10_ejercicio_alumno.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Un alumno tiene una nota de 7.5 y pregunta:",
    "desc": "Un alumno tiene una nota de 7.5 y pregunta:\n- si la nota es superior a 5\n- si la nota es igual o superior a 7\n- si la nota es inferior a 10\n- si la nota es exactamente 10\n- si la nota es distinta de 5",
    "code": "'''\n    Un alumno tiene una nota de 7.5 y pregunta:\n    - si la nota es superior a 5\n    - si la nota es igual o superior a 7\n    - si la nota es inferior a 10\n    - si la nota es exactamente 10\n    - si la nota es distinta de 5\n'''\n\nimport math\n\nnota = 7.5\nprint(\"La nota es superior a 5?\", nota > 5)  # True\nprint(\"La nota es mayor o igual a 7?\", nota >= 7)  # True\nprint(\"La nota es menor a 10\", nota < 10)  # True\nprint(math.isclose(nota, 10))  # False\nprint(not math.isclose(nota, 5))  # True"
  },
  {
    "id": "m1-11_ejercicios_empleados",
    "filename": "11_ejercicios_empleados.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Tenemos 3 empleados hablando de sus sueldos",
    "desc": "Tenemos 3 empleados hablando de sus sueldos\n- el empleado 1 cobra 1800\n- el empleado 2 cobra 2100\n- el empleado 3 cobra 1800\n- mostrar si el empleado 1 cobra más que el empleado 2\n- si el empleado 2 cobra más que el empleado 3\n- si el empleado 1 cobra lo mismo que el empleado 3\n- si el sueldo del empleado 2 es distinto del sueldo del empleado 1\n- si el sueldo del empleado 3 es menor o igual que el del empleado 1",
    "code": "'''\n    Tenemos 3 empleados hablando de sus sueldos\n    - el empleado 1 cobra 1800\n    - el empleado 2 cobra 2100\n    - el empleado 3 cobra 1800\n    - mostrar si el empleado 1 cobra más que el empleado 2\n    - si el empleado 2 cobra más que el empleado 3\n    - si el empleado 1 cobra lo mismo que el empleado 3\n    - si el sueldo del empleado 2 es distinto del sueldo del empleado 1\n    - si el sueldo del empleado 3 es menor o igual que el del empleado 1\n'''\n\nempleado1 = 1800\nempleado2 = 2100\nempleado3 = 1800\n\nprint(\"¿El empleado 1 cobra más que el empleado 2?: \", (empleado1 > empleado2)) # True\nprint(\"¿El empleado 2 cobra más que el empleado 3?: \", (empleado2 > empleado3)) #True\nprint(\"¿Empleado 1 cobra lo mismo que el empleado 3?: \", (empleado1 == empleado3)) #True\nprint(\"¿Empleado 2 cobra distinto que el empleado 1:\", (empleado2 != empleado1)) #True\nprint(\"¿Empleado 3 es menor o igual que el empleado 1?: \", (empleado2 <= empleado1)) #True"
  },
  {
    "id": "m1-12_ejercicio_edades",
    "filename": "12_ejercicio_edades.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Ejercicio edades",
    "desc": "Una piscina permite entrada a los que tienen entre 12 y 65 años\n- comprobar si tiene entre 12 y 65\n- si tiene menos de 12 o más de 65\n- si no tiene 18 años\n- si tiene más de 18 años y menos de 30",
    "code": "'''\n    Una piscina permite entrada a los que tienen entre 12 y 65 años\n    - comprobar si tiene entre 12 y 65\n    - si tiene menos de 12 o más de 65\n    - si no tiene 18 años\n    - si tiene más de 18 años y menos de 30\n'''\n\nedad = 25\n'''\n    condicion and condicion\n    condicion or condicion\n    not condicion\n'''\n\nedad = int(input(\"Introduce tu edad: \"))\n\nprint(\"¿Tiene más de 12 y menos de 65?: \", edad >= 12 and edad <= 65) #True\nprint(\"¿Tiene menos de 12 o más de 65?: \", edad < 12 or edad > 65)  #False\nprint(\"¿No tiene 18 años?: \", edad != 18) #True\nprint(\"¿Tiene entre 18 y 30 años?: \", edad >= 18 and edad <= 30) #True"
  },
  {
    "id": "m1-13_usuario_password",
    "filename": "13_usuario_password.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Usuario password",
    "desc": "Solicitar usuario y password por teclado\n- Mostrar si el usuario es \"admin\" y el password \"python123\"",
    "code": "'''\n    Solicitar usuario y password por teclado\n    - Mostrar si el usuario es \"admin\" y el password \"python123\"\n'''\n\nuser = input(\"introduce usuario: \")\npassword = input(\"introduce contraseña: \")\n\nprint(\"¿El usuario es admin?\", user == \"admin\" and password == \"python123\" )\nprint(\"¿La contraseña es python123?\", password == \"python123\" ) \nprint(\"Credenciales son válidas?\", user == \"admin\" and password == \"python123\")"
  },
  {
    "id": "m2-02_piscina",
    "filename": "02_piscina.py",
    "category": "m2",
    "categoryLabel": "Módulo 2 · Condicionales",
    "title": "Piscina",
    "desc": "una piscina permite entrada a personas mayores de 18 años y menores de 65\n- solicita la edad por teclado\n- acceso permitido si está en rango de edad\n- lo siento, eres menor de 12 años\n- lo siento eres mayor de 65",
    "code": "'''\n    una piscina permite entrada a personas mayores de 18 años y menores de 65\n    - solicita la edad por teclado\n    - acceso permitido si está en rango de edad\n    - lo siento, eres menor de 12 años\n    - lo siento eres mayor de 65\n'''\nedad = int(input(\"Introduce tu edad: \"))\npermitido = \"Bienvenido a la piscina\"\ndenegado_12 = \"Lo siento, eres menor de 12 años\"\ndenegado_65 = \"Lo siento, superas la edad permitida\"\nwellcome = \"Bienvenido\"\n\nif edad >= 12 and edad <= 65:\n    print({wellcome})\nelse:\n    if edad < 12:\n        print(denegado_12)\n    if edad > 65: \n        print(denegado_65)"
  },
  {
    "id": "m2-03_credenciales",
    "filename": "03_credenciales.py",
    "category": "m2",
    "categoryLabel": "Módulo 2 · Condicionales",
    "title": "Credenciales",
    "desc": "Solicitar usaurio y password por teclado\n- si el usuario es \"admin\" y el password es \"python123\"\n- Mostrar \"credenciales no válidas\" o \"credenciales correctas\"",
    "code": "'''\n    Solicitar usaurio y password por teclado\n    - si el usuario es \"admin\" y el password es \"python123\"\n    - Mostrar \"credenciales no válidas\" o \"credenciales correctas\"\n'''\nuser = input(\"Introduce tu usuario: \")\npassword = input(\"Introduce tu contraseña: \")\nacceso_permitido = \"Credenciales correctas\"\nacceso_denegado = \"Credenciales incorrectas\"\n\nif user == \"admin\" and password == \"python123\":\n    print(acceso_permitido)\n\nif user != \"admin\" and password != \"python123\":\n    print(acceso_denegado)"
  },
  {
    "id": "m2-par_impar",
    "filename": "par_impar.py",
    "category": "m2",
    "categoryLabel": "Módulo 2 · Condicionales",
    "title": "Par impar",
    "desc": "mostrar si un número es par",
    "code": "'''\n    mostrar si un número es par\n'''\n\nnumero = 46\n\nif numero % 2 == 0:\n    print(\"Es par\")\nelse: \n    print(\"Es impar\")\n\n'''\n    Mostrar si es par y múltiplo de 3\n'''\n\nnumero = 46\n\nif numero % 2 == 0:\n    print(\"Es par\")\nelse: \n    print(\"Es impar\")\n\nif numero % 3 == 0:\n    print(\"Es múltiplo de 3\")\nelse: \n    print(\"No es múltiplo de 3\")"
  },
  {
    "id": "ex-01_tipos",
    "filename": "01_tipos.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Sintaxis de Tipos Primitivos & Docstrings",
    "desc": "Declaración de enteros, flotantes, cadenas, booleanos y comentarios de bloque.",
    "code": "'''\n    Comentarios de Bloque (Docstring)\n    3 comillas simples o dobles\n    Ejemplo de tipo de datos en Python\n'''\n\n# Numeros enteros (int)\nnumero1 = 8\nnumero2 = 3\nnumero3 = 5\nsuma = numero1 + numero2 + numero3\nprint(suma)\nprint(type(suma))\nprint(\"Resultado:\", suma)\n\n# Números reales (float)\nbase = 4.89\naltura = 9.23\ntriangulo = base * altura / 2\nprint(type(triangulo))\n\n# round\nprint(\"Area del triangulo:\", triangulo)\nprint(\"Area del triangulo:\", triangulo)\n\n# booleanos: True o false\nresuelto = True\nprint(type(resuelto))\nprint((\"Problema resuelto?:\", resuelto))\n\n# Cadenas de texto (str)\nnombre = \"Blanca\"\napellidos = \"López\"\nprint(nombre, apellidos)\n\n\n# Concatenar \n#"
  },
  {
    "id": "ex-02_input-str",
    "filename": "02_input-str.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Entrada de Cadenas por Consola",
    "desc": "Captura de valores del usuario con input() y formato de salida con print().",
    "code": "'''\n    input(\"scanner\")\n    CONCATENA siempre que se introduce un dato por teclado, el intérprete de python lo considera string\n    ➜  clase /opt/homebrew/bin/python3 /Users/blanca/Python/curso_ML/clase/Agentic/ejercicios/02_conversiones.py\n    Introduce un número: 3\n    <class 'str'>\n    Introduce otro número: 2 \n    <class 'str'>\n    Suma: 32\n'''\n\nnumero1 = input(\"Introduce un número: \")\nprint(type(numero1))\nnumero2 = input(\"Introduce otro número: \")\nprint(type(numero2))\nsuma = numero1 + numero2\nprint(\"Suma:\", suma)"
  },
  {
    "id": "ex-03_input-str-conversion",
    "filename": "03_input-str-conversion.py",
    "category": "m1",
    "categoryLabel": "Módulo 1 · Tipos & Entrada",
    "title": "Conversión y Casteo de Tipos",
    "desc": "Transformación explícita de tipos (str a int/float) para cálculos aritméticos.",
    "code": "'''\n    input(\"scanner\")\n    CONCATENA siempre que se introduce un dato por teclado, el intérprete de python lo considera string\n    ➜  clase /opt/homebrew/bin/python3 /Users/blanca/Python/curso_ML/clase/Agentic/ejercicios/02_conversiones.py\n    Introduce un número: 3\n    <class 'str'>\n    Introduce otro número: 2 \n    <class 'str'>\n    Suma: 32\n'''\n\nnumero1 = int(input(\"Introduce un número: \"))\nprint(type(numero1))\nnumero2 = int(input(\"Introduce otro número: \"))\nprint(type(numero2))\nsuma = numero1 + numero2\nprint(\"Suma:\", suma)\n\n\n# Convertir un str a número real (float(str))\nlado = input(\"Introduce el lado del cuadrado :\") # la parte decimal con .\narea_cuadrado = float(lado) * float(lado)\narea_cuadrado = float(lado) **2 # Al cuadrado\nprint(\"Area del cuadrado: \", area_cuadrado)\n\n# Convertir un int a str. str(int)\n# print(\"Suma:\" + suma) # Type error\nprint(\"Suma:\" + str(suma)) \n\n# convertir un booleano a numerico\n# False = 0, True = 1\nprint(8 + False) # 8\nprint(8 + True) # 9\nprint(True + False) # 1\n\n# Todos los tipos de dato es convertible a str\nprint(str(True))\nprint(str(4.67))"
  },
  {
    "id": "ex-bucles_FOR",
    "filename": "bucles_FOR.py",
    "category": "snippets",
    "categoryLabel": "Ejemplos Guiados",
    "title": "Control de Flujo: Bucles FOR y Range",
    "desc": "Iteración con bucles for, función range(start, stop, step) y acumuladores.",
    "code": "import os\n\nos.system(\"cls\")\n\n# Los bucles son partes del programa que se repiten\n\n# Podemos encontrarnos con dos tipos de bucles:\n\n# Los bucles finitos o determinados: aquellos que se repiten un numero \n# fijo de veces. Se construyen con FOR.\n\n# Los bucles no finitos o indeterminados: aquellos que se repiten un numero \n# variable de veces. Se construyen con WHILE.\n\n# for (i=10; i>0; i--){\n#    alert(i);\n#    }\n\n\n\nfor i in range(10):\n    print(i)\n\nprint(\"\")\n\nfor i in range(10, 0, -1):\n    print(i)\n    \n    \n    # Resolucion del ejercicio 11\n    \nos.system(\"cls\")\n\nvalor = 0\n\ntexto = \"\"\n    \nwhile valor <= 0:  \n\n    valor = int(input(\"Escribe un numero entero positivo mayor que cero: \"))\n\n\nfor i in range(valor):\n    \n    texto = texto + \"* \"\n    \n    \n    \nprint(texto)"
  },
  {
    "id": "ex-uso_de_match",
    "filename": "uso_de_match.py",
    "category": "snippets",
    "categoryLabel": "Ejemplos Guiados",
    "title": "Control Estructural: Sintaxis Match-Case",
    "desc": "Patrón de conmutación moderno de Python 3.10+ equivalente a switch-case.",
    "code": "import os\nos.system(\"cls\")\n\nnumero = input(\"Introduce 0 o 1: \")\nnumero = int(numero)\n\nif(numero == 0):\n\n    print(\"Has introducido un 0\")\n\nelif(numero == 1):\n\n\n    print(\"Has introducido un 1\")\n\nelse:\n\n    print(\"No has introducido ni 0 ni 1\")\n\n\n\nmatch(numero):\n\n    case 0:\n        print(\"Has introducido un 0\")\n\n    case 1:\n        print(\"Has introducido un 1\")\n\n    case _:\n        print(\"No has introducido ni 0 ni 1\")"
  },
  {
    "id": "ex-usar_funciones",
    "filename": "usar_funciones.py",
    "category": "snippets",
    "categoryLabel": "Ejemplos Guiados",
    "title": "Modularización: Definición de Funciones",
    "desc": "Creación de funciones def con parámetros, retorno de valores y longitud len().",
    "code": "# Funcion convertir, le pasamos un NIF o NIE y nos devuelve el dato con la máscara\n\n\n\ndef convertir(valor):\n  \n    longitud = len(valor)\n\n    if (longitud == 9):\n        \n        letra = valor[0:1]\n\n        if (letra == \"X\") or (letra == \"Y\") or (letra == \"Z\"):\n            mascara = valor[0:1] + \"-\" + valor[1:2] + \".\" + valor[2:5] + \".\" + valor[5:8] +\"-\" + valor[8:9]\n        else:\n            mascara = valor[0:2] + \".\" + valor[2:5] + \".\" + valor[5:8] +\"-\" + valor[8:9]\n\n    else:\n        \n        mascara = \"Dato no válido\"\n\n    return mascara\n    \n\n\n\n# Inicio del programa\n\ncadena = input(\"Escribe un NIF o un NIE: \")\n\nconversion = convertir(cadena)\n\nprint(conversion)"
  },
  {
    "id": "ex-tratamiento_fechas",
    "filename": "tratamiento_fechas.py",
    "category": "snippets",
    "categoryLabel": "Ejemplos Guiados",
    "title": "Librería Estándar: Datetime & Timedelta",
    "desc": "Cálculo de diferencias de fechas, días transcurridos y formateo regional.",
    "code": "# Para trabajar con fechas es necesario importar las librerias necesarias\n\n# Previamente hay que instalar como administrador el siguiente comando:\n\n            # pip install datetime\n\n            # pip install python-dateutil\n\nfrom datetime import date, datetime, timedelta\n\n\nfrom datetime import date                           # Para trabajar con fechas\nfrom datetime import datetime                       # Para trabajar con horas\nfrom datetime import timedelta                      # Para operar con dias\nfrom dateutil.relativedelta import relativedelta    # Para trabajar con fechas \n                                                    #   tipo años, meses, minutos y segundos\n\n# Lista de algunos de los formatos de código más usados en fechas:\n\n#   %d - El día del mes con un número sin ceros, formato 8.\n#   %a - El nombre abreviado del día de la semana, por ejemplo, domingo (Sunday) se abrevia a Sun\n#   %A - El nombre completo del día de la semana, Sunday.\n#   %m - El mes como un número acompañado de cero, cómo es el caso de 01.\n#   %b - El nombre abreviado del mes, como Jan.\n#   %B - El nombre completo del mes, January.\n#   %y - El año sin siglos, 23.\n#   %Y - El año con siglos, 2023.\n#   %H - Las horas del día en un formato de 24 horas, como 18.\n#   %I - Las horas del día en un formato de 12 horas, como 6 (PM).\n#   %M - Los minutos en una hora, en formato 20.\n#   %S - Los segundos en un minuto, en formato 00.\n\n\nfecha = \"2026-10-09\"                # Formato date\n\nhora = \"10:31:45\"                   # Formato time\n\ncompleto = \"2026-10-09 10:33:25\"    # Formato datetime\n\n\n\n# Día actual\nhoy = date.today()\n\n# Fecha actual\nahora = datetime.now()\n\nprint(hoy)\nprint(ahora)\n\n\n# Una vez obtengamos la fecha actual podremos obtener el día, mes, año, hora, minutos y segundos\n\n# Date\nprint(\"El día actual es {}\".format(hoy.day))\nprint(\"El mes actual es {}\".format(hoy.month))\nprint(\"El año actual es {}\".format(hoy.year))\n\n# Datetime\nprint(\"El día actual es {}\".format(ahora.day))\nprint(\"El mes actual es {}\".format(ahora.month))\nprint(\"El año actual es {}\".format(ahora.year))\n\nprint(\"La hora actual es {}\".format(ahora.hour))\nprint(\"El minuto actual es {}\".format(ahora.minute))\nprint(\"El segundo actual es {}\".format(ahora.second))\n\n\n\n\n\n# Conversión de una cadena a fecha\n\nfecha = \"31-12-2026 23:59:59\"\n\nfecha2 = \"2026-12-31 23:59:59\"\n\n# En esta parte aplicamos la conversion y creación del objeto fecha\n\ndate_time_object = datetime.strptime(fecha, \"%d-%m-%Y %H:%M:%S\")\n\nconversion = datetime.strptime(fecha2, \"%Y-%m-%d %H:%M:%S\")\n\nprint(date_time_object)\n\n\n\n\n# Para trabajar solamente con la fecha\n\ndate_object = datetime.strptime(fecha, \"%d-%m-%Y %H:%M:%S\").date()\n\nprint(date_object)\n\n\n# Para trabajar solamente con la hora\n\ntime_object = datetime.strptime(fecha,\"%d-%m-%Y %H:%M:%S\").time()\n\nprint(time_object)\n\n\n\n\n# Conversión de una cadena a fecha solamente\n\nfecha = \"31/12/2026\"\n\n# En esta parte aplicamos la conversion y creación del objeto fecha\n\ndate_time_object = datetime.strptime(fecha, \"%d/%m/%Y\")\n\nprint(date_time_object.day)     # Aqui obtenemos el dia\nprint(date_time_object.month)   # Aqui obtenemos el mes\nprint(date_time_object.year)    # Aqui obtenemos el año\n\n\n\n\n\n\n# Sumar días u horas a la fecha actual. Para restar usar números negativos\n\nnew_date = ahora + timedelta(days=2)\n\nnew_date = ahora + timedelta(hours=2)\n\n# Sumar años, meses, minutos o segundos a la fecha actual. Para restar usar números negativos\n\nnew_date = ahora + relativedelta(years=2)\n\nnew_date = ahora + relativedelta(months=2)\n\nnew_date = ahora + relativedelta(minutes=2)\n\nnew_date = ahora + relativedelta(seconds=2)\n\nprint(new_date)\n\n# 09/10/2026 12:30:00   -->     11/12/2028 14:32:02\n\n# 09/10/2026 12:30:00   <--     09/10/2026 00:00:00\n\n\n\n\n\n#Comparación\n\nif ahora < new_date:\n    print(\"La fecha actual es menor que la nueva fecha\")\n    \n# Pregunta: ¿Cuántos dias quedan para Fin de Año?\n\ndias = (date_object - hoy).days\n\nprint (\"Faltan \" + str(dias) + \" dias para Fin de Año\")\n\n\n\n\n# Conversión de una fecha a cadena\n\n\nahora = datetime.now()\n\nprint(ahora.strftime('%d-%m-%Y'))                           # 09-10-2026\nprint(ahora.strftime('%A, %d %B, %y'))                      # Friday, 09 October, 26\nprint(ahora.strftime('%H:%M:%S'))                           # 12:42:24\nprint(ahora.strftime('%H horas, %M minutos y %S segundos')) # 12 horas, 42 minutos y 24 segundos"
  },
  {
    "id": "ml-ejercicio01-ejercicio1",
    "filename": "ejercicio1.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 01: ejercicio1",
    "desc": "Resolución práctica del ejercicio 01 de algoritmos y tratamiento de datos.",
    "code": "\"\"\"\nBlanca de Uña Martín\n\"\"\"\n\n# ==============================================================================\n# CREACIÓN DEL CODE-SNIPPET EN VS CODE:\n# Para automatizar la inclusión del módulo 'os' y la limpieza de pantalla:\n# 1. Se creó el archivo de snippets '.vscode/pyinit.code-snippets' en el proyecto.\n# 2. Se definió la regla JSON con:\n#    - \"prefix\": \"pyinit\" -> El atajo que se escribe en el editor.\n#    - \"body\": Líneas de código a insertar automatizadamente (import os + os.system(\"clear\")).\n#    - \"$0\": Posición donde se ubica el cursor tras insertar la plantilla.\n# Al escribir 'pyinit' y pulsar Tab/Enter, VS Code inserta automáticamente este bloque.\n# ==============================================================================\n\n# Importación de la librería 'os' para interactuar con comandos del sistema operativo\nimport os\n\n# Limpiar la pantalla de la terminal (usa \"clear\" para Mac/Linux y \"cls\" para Windows)\n# Permite tener una consola limpia antes de ejecutar el programa\nos.system(\"clear\")\n\n# Ejercicio 01.- Ejemplo básico de Python: lectura de datos y formateo de salida\n\n# 1. Pedir por pantalla los datos al usuario usando la función input()\n# La función input() muestra la pregunta en la terminal, detiene la ejecución\n# hasta que el usuario escribe un valor y lo almacena como texto (string) en la variable.\nnombre = input(\"Introduce tu nombre: \")\nprimer_apellido = input(\"Introduce tu primer apellido: \")\nsegundo_apellido = input(\"Introduce tu segundo apellido: \")\nedad = int(input(\"Introduce tu edad: \"))\ncodigo_postal = input(\"Introduce tu código postal: \")\npoblacion = input(\"Introduce tu población: \")\ntelefono = input(\"Introduce tu teléfono: \")\n\n# 2. Mostrar los resultados por terminal utilizando f-strings (f\"...\")\n# Las f-strings nos permiten formatear texto e integrar variables fácilmente mediante llaves {}\nprint(\"\\n--- RESULTADOS ---\")\n\n# Concatenación de nombre y apellidos intercalando espacios\nprint(f\"nombre completo: {nombre} {primer_apellido} {segundo_apellido}\")\n\n# Muestra el valor almacenado en la variable edad\nprint(f\"edad: {edad}\")\n\n# Combina el código postal y la población en un formato de dirección\nprint(f\"dirección: CP {codigo_postal}, {poblacion}\")\n\n# Muestra el número de teléfono capturado\nprint(f\"teléfono: {telefono}\")",
    "img": null
  },
  {
    "id": "ml-ejercicio03-ejercicio03",
    "filename": "ejercicio03.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 03: ejercicio03",
    "desc": "Resolución práctica del ejercicio 03 de algoritmos y tratamiento de datos.",
    "code": "\"\"\"\nBlanca de Uña Martín\n\"\"\"\n\nTASA_CAMBIO = 1.33250\n\ndolares = float(input(\"Introduce la cantidad de dólares: \"))\neuros = dolares / TASA_CAMBIO\nprint(f\"El cambio es {round(euros, 2)} euros.\")\n\neuros_usuario = float(input(\"Introduce la cantidad de euros: \"))\ndolares_usuario = euros_usuario * TASA_CAMBIO\nprint(f\"El cambio es {round(dolares_usuario, 2)} dólares.\")",
    "img": "/fuentes/tecnofor/python/img/ejercicio03.png"
  },
  {
    "id": "ml-ejercicio04-ejercicio04",
    "filename": "ejercicio04.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 04: ejercicio04",
    "desc": "Resolución práctica del ejercicio 04 de algoritmos y tratamiento de datos.",
    "code": "\"\"\"\nBlanca de Uña Martín\n\"\"\"\n\nresultado = ((3 + 2) / (2 * 5)) ** 2\nprint(round(resultado, 2))",
    "img": "/fuentes/tecnofor/python/img/ejercicio04_image.png"
  },
  {
    "id": "ml-ejercicio05-ejercicio05",
    "filename": "ejercicio05.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 05: ejercicio05",
    "desc": "Resolución práctica del ejercicio 05 de algoritmos y tratamiento de datos.",
    "code": "\"\"\"\nBlanca de Uña Martín\n\"\"\"\n\n# Parte I\ndias = int(input(\"Introduce los días: \"))\nhoras = int(input(\"Introduce las horas: \"))\nminutos = int(input(\"Introduce los minutos: \"))\n\nsegundos_totales = (dias * 24 * 3600) + (horas * 3600) + (minutos * 60)\nprint(f\"Son un total de {segundos_totales} segundos.\")\n\n# Parte II\nsegundos_input = int(input(\"Introduce una cantidad de segundos: \"))\ndias_res = segundos_input // (24 * 3600)\nresto = segundos_input % (24 * 3600)\nhoras_res = resto // 3600\nresto %= 3600\nminutos_res = resto // 60\nsegundos_res = resto % 60\n\nprint(f\"{segundos_input} segundos equivalen a {dias_res} días, {horas_res} horas, {minutos_res} minutos y {segundos_res} segundos.\")",
    "img": "/fuentes/tecnofor/python/img/ejercicio05.png"
  },
  {
    "id": "ml-ejercicio06-ejercicio06",
    "filename": "ejercicio06.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 06: ejercicio06",
    "desc": "Resolución práctica del ejercicio 06 de algoritmos y tratamiento de datos.",
    "code": "\"\"\"\nBlanca de Uña Martín\n\"\"\"\n\nnum1 = int(input(\"Introduce el primer número: \"))\nnum2 = int(input(\"Introduce el segundo número: \"))\nnum3 = int(input(\"Introduce el tercer número: \"))\n\nnumeros = [num1, num2, num3]\n\nmayor = max(numeros)\nmenor = min(numeros)\n\nprint(f\"El mayor es: {mayor}\")\nprint(f\"El menor es: {menor}\")\n\nfor n in numeros:\n    if n % 2 == 0:\n        print(f\"El número {n} es par.\")\n    else:\n        print(f\"El número {n} es impar.\")",
    "img": "/fuentes/tecnofor/python/img/ejercicio06.png"
  },
  {
    "id": "ml-ejercicio07-ejercicio07",
    "filename": "ejercicio07.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 07: ejercicio07",
    "desc": "Resolución práctica del ejercicio 07 de algoritmos y tratamiento de datos.",
    "code": "\"\"\"\nBlanca de Uña Martín\n\"\"\"\n\nmomento = input(\"Introduce el momento del día (m-mañana, t-tarde, n-noche): \").lower()\nsexo = input(\"Introduce tu sexo (m-masculino, f-femenino): \").lower()\n\nsaludo_momento = \"\"\nif momento == 'm':\n    saludo_momento = \"Buenos días\"\nelif momento == 't':\n    saludo_momento = \"Buenas tardes\"\nelif momento == 'n':\n    saludo_momento = \"Buenas noches\"\nelse:\n    saludo_momento = \"Hola\"\n\nsaludo_sexo = \"\"\nif sexo == 'm':\n    saludo_sexo = \"señor\"\nelif sexo == 'f':\n    saludo_sexo = \"señora\"\nelse:\n    saludo_sexo = \"\"\n\nprint(f\"{saludo_momento} {saludo_sexo}\")",
    "img": "/fuentes/tecnofor/python/img/ejercicio07.png"
  },
  {
    "id": "ml-ejercicio08-ejercicio08",
    "filename": "ejercicio08.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 08: ejercicio08",
    "desc": "Resolución práctica del ejercicio 08 de algoritmos y tratamiento de datos.",
    "code": "\"\"\"\nBlanca de Uña Martín\n\"\"\"\n\ntipo = input(\"¿Desea una pizza vegetariana? (s/n): \").lower()\n\ningredientes_base = [\"mozzarella\", \"tomate\"]\n\nif tipo == 's':\n    print(\"Ingredientes disponibles: 1. Pimiento 2. Cebolla 3. Tofu\")\n    opcion = input(\"Elija un ingrediente (1, 2 o 3): \")\n    if opcion == '1':\n        ingrediente = \"Pimiento\"\n    elif opcion == '2':\n        ingrediente = \"Cebolla\"\n    elif opcion == '3':\n        ingrediente = \"Tofu\"\n    else:\n        ingrediente = \"Ninguno\"\n    \n    print(\"La pizza es vegetariana.\")\n    print(f\"Ingredientes: {', '.join(ingredientes_base)}, {ingrediente}\")\n    \nelif tipo == 'n':\n    print(\"Ingredientes disponibles: 1. Pepperoni 2. Jamón 3. Salmón\")\n    opcion = input(\"Elija un ingrediente (1, 2 o 3): \")\n    if opcion == '1':\n        ingrediente = \"Pepperoni\"\n    elif opcion == '2':\n        ingrediente = \"Jamón\"\n    elif opcion == '3':\n        ingrediente = \"Salmón\"\n    else:\n        ingrediente = \"Ninguno\"\n        \n    print(\"La pizza NO es vegetariana.\")\n    print(f\"Ingredientes: {', '.join(ingredientes_base)}, {ingrediente}\")\nelse:\n    print(\"Opción no válida.\")",
    "img": "/fuentes/tecnofor/python/img/ejercicio08.png"
  },
  {
    "id": "ml-ejercicio09-ejercicio09",
    "filename": "ejercicio09.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 09: ejercicio09",
    "desc": "Resolución práctica del ejercicio 09 de algoritmos y tratamiento de datos.",
    "code": "\"\"\"\nBlanca de Uña Martín\n\"\"\"\n\nsaldo = 1000.0\n\nwhile True:\n    print(\"\\n--- CAJERO AUTOMÁTICO ---\")\n    print(\"1. Consultar saldo\")\n    print(\"2. Ingresar dinero\")\n    print(\"3. Retirar dinero\")\n    print(\"4. Salir\")\n    opcion = input(\"Elige una opción: \")\n\n    match opcion:\n        case \"1\":\n            print(f\"Su saldo actual es de {saldo} euros.\")\n        case \"2\":\n            ingreso = float(input(\"¿Cuánto dinero desea ingresar?: \"))\n            if ingreso > 0:\n                saldo += ingreso\n                print(f\"Ha ingresado {ingreso} euros. Nuevo saldo: {saldo} euros.\")\n            else:\n                print(\"Cantidad no válida.\")\n        case \"3\":\n            retiro = float(input(\"¿Cuánto dinero desea retirar?: \"))\n            if retiro > saldo:\n                print(\"Error: No puede retirar más de lo que hay en la cuenta.\")\n            elif retiro > 0:\n                saldo -= retiro\n                print(f\"Ha retirado {retiro} euros. Nuevo saldo: {saldo} euros.\")\n            else:\n                print(\"Cantidad no válida.\")\n        case \"4\":\n            print(\"Saliendo del cajero. ¡Hasta pronto!\")\n            break\n        case _:\n            print(\"Opción no válida. Por favor, intente de nuevo.\")",
    "img": "/fuentes/tecnofor/python/img/ejercicio09_image.png"
  },
  {
    "id": "ml-ejercicio10-ejercicio10",
    "filename": "ejercicio10.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 10: ejercicio10",
    "desc": "Resolución práctica del ejercicio 10 de algoritmos y tratamiento de datos.",
    "code": "\"\"\"\nBlanca de Uña Martín\n\"\"\"\n\nusuario = \"\"\nwhile not usuario:\n    usuario = input(\"Introduce un nombre de usuario: \")\n    if not usuario:\n        print(\"El nombre de usuario no puede estar vacío.\")\n\nwhile True:\n    pass1 = input(\"Introduce una contraseña: \")\n    pass2 = input(\"Repite la contraseña: \")\n    \n    if not pass1 or not pass2:\n        print(\"Las contraseñas no pueden estar vacías.\")\n    elif pass1 != pass2:\n        print(\"Error: Las contraseñas no coinciden.\")\n    else:\n        print(\"¡Registro completado!\")\n        print(f\"Usuario: {usuario}\")\n        print(f\"Contraseña: {pass1}\")\n        break",
    "img": "/fuentes/tecnofor/python/img/ejercicio10_image.png"
  },
  {
    "id": "ml-ejercicio11-ejercicio11",
    "filename": "ejercicio11.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 11: ejercicio11",
    "desc": "Resolución práctica del ejercicio 11 de algoritmos y tratamiento de datos.",
    "code": "\"\"\"\nBlanca de Uña Martín\n\"\"\"\n\ncantidad = int(input(\"Cuantos asteriscos desea imprimir?: \"))\n\nfor i in range(cantidad):\n    print(\"*\", end=\"\")\nprint()",
    "img": "/fuentes/tecnofor/python/img/ejercicio11.png"
  },
  {
    "id": "ml-ejercicio12-ejercicio12",
    "filename": "ejercicio12.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 12: ejercicio12",
    "desc": "Resolución práctica del ejercicio 12 de algoritmos y tratamiento de datos.",
    "code": "\"\"\"\nBlanca de Uña Martín\n\"\"\"\n\nwhile True:\n    n = int(input(\"¿Cuántos números desea imprimir? (mínimo 2 números, mayor que 2): \"))\n    if n > 2:\n        break\n    print(\"El número debe ser positivo y mayor que 2.\")\n\nfib = [0, 1]\nfor i in range(2, n):\n    fib.append(fib[i-1] + fib[i-2])\n\nfor i in range(len(fib)):\n    if i == len(fib) - 1:\n        print(fib[i], end=\"\")\n    else:\n        print(f\"{fib[i]}, \", end=\"\")\nprint()",
    "img": "/fuentes/tecnofor/python/img/ejercicio12b.png"
  },
  {
    "id": "ml-ejercicio13-ejercicio13",
    "filename": "ejercicio13.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 13: ejercicio13",
    "desc": "Resolución práctica del ejercicio 13 de algoritmos y tratamiento de datos.",
    "code": "\"\"\"\nBlanca de Uña Martín\n\"\"\"\n\nnum1 = int(input(\"Introduce el primer número: \"))\nnum2 = int(input(\"Introduce el segundo número: \"))\nletra = input(\"Introduce 'p' para pares o 'i' para impares: \").lower()\n\ninicio = min(num1, num2)\nfin = max(num1, num2)\n\nif letra == 'p':\n    for i in range(inicio, fin + 1):\n        if i % 2 == 0:\n            print(i)\nelif letra == 'i':\n    for i in range(inicio, fin + 1):\n        if i % 2 != 0:\n            print(i)",
    "img": "/fuentes/tecnofor/python/img/ejercicio13.png"
  },
  {
    "id": "ml-ejercicio14-ejercicio14",
    "filename": "ejercicio14.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 14: ejercicio14",
    "desc": "Resolución práctica del ejercicio 14 de algoritmos y tratamiento de datos.",
    "code": "\"\"\"\nBlanca de Uña Martín\n\"\"\"\n\nimport random\n\nnumero_secreto = random.randint(1, 20)\nintentos = 5\nacertado = False\n\nprint(\"Adivina el número del 1 al 20 (tienes 5 oportunidades).\")\n\nfor i in range(intentos):\n    intento = int(input(f\"Intento {i+1}: \"))\n    \n    if intento < numero_secreto:\n        print(\"El número que buscas es mayor\")\n    elif intento > numero_secreto:\n        print(\"El número que buscas es menor\")\n    else:\n        print(f\"¡Enhorabuena, acertaste, es el número {numero_secreto}!\")\n        acertado = True\n        break\n\nif not acertado:\n    print(f\"¡Oh, lo siento, era el número {numero_secreto}!\")",
    "img": "/fuentes/tecnofor/python/img/ejercicio14_image.png"
  },
  {
    "id": "ml-ejercicio15-ejemplo_15",
    "filename": "ejemplo_15.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 15: ejemplo_15",
    "desc": "Resolución práctica del ejercicio 15 de algoritmos y tratamiento de datos.",
    "code": "import random\n\nimport os\n\nos.system(\"cls\")\n\n# Genera un número array aleatorio entre 1 y 10 (inclusive)\n\n\nvalores = list()\n\nfor i in range(10):\n    \n    numero = 0\n    \n    while numero == 0:\n        numero = random.randint(-100, 100)\n    \n    valores.append(numero)\n\nprint(valores)                  # Imprimimos el array en horizontal\n\nprint()\n\nfor i in valores:               # Imprimimos el array en vertical\n    print(i)\n\nprint()\n\nfor i in range(len(valores)):   # Imprimimos el array en vertical\n    print(valores[i])",
    "img": null
  },
  {
    "id": "ml-ejercicio16-ejercicio16",
    "filename": "ejercicio16.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 16: ejercicio16",
    "desc": "Resolución práctica del ejercicio 16 de algoritmos y tratamiento de datos.",
    "code": "def main():\n    asignaturas = [\"Matemáticas\", \"Física\", \"Química\", \"Historia\", \"Lengua\"]\n    suspensos = []\n\n    for asignatura in asignaturas:\n        while True:\n            try:\n                nota_str = input(f\"¿Qué nota has sacado en {asignatura}? \")\n                nota = float(nota_str)\n                if 0 <= nota <= 10:\n                    if nota < 5:  # Asumimos que se aprueba con 5\n                        suspensos.append(asignatura)\n                    break\n                else:\n                    print(\"La nota debe estar entre 0 y 10. Inténtalo de nuevo.\")\n            except ValueError:\n                print(\"Valor no válido. Introduce un número entre 0 y 10.\")\n\n    if len(suspensos) == 0:\n        print(\"Has aprobado todo, pasas al curso siguiente\")\n    else:\n        # Se puede dar formato a la lista de asignaturas separada por comas\n        asignaturas_suspensas = \", \".join(suspensos)\n        print(f\"Debes repetir {asignaturas_suspensas}\")\n\nif __name__ == \"__main__\":\n    main()",
    "img": null
  },
  {
    "id": "ml-ejercicio16-ejercicio2",
    "filename": "ejercicio2.py",
    "category": "ml",
    "categoryLabel": "Prácticas de Machine Learning",
    "title": "Práctica 16: ejercicio2",
    "desc": "Resolución práctica del ejercicio 16 de algoritmos y tratamiento de datos.",
    "code": "\"\"\"\nBlanca de Uña Martín\n\"\"\"\n\n# Importación de la libreria para usar comandos del sistema\nimport os\n\n# Limpiar la pantalla de la terminal (cls para Windows, clear para Mac/Linux)\nos.system(\"clear\")\n\n#I. Escribe un programa que pregunte al usuario los dos lados de un rectángulo y presente por pantalla el cálculo del perímetro (suma de los lados) y el área (base por altura) redondeando a dos decimales.\nlado1 = float(input(\"Introduce el primer lado del rectángulo: \"))\nlado2 = float(input(\"Introduce el segundo lado del rectángulo: \"))\n\nperimetro = 2 * (lado1 + lado2)\narea = lado1 * lado2\n\nprint(f\"Perímetro: {perimetro:.2f}\")\nprint(f\"Área: {area:.2f}\")",
    "img": null
  }
];
