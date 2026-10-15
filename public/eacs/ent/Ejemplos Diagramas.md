# Diagrama de clases

Cada uno de los siguientes ejemplos representa en forma de diagrama de clases el enunciado correspondiente. En cada enunciado se indican las clases que deben aparecer. No obstante, puede ser necesario añadir alguna clase asociativa o alguna subclase. El resto de clases se mencionan explícitamente. El nombre de las clases debe aparecer siempre en singular. El tipo cadena se refiere siempre a una cadena de caracteres. Los atributos serán siempre privados, mientras que los métodos serán siempre públicos. Se omitirán los getters y setters (se supone que para cada atributo habrá que definir un setter y un getter).
## Ejemplo 1: Biblioteca
- **Clase Biblioteca**: Representa una biblioteca. Tiene como atributos el nombre y la dirección, ambos de tipo cadena de caracteres. Tiene como método `mida()`, que devuelve un entero con el número de publicaciones que contiene. Una biblioteca suele tener bastantes publicaciones y socios.
- **Clase Publicación**: Representa una publicación de una biblioteca. Una publicación puede estar en más de una biblioteca (ya que hablamos de títulos, no de ejemplares). Una publicación tiene el atributo `títol` (título), de tipo cadena. Una publicación puede ser de dos tipos: libro y revista; si es un libro, hay que registrar también su `isbn` y su `autor`; si es de tipo revista, hay que registrar también su `issn` y la `editorial`. El `isbn`, el `issn`, el `autor` y la `editorial` son de tipo cadena de caracteres.
- **Clase Soci** (Socio): Representa a un socio de alguna biblioteca. Un socio puede serlo de más de una biblioteca. Nos interesa registrar el nombre del socio (que es de tipo cadena) y, para cada biblioteca de la cual sea socio, su número de socio, que es un entero, y su fecha de alta (que es de tipo fecha).
## Ejemplo 2: Habitaciones de un hotel
- **Clase Hotel**: Representa un hotel; tiene los atributos `nom` (nombre), de tipo cadena, y `estrelles` (estrellas, de tipo entero); también tiene el método `disponibles()`, que devuelve un entero con el número de habitaciones disponibles actualmente en el hotel. Un hotel está formado por habitaciones y servicios (recepción, camareros, nevera, spa, piscina...).
- **Clase Habitació** (Habitación): Representa una habitación del hotel; tiene los atributos `número`, de tipo entero, `preu` (precio), de tipo float, y `disponible`, de tipo booleano. Hay habitaciones individuales, dobles y familiares; hay que tener registrado, para las habitaciones individuales, la superficie que tienen (se representará con un entero, que informa de los metros cuadrados que tiene) y, para las habitaciones familiares, la capacidad (también representada con un entero).    
- **Clase Servei** (Servicio): Representa un servicio del hotel; tiene el atributo `nom`; hay servicios gratuitos (como la recepción, la limpieza de habitaciones...) y otros de pago (como la lavandería, la sauna...). En este último caso, nos interesa registrar su precio.    
- **Clase Client** (Cliente): Representa a un cliente de uno o más hoteles. Tiene los atributos `nom` y `adreça`, de tipo cadena. También tiene el método `hotels()`, que devuelve un entero con el número de hoteles en los que se ha alojado el cliente durante los últimos 12 meses. Para cada cliente hay que registrar en qué hoteles se ha alojado y, para cada vez que se ha alojado, la fecha de llegada y de salida.
## Ejemplo 3: Pedidos
- **Clase Comanda** (Pedido): Representa un pedido que nos ha hecho un cliente. Tiene los atributos `número` (es un entero) y `data` (es de tipo fecha). Además, tiene el método `import()`, que devuelve un float con el importe total del pedido. El pedido está formado por líneas de pedido. Hay dos tipos de pedidos: normales y exprés; de estos últimos nos interesa registrar el tiempo que tardan, como máximo, en ser servidos. Es un entero y representa el número de horas máximo que se puede tardar en servir.
- **Clase Línia Comanda** (Línea de pedido): Representa una línea del pedido. Cada línea tiene su número de línea (dentro del pedido, lógicamente), el número de unidades y el precio unitario del producto en el momento de hacer el pedido. El número de línea y el número de unidades son enteros, mientras que el precio unitario es de tipo float. Una línea de pedido hace siempre referencia a un solo producto.
- **Clase Producte** (Producto): Representa un producto asociado a alguna línea de algún pedido. Tiene como atributos su `codi` (de tipo entero), su `nom` (de tipo cadena de caracteres) y una `descripció` (de tipo cadena). Un producto puede aparecer en más de una línea de pedido. La clase Producto también tiene los métodos `unitatsComprades(any)` y `unitatsVenudes(any)` que, respectivamente, devuelven un entero con el número de unidades compradas y vendidas de este producto durante el año indicado por el parámetro del método (que es de tipo entero).
- **Clase Client** (Cliente): Representa a un cliente que al menos nos ha pedido un pedido. Tiene los atributos de tipo cadena `nom`, `nif`, `telèfon` y `adreça`.
# Diagramas de casos de uso

## Conceptos principales
- **Caso de uso**: Acción o operación del sistema desencadenada por un actor.
- **Actor**: Quien desencadena un caso de uso o recibe su resultado.
- **Extensión (`<<extend>>`)**: Mecanismo para separar de un caso de uso una o más partes que son opcionales. Al hacerlo hay que indicar la condición que provoca la realización de este caso de uso. Se suele hacer cuando nos interesa destacar esta parte opcional o bien porque también forma parte de otros casos de uso    
- **Inclusión (`<<include>>`)**: Mecanismo para separar del caso de uso una parte que es básica; se suele hacer cuando una parte del caso de uso es común a diferentes casos de uso o porque es importante destacar esta parte (si no, no se recomienda realizar la separación).
- **Asociación**: Camino de comunicación entre un actor y un caso de uso
## Ejemplo 1: Gestión sencilla de una biblioteca

- **Un usuario puede**:
    - Solicitar un préstamo, previa búsqueda del libro que desea        
    - Consultar los préstamos que tiene activos.

- **Un bibliotecario puede**:
    - Ver el estado de un libro, previa búsqueda de este.
    - Registrar un préstamo. Incluye la búsqueda del libro y del usuario.
    - Registrar la devolución de un préstamo. También incluye la búsqueda del libro y del usuario.
    - Listar los préstamos fuera de plazo.    
- **El sistema**:
    - Avisa al usuario el día antes de la finalización de uno de sus préstamos.
## Ejemplo 2: Gestión sencilla de las reservas de un hotel

- **Un cliente puede**:
    - Hacer una reserva y, eventualmente, un pago, previa consulta de la disponibilidad de habitaciones.
        
- **El recepcionista puede**:
    - Prolongar una estancia, previa consulta de la disponibilidad de habitaciones.
    - Registrar una salida. Puede incluir cobrar (es un proceso diferente de pagar).

- **El sistema**:    
    - Avisa al cliente el día antes del inicio de su reserva.
### Ejemplo 3: Gestión sencilla de stocks

- **El responsable de compras puede**:
    - Consultar los productos con stock por debajo del mínimo; si cree conveniente comprar, generar un pedido.
    - Anular un pedido, después de haberlo buscado.

- **El responsable del almacén puede**:
    - Registrar un pedido recibido, después de haberlo buscado.
    - Actualizar el stock cuando se recibe o se vende mercancía.
## Diagramas de secuencia

## Ejemplo 1: Gestión del préstamo de libros en una biblioteca
Representa el proceso habitual que sigue un préstamo:
1. El usuario consulta un libro.
2. El usuario hace una solicitud de préstamo. El préstamo se crea como solicitado.
3. El usuario pide el préstamo solicitado al bibliotecario.
4. El bibliotecario consulta la información sobre el préstamo solicitado.
5. El bibliotecario registra el préstamo. El préstamo pasa a estar activo.
6. El día antes de la finalización del préstamo, el sistema avisa al usuario.
7. El usuario devuelve el libro al bibliotecario    
8. El bibliotecario registra la devolución. El préstamo finaliza.
## Ejemplo 2: Gestión de las reservas en un hotel
Representa el proceso que puede seguir una reserva y el uso de unas habitaciones:
1. El cliente consulta las habitaciones disponibles.
2. El cliente reserva una habitación.
3. El cliente llega al hotel e indica al recepcionista la reserva que ha realizado.
4. El recepcionista consulta la reserva y registra las habitaciones que ocupa el cliente. Con esto último termina la reserva.
5. El cliente pide al recepcionista prolongar la estancia.
6. El recepcionista actualiza la información de las habitaciones.
7. Cuando tiene que marchar, el cliente paga al recepcionista y, a continuación, abandona el hotel.
8. El recepcionista cobra al cliente cuando le está pagando y registra el pago en la aplicación bancaria.
9. El recepcionista registra que la habitación ha quedado disponible.
## Ejemplo 3: Gestión de stocks
Representa el proceso habitual que sigue la gestión de stocks cuando se acaba el stock de un producto:
1. El responsable de compras consulta los productos por debajo del mínimo, genera pedidos y avisa al proveedor
2. El proveedor sirve el pedido. Como consecuencia:
3. El responsable del almacén registra la recepción del pedido. El pedido pasa al histórico.
4. El responsable del almacén actualiza el stock.
# Diagramas de actividades
Un diagrama de actividades representa en detalle las actividades que suceden dentro de un caso de uso o dentro del comportamiento de un objeto. Si una actividad depende de una condición, se representa con un nodo de decisión en forma de rombo. Si dos o más actividades pueden realizarse simultáneamente, se representa con un _fork_ y un _join_.
## Ejemplo 1: El recepcionista atiende la llegada de un cliente al hotel
El recepcionista realiza las siguientes actividades:
- Pide la identificación al cliente
- Pregunta al cliente si tiene una reserva realizada.
- **Si el cliente tiene una reserva realizada**: registra que se hará efectiva (con esta operación, la habitación pasa a figurar como ocupada).
- **Si no tiene reserva**: comprueba si hay habitaciones disponibles.
    - Si hay habitaciones disponibles, elige una y registra que está ocupada.
    - Si no hay, se limita a despedir al cliente.
- Si finalmente se ha podido asignar una habitación al cliente, genera una tarjeta-clave y, a la vez, avisa al servicio para que suba las maletas a la habitación.
- Finalmente, entrega la tarjeta-clave al cliente.
## Ejemplo 2: El recepcionista de un hotel atiende la salida de un cliente

El recepcionista realiza las siguientes actividades:
- Recibe la tarjeta-clave del cliente.
- Con el número de habitación, localiza los datos de la estancia.
- Calcula el importe.
- Genera la factura.
- Pide el importe al cliente:
    - **Si paga en efectivo**: cuenta el dinero, calcula el cambio y da el cambio al cliente.        
    - **Si paga con tarjeta**: pasa la tarjeta por la máquina, el cliente introduce el PIN, imprime el tiquet y da el tiquet al cliente.
- Entrega la factura al cliente.
- Desactiva la tarjeta-clave y, simultáneamente, registra la habitación como libre.
## Ejemplo 3: Un cajero automático

Para simplificar, supondremos que el cajero solo dispensa dinero. El cajero realiza las siguientes actividades:
- Lee la tarjeta introducida.
- Pide el PIN y lo lee.
- **Si el PIN es incorrecto** (permite hasta 3 intentos): vuelve a pedir el PIN. Si es incorrecto en el último intento, muestra un mensaje de error avisando de que no devolverá la tarjeta y finaliza.
- **Si el usuario ha introducido un PIN correcto**:
	- Pide al usuario la cantidad que quiere retirar.
    - Comprueba si el usuario está autorizado a retirar esa cantidad. Si no está autorizado, muestra un mensaje de error.
    - Si está autorizado, comprueba si el cajero tiene suficientes billetes. Si no tiene suficientes, muestra un mensaje de disponibilidad insuficiente; si tiene suficientes, expide los billetes.
- Devuelve la tarjeta al usuario.

# Diagrama de estados

El diagrama de estados representa los estados por los cuales pasa un objeto. Determinados eventos hacen que el objeto cambie de estado. En los enunciados, los nombres de los estados van entre comillas (`<< >>`).
## Ejemplo 1: Instalación de un ascensor
- Se hace un borrador de la instalación prevista (`<<esborrany>>`). En este estado, la instalación puede ser aceptada o rechazada.
- Si es aceptada, se diseña un proyecto (`<<projectada>>`). También en este punto la instalación puede ser rechazada o aceptada.
- Si se acepta, se realiza la instalación y pasa a estar en servicio (`<<en servei>>`).
- Cuando el ascensor está en servicio, puede averiarse y quedar fuera de servicio (`<<fora de servei>>`) hasta que se repara y vuelve a estar en servicio.

### Ejemplo 2: Compra en línea

- El usuario inicia la compra y esta queda abierta (`<<oberta>>`) hasta que el usuario realiza el pago o cancela la operación.
- Mientras la compra está abierta, el usuario puede añadir o suprimir productos o cancelar la operación.    
- Cuando el usuario paga la compra, esta pasa a estar lista (`<<a punt>>`) hasta que el género llega al cliente, momento en el que pasa a estar servida (`<<servida>>`).
- Una compra servida puede ser retornada durante los 15 días siguientes a la recepción; pasados estos 15 días, se da por aceptada.
## Ejemplo 3: Máquina expendedora

- Para simplificar, suponemos que solo sirve un tipo de producto y nunca se queda sin existencias.
- Al inicio, la máquina está apagada (`<<apagada>>`). Al conectarse, pasa a estar disponible (`<<disponible>>`).
- Cuando el cliente introduce una moneda, la máquina puede pasar a uno de los siguientes estados:
    - `<<pagat>>` (pagado): si la moneda cubre exactamente el importe restante.
    - `<<falta>>` (falta): si la moneda es todavía insuficiente.
    - `<<sobra>>` (sobra): si la moneda sobrepasa el importe pedido (permanece en este estado hasta que devuelve el cambio y pasa a `<<pagat>>`).
- Cuando la máquina está en estado `<<pagat>>`, sirve el producto y vuelve al estado `<<disponible>>`.