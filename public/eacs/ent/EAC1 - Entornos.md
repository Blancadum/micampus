CFGS Desarrollo de Aplicaciones Web (DAW)
EAC1 (Curso 2026-27 / 1.er semestre)
Módulo 0487– Entornos de Desarrollo.    
Unidad 1 – Introducción al diseño orientado a objetos
### Presentación y objetivos

Este ejercicio de evaluación continuada (EAC) se corresponde con los contenidos trabajados en la unidad 1, Introducción al diseño orientado a objetos.

Los resultados de aprendizaje que se plantean son:
- RA5. Genera diagramas de clases valorando su importancia en el desarrollo de aplicaciones y empleando herramientas específicas
- RA6. Genera diagramas de comportamiento valorando su importancia en el desarrollo de aplicaciones y empleando herramientas específicas.
### Criterios de evaluación

La puntuación máxima asignada a cada actividad se indica en el enunciado.
Los criterios que se tendrán en cuenta para evaluar el trabajo del alumnado son los siguientes:
- Corrección y concreción en las respuestas.
- Corrección y claridad en los procedimientos realizados.
### Forma y fecha de entrega

Una vez finalizado el ejercicio de evaluación continuada debéis enviar el documento desde el apartado 0487 Entrega EAC1 del aula, dentro del plazo establecido. Tened en cuenta que el sistema no permitirá realizar entregas después de la fecha y hora indicadas.

El nombre del fichero será el siguiente: `DA2_M0487_EAC1_Apellido1_Inicial del apellido2.zip`. Los apellidos se escribirán sin acentos. Por ejemplo, el estudiante Joan García Santos pondría el siguiente nombre a su fichero de la EAC1: `DA2_M0487_EAC1_Garcia_S.zip`. El fichero comprimido contendrá los ficheros que se pidan en cada uno de los ejercicios. El nombre de dichos ficheros se indicará en cada ejercicio.
Sustituid _Nombre y apellidos_ de la cabecera por vuestros datos personales.
El plazo de entrega finaliza a las 23:55 h del día 20/10/2026. La propuesta de solución se publicará el día 16/11/2026 y las calificaciones el día 16/11/2026.
### Enunciado

> **OBSERVACIÓN IMPORTANTE:** Hay que utilizar el programa Eclipse con el conector (_plugin_) Papyrus para realizar diagramas UML, generar código automáticamente a partir de estos diagramas y generar diagramas a partir de código, según se pida en cada ejercicio. En los recursos del aula podéis encontrar un documento sobre la instalación y el funcionamiento básico de este software. En este documento también se incluyen instrucciones para conseguir el fichero gráfico con el diagrama que habéis hecho. Estos ficheros gráficos resultantes los anexaréis al fichero comprimido que debéis entregar y les daréis el nombre que se indica en cada ejercicio.
> 
> Aparte de los ejemplos del material del módulo, disponéis también de otro documento en el material complementario con más ejemplos de los diferentes tipos de diagramas UML que os pueden servir de ayuda para la resolución de los siguientes ejercicios.

#### 1. (2,5 puntos) Diagrama de clases (I).

**a) (2 puntos)** Sois contratados como analistas y desarrolladores del sistema para la Comisión de la Fiesta Mayor (_Festa Major_) de una ciudad con una gran tradición y un rico patrimonio festivo. El objetivo es organizar la información de las diferentes comparsas (_colles_) del Bestiario (la _Mulassa_, el _Àliga_, el _Bou_, ...), de los Bailes (_de Pastorets_, _de Cossis_, _de Cercolets_, _de Gitanes_, ...), Gigantes (_nous_, _vells_, ...) y sus ensayos y actuaciones. A partir de la descripción siguiente, cread un diagrama de clases UML utilizando el software Papyrus. Aseguraos de que la cardinalidad y la visibilidad de los atributos y operaciones (si las hay) son correctas. Recordad que no debéis representar ni los _getters_ ni los _setters_ y que los nombres de las clases deben estar en singular.

**Descripción del sistema:**

1. **Elemento Festivo:** Cada baile o elemento (_Gegants_, _Bastoners_, _Cercolets_, _Diables_, _Castellers_) tiene un nombre del elemento, un año de recuperación o fundación, una categoría (fuego, baile hablado, bestiario, colla castellera, baile tradicional, ...) que es una cadena de caracteres y el número mínimo de participantes requerido.
2. **Miembros:** Cada integrante tiene un DNI, un nombre, una edad, un teléfono y un rol principal (_ballador/a_, _músic/a_, _portador/a_, ...) que es una cadena de caracteres. Los miembros pueden participar en múltiples ensayos
3. **Jefe de Comparsa (_Cap de Colla_):** Es el responsable del elemento festivo y toma las decisiones. Es un tipo de miembro con experiencia destacada del que se quiere saber la fecha en que fue elegido para el cargo.
4. **Coordinación de Cultura:** Es una entidad municipal que tiene un nombre y una dirección de sede. Organiza las fiestas y supervisa los diferentes elementos festivos.
5. **Ensayo:** Cada ensayo relaciona un Elemento Festivo con los Miembros que participan en él. Tiene atributos propios como la fecha, la hora de inicio y la duración en minutos.
6. **Actuación:** Es la salida pública de uno o más elementos festivos (_Cercavila_, _Diada Castellera_, _Seguici_, _Correfoc_, ...). Cada actuación tiene un nombre, una fecha y la ubicación o recorrido. Las actuaciones son organizadas por la Coordinación de Cultura.

**b) (0,5 puntos)** Generad el código Java correspondiente a este diagrama de clases.

_El resultado de este ejercicio 1 está formado por:_
- El fichero `Exercici1.png`, que contendrá el diagrama en formato gráfico.
- El fichero `Exercici1.zip`, que contendrá la carpeta con el código generado.
#### 2. (2 puntos) Diagrama de clases (II).

Representad, utilizando el software Papyrus, un diagrama de clases sobre la gestión del Bestiario de Fuego y la Pirotecnia de la Fiesta Mayor. Aseguraos de que la cardinalidad y la visibilidad de los atributos y operaciones es correcta. No debéis representar ni los _setters_ ni los _getters_, y es necesario poner los nombres de las clases en singular.

**Descripción del sistema:**

1. **Equipamiento Festivo:** Elemento base que tiene un código de inventario y un estado de conservación (cadena de caracteres).
2. **Bestia de Fuego:** Es un tipo de Equipamiento Festivo (como el _Drac_ o la _Vibria_) del cual queremos saber el peso en kg, el número de puntos de fuego y el año de construcción.
3. **Ceptrot:** Elemento de estructuras de fuego complejas que llevan los diablos (es una evolución de la horca). Queremos saber su estilo. Está formado por diversos Surtidores de Pirotecnia. Estos surtidores forman parte esencial de la estructura del _ceptrot_ y no tienen sentido si el _ceptrot_ se destruye. De cada surtidor se quiere saber la capacidad de quemadores.
4. **Protección de Fuego:** Equipamiento de seguridad (traje, gafas, guantes, ...) que llevan los diablos. Se pueden intercambiar o asignar a diferentes diablos. Se necesita saber el tipo.
5. **Diablo:** Persona que tiene un DNI, nombre y el código de la licencia de quemado (RGCRE). Puede tener asignadas diversas bestias de fuego o _ceptrots_, pero cada bestia o _ceptrot_ tiene un único diablo responsable.
6. **Tramo de Correfoc:** Lugar o calles por donde pasa la cercavila nocturna (los diablos y el equipamiento). Tiene el nombre de la calle y las coordenadas de inicio y final.
7. **Técnico/a de Seguridad:** Persona con DNI, nombre y titulación en protección civil que se encarga de revisar el estado del material pirotécnico
8. **Informe de Inspección:** Creado por el técnico de seguridad después de revisar un equipamiento festivo. Tiene una fecha y un resultado (verdadero es apto, falso es no apto).

_El resultado de este ejercicio será el fichero `Exercici2.png`, que contendrá el diagrama de clases en formato gráfico._
#### 3. (0,5 puntos) Diagrama de clases (III). Ingeniería inversa.

Cread un proyecto Java y anexionadle la siguiente clase (aseguraos de que el fichero se llame `ElementFestiu.java` y esté dentro del paquete `festamajor`, es decir, dentro de una carpeta llamada `festamajor`):

Java

```
package festamajor;

import java.util.Date;

public class ElementFestiu {
    private String nomFestiu;
    private String colla;
    private Date dataConstruccio;
    private int pesKg;
    private boolean requereixRestauracio;

    public String getNomFestiu() { return nomFestiu; }
    public String getColla() { return colla; }
    public Date getDataConstruccio() { return dataConstruccio; }
    public int getPesKg() { return pesKg; }
    public boolean isRequereixRestauracio() { return requereixRestauracio; }

    public void setNomFestiu(String nomFestiu) {
        this.nomFestiu = nomFestiu;
    }
    public void setColla(String colla) { this.colla = colla; }
    public void setDataConstruccio(Date dataConstruccio) {
        this.dataConstruccio = dataConstruccio;
    }
    public void setPesKg(int pesKg) { this.pesKg = pesKg; }
    public void setRequereixRestauracio(boolean requereixRestauracio) {
        this.requereixRestauracio = requereixRestauracio;
    }

    public boolean necessitaManteniment() {
        return this.requereixRestauracio || this.pesKg > 100;
    }
}
```

Importad este código a un diagrama de clases vacío de un proyecto Papyrus. Una vez importado el código, solo debéis dimensionar la clase para que sus elementos se vean enteros. Si algo se importa mal, no debéis modificarlo.

_El resultado de este ejercicio será el fichero `Exercici3.png`, que contendrá el diagrama de clases en formato gráfico._

#### 4. (1 punto) Diagrama de casos de uso.

Representad, utilizando el software Papyrus, un diagrama de casos de uso que represente el funcionamiento de la nueva aplicación «Portal de la Fiesta Mayor». El funcionamiento que hay que representar es el siguiente:

- El/la **Ciudadano/a** puede:
    
    - Consultar el programa de actos y filtrar por tipo de evento (castells, conciertos, correfoc, ...).
    - Reservar asientos para las actuaciones de pago o con aforo limitado. Durante la reserva puede optar por consultar el mapa interactivo para ver el asiento asignado.
    - Inscribirse como voluntario/a para las actividades de la fiesta mayor.
        
- El/la **Jefe de Comparsa (_Cap de Colla_)** puede:
    - Solicitar permisos de ocupación de la vía pública para ensayos o actuaciones.
    - Gestionar el inventario de la comparsa, actualizando el material disponible y dando de baja la indumentaria o herramientas estropeadas.
- El/la **Técnico/a de Cultura** puede:
    - Gestionar las cuentas de usuario, dando de alta o de baja a los usuarios.
    - Generar informes de afluencia y balance económico de las fiestas.
    - Resolver las solicitudes de permiso de ocupación: si se aprueba, otorga una acreditación oficial; si se deniega, propone una ubicación alternativa.
- El/la **Jefe de Comparsa** y el/la **Técnico de Cultura** pueden interactuar mediante un sistema de mensajería interna para coordinar la logística de los cortes de calle.
- Todas las operaciones realizadas por cualquiera de los actores dentro del portal requieren obligatoriamente una autenticación (_login_) previa en el sistema.

_El resultado de este ejercicio será el fichero `Exercici4.png`, que contendrá el diagrama de casos de uso en formato gráfico._

#### 5. (1 punto) Diagrama de secuencia.

Representad, utilizando el software Papyrus, un diagrama de secuencia para el proceso de autorización y lanzamiento de la Tronada de Salida de la Fiesta Mayor:

1. El Técnico de Seguridad inicia la sesión en el Sistema Central.
2. El Sistema Central solicita una verificación del protocolo de seguridad a la Base de Normativa Pirotécnica.
3. La Base de Normativa analiza los parámetros y confirma al Sistema Central que el plan de seguridad está aprobado.
4. El Sistema Central crea un Permiso de Actuación, asignándole los parámetros de distancia de seguridad, hora límite y decibelios permitidos.
5. El Sistema Central activa el Permiso de Actuación para que notifique el aviso de evacuación del perímetro.
6. El Sistema Central envía una notificación al Concejal/a de Fiestas (_Regidor/a de Festes_).
7. El Concejal/a de Fiestas accede al Permiso de Actuación para consultar los detalles.
8. El Concejal/a envía la confirmación de recepción y validación al Sistema Central.
9. El Concejal ordena la ejecución de la tronada de salida al Sistema Central.
10. El Sistema Central envía un aviso de cierre al Permiso de Actuación al terminar la Tronada.

_El resultado de este ejercicio será el fichero `Exercici5.png`, que contendrá el diagrama de secuencia en formato gráfico._

#### 6. (1 punto) Diagrama de comunicación.

Representad, utilizando el software Papyrus, un diagrama de comunicación que refleje la interacción entre los actores y sistemas durante la coordinación en tiempo real del Seguici Popular en pleno recorrido:

1. El Centro de Control de Fiestas envía una orden de inicio del Seguici al Sistema de Coordinación de Paso.    
2. El Sistema de Coordinación de Paso verifica el estado de las calles del recorrido del Seguici.
3. El Sistema de Coordinación de Paso confirma al Centro de Control que el Seguici puede comenzar su recorrido.
4. El Centro de Control solicita al Sistema de Coordinación de Paso que active el seguimiento de afluencia del público a través de las cámaras de la ciudad.
5. El Sistema de Coordinación de Paso envía la señal de vídeo en tiempo real al Punto de Mando de Protección Civil.
6. Protección Civil recibe la imagen y notifica la detección de un colapso de público en una calle estrecha al Centro de Control.
7. El Centro de Control ordena al Sistema de Coordinación que emita un aviso por megafonía para abrir paso a la _Cucafera_.
8. El Sistema de Coordinación de Paso ejecuta el aviso e informa del resultado al Centro de Control.
9. Protección Civil constata que ha acabado el paso del Seguici y notifica el fin al Centro de Control.
10. El Centro de Control envía un mensaje de confirmación de recepción de datos a Protección Civil y otro de final del Seguici al Sistema de Coordinación de Paso.

_El resultado de este ejercicio será el fichero `Exercici6.png`, que contendrá el diagrama de comunicación en formato gráfico._

#### 7. (1 punto) Diagrama de actividades.

Representad, utilizando el software Papyrus, un diagrama de actividades que describa el proceso de organización y realización de una _Diada Castellera_ de Fiesta Mayor:

- El proceso se inicia cuando la _Colla Castellera_ recibe la confirmación de actuación por parte del Comité de Fiesta Mayor.
- Una vez confirmada la fecha, el equipo técnico se divide para llevar a cabo dos tareas simultáneas:
    - Un grupo se encarga de diseñar las piñas y ensayar los castells de gama superior en el local.
    - El otro grupo prepara la logística de los autobuses, las camisas y la protección de la canalla (cascos).        
- Cuando ambas tareas han finalizado, los dos equipos se reúnen en la plaza para hacer la prueba de red (_prova de xarxa_).
- Una vez acabada la prueba, cuando es el día de la _diada castellera_, la comparsa vuelve a dividirse en dos tareas nuevas:
    - Un grupo de castellers empieza a montar la piña del _castell_ de ronda.
    - Los grallers y timbalers empiezan a tocar el toque de entrada en plaza (_toc d'entrada a plaça_) para concentrar al público.
- Cuando ambos grupos han completado su papel, se hace el _castell_.
- Seguidamente se comprueba la coronación del _castell_:
    - Si el _aixaneta_ hace la levantada de mano (_l'aixecada de mà_) y el _castell_ se descarga con éxito, el _castell_ se cierra con celebración y se anota la puntuación en el registro.
    - Si el _castell_ hace leña (_fa llenya_ —caída—), el equipo sanitario atiende a los afectados y se vuelve a preparar la piña y a tocar el toque de entrada.

_El resultado de este ejercicio será el fichero `Exercici7.png`, que contendrá el diagrama de actividades en formato gráfico._
#### 8. (1 punto) Diagrama de estados.

Representad, utilizando el software Papyrus, un diagrama de estados para ilustrar el funcionamiento de la Águila Pequeña (_Àliga Petita_ / _Aligueta_) durante el Seguici Pequeño de la Fiesta Mayor (los estados aparecen en mayúsculas):

- La _Aligueta_ empieza en el estado `REPÒS AL MAGATZEM`, donde revisan que toda la figura esté en buenas condiciones.
- Cuando los porteadores llegan, pasa al estado `PLANTADA A LA PLAÇA`, expuesta para la visión de los ciudadanos.
- Una vez el jefe de comparsa da la señal, cambia al estado `BALLANT AL SEGUICI`.
- Durante el _seguici_ pequeño, el porteador puede decidir un `CANVI DE PORTADOR`, cambiando el estado temporalmente hasta que el nuevo porteador toma el peso.
- Una vez realizado el relevo, vuelve al estado `BALLANT AL SEGUICI`.
- Si durante el _seguici_ pequeño empieza a llover intensamente, el sistema pasa a `REFUGI D’EMERGÈNCIA`. Si la lluvia para, sigue `BALLANT AL SEGUICI`; si se suspende el acto, pasa a ser `GUARDADA AL MAGATZEM` y termina.
- En caso de una caída o una avería estructural grave, la _Aligueta_ pasa al estado `DANYADA`.
- Si la comparsa consigue solucionar el problema en el acto, vuelve al estado `BALLANT AL SEGUICI`; en caso contrario, si no se puede reparar en el momento, el estado final es `FORA DE SERVEI`.
- Si el _seguici_ pequeño acaba sin incidencias, la _Aligueta_ llega a la plaza del Ayuntamiento y el estado cambia a `BALL FINAL` antes de ser `GUARDADA AL MAGATZEM`.

_El resultado de este ejercicio será el fichero `Exercici8.png`, que contendrá el diagrama de estados en formato gráfico._