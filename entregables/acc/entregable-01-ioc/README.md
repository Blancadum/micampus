# 🎓 Tutoría Paso a Paso · Entregable 1: Inversión de Control (IoC) y Beans

¡Hola, Blanca! Bienvenido/a a tu primer entregable oficial del Bootcamp de Spring Boot para **Accenture (L2E)**.

En este documento te voy a guiar como tu tutor personal: veremos **exactamente qué hacemos en cada paso**, **por qué lo hacemos así** según las exigencias del evaluador de Accenture y, al final, repasaremos un **compendio teórico** para que conectes a la perfección lo que has estudiado en *Petete* con el código que acabas de compilar.

---

## 📋 Ficha Técnica del Entregable

* **Plataforma L2E:** [Spring Boot – Uso de IoC (ID: 8537)](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8537)
* **Documento oficial:** `1_SpringBoot_Uso_IoC_enun.pdf`
* **Nombre del proyecto:** `JavaSpringIoC`
* **Tecnologías:** Java 17, Apache Maven, Spring Framework 6 (`spring-context`), JUnit 5.
* **Fecha límite oficial:** Martes, 3 de noviembre de 2026, 23:59.
* **Requisito crítico del evaluador:** Documentación **Javadoc completa** a nivel de clase y en cada método.

---

## 🛠️ Estructura del Entregable

```text
entregable-01-ioc/
├── README.md                                      <-- Esta guía de tutoría y compendio teórico
├── Spring Boot - Uso de IoC - Blanca Perez.zip     <-- Archivo ZIP empaquetado para subir a L2E
└── Spring Boot - Uso de IoC - Blanca Perez/       <-- Carpeta limpia para subir a Git (rama SPRING-BOOT)
    ├── pom.xml                                    <-- [Paso 1] Dependencias de Spring
    ├── .gitignore                                 <-- Reglas de exclusión (target/, etc.)
    └── src/
        ├── main/
        │   ├── java/com/accenture/
        │   │   ├── model/Grupo.java               <-- [Paso 2] POJO con Javadoc
        │   │   └── main/Main.java                 <-- [Paso 4] Arranque IoC Container
        │   └── resources/
        │       └── applicationContext.xml         <-- [Paso 3] Registro del Bean XML
        └── test/java/com/accenture/
            └── GrupoIoCTest.java                  <-- [Paso 5] Verificación JUnit
```

---

### Paso 1: Configuración de Maven (`pom.xml`)

**¿Qué hacemos?**  
Declaramos las dependencias mínimas para trabajar con el núcleo de Spring sin meter librerías innecesarias:

```xml
<dependencies>
    <!-- Contenedor IoC y gestión de ApplicationContext -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>6.1.14</version>
    </dependency>

    <!-- JUnit 5 para tests unitarios -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.10.2</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

> **💡 Consejo del Tutor:**  
> En este primer entregable **no usamos Spring Boot todavía** (`spring-boot-starter-web`), sino el framework base de Spring (`spring-context`). ¿Por qué? Porque Accenture quiere que entiendas cómo funciona el "motor" por debajo antes de que Spring Boot te lo oculte todo con su autoconfiguración mágica.

---

### Paso 2: El Modelo POJO (`Grupo.java`)

**¿Qué hacemos?**  
Creamos la clase `Grupo` dentro del paquete `com.accenture.model` con:
1. 5 atributos privados: `id`, `nombre`, `creacion`, `origen` y `genero`.
2. Constructor vacío obligatorio.
3. Getters y setters con documentación Javadoc.
4. Método `toString()` con el formato exacto requerido por el enunciado:  
   `<nombre> - <origen> <creacion> - <genero>`

```java
@Override
public String toString() {
    return nombre + " - " + origen + " " + creacion + " - " + genero;
}
```

> **⚠️ Ojo con la rúbrica de corrección:**  
> En Accenture penalizan severamente si olvidas el **constructor por defecto sin argumentos**. El contenedor de Spring crea las instancias mediante *Reflection* invocando `Grupo.class.getDeclaredConstructor().newInstance()`. Si eliminas el constructor vacío o lo haces privado, Spring fallará al arrancar.

---

### Paso 3: Registro del Bean en XML (`applicationContext.xml`)

**¿Qué hacemos?**  
Ubicamos en `src/main/resources/applicationContext.xml` la declaración del bean:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- Declaramos que 'grupoBean' será una instancia administrada de Grupo -->
    <bean id="grupoBean" class="com.accenture.model.Grupo" />

</beans>
```

> **💡 Consejo del Tutor:**  
> Fíjate en que **no hemos puesto etiquetas `<property>` dentro del bean**. El enunciado especifica expresamente: *«sin inyectar los valores (la inyección/asignación se realizará posteriormente en el código Java)»*. Aquí Spring solo crea la cáscara del objeto y nosotros le damos los datos en tiempo de ejecución.

---

### Paso 4: Arranque y Consumo del Bean (`Main.java`)

**¿Qué hacemos?**  
En `com.accenture.main.Main`, ejecutamos el ciclo de vida completo:

1. **Arrancamos el contenedor IoC:**
   ```java
   ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
   ```
2. **Pedimos el Bean a Spring:**
   ```java
   Grupo grupo = context.getBean("grupoBean", Grupo.class);
   ```
3. **Asignamos los datos con los setters:**
   ```java
   grupo.setId(1);
   grupo.setNombre("Metallica");
   grupo.setOrigen("Estados Unidos");
   grupo.setCreacion(1981);
   grupo.setGenero("Heavy Metal");
   ```
4. **Imprimimos el resultado:**
   ```java
   System.out.println(grupo.toString());
   // Salida esperada: Metallica - Estados Unidos 1981 - Heavy Metal
   ```
5. **Cerramos el contexto:**
   ```java
   context.close();
   ```

> **⚠️ Detalle de calidad profesional:**  
> No olvides nunca `context.close()`. Libera los recursos del contenedor y avisa a Spring de que finalice el ciclo de vida de los beans (invocando los métodos `@PreDestroy` si existieran).

---

### Paso 5: Verificación Automatizada (`GrupoIoCTest.java`)

Para que no entregues a ciegas, creamos una batería de tests unitarios con JUnit 5 que comprueban:
- Que el archivo XML se carga correctamente en el Classpath.
- Que Spring devuelve una instancia no nula de tipo `Grupo`.
- Que tras los setters, `toString()` coincide al 100% con la cadena esperada.

Para ejecutar los tests en tu terminal:
```bash
mvn clean test
```

---

### Paso 6: Instrucciones Oficiales de Entrega

1. **Subir a tu Git:**
   - Rama oficial: `SPRING-BOOT`
   - Carpeta dentro de la rama: `Spring Boot - Uso de IoC - Nombre Apellido`
2. **Exportar a archivo ZIP:**
   - Nombre: `Spring Boot - Uso de IoC - Nombre Apellido.zip`
   - Comando directo desde terminal (excluyendo la carpeta `target` para que pese menos de 100 KB):
     ```bash
     zip -r "Spring Boot - Uso de IoC - Blanca.zip" JavaSpringIoC -x "*/target/*"
     ```
3. **Subir al campus:** Entrega el ZIP en la tarea [L2E #8537](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8537).

---

## 🧠 Compendio Teórico: Conectando Teoría y Práctica

Ahora que has visto el código funcionando, vamos a asentar los conceptos fundamentales para que los domines con total seguridad.

### 1. El Problema que Resuelve este Ejercicio: El Acoplamiento con `new`

En Java tradicional, para usar un objeto hacías esto:
```java
// ❌ Enfoque tradicional acoplado
Grupo grupo = new Grupo();
```
¿Cuál es el problema? Que **tu código asume el control total**: decide cuándo se crea, cómo se instancia y de qué clase concreta depende. Si mañana la clase cambia de paquete, añade dependencias en el constructor o necesita configuración previa, tienes que modificar todas las clases donde hiciste `new`.

### 2. La Solución: Inversión de Control (IoC) y el Principio Hollywood

> **🎬 Principio Hollywood:**  
> *«Don't call us, we'll call you»* (No nos llames tú, ya te llamaremos nosotros).

Con **IoC**, tú le entregas las llaves de tu aplicación a un intermediario: el **Contenedor de Spring** (`ApplicationContext`).
- **Antes (sin IoC):** Tú creas los objetos y gestionas su ciclo de vida.
- **Ahora (con IoC):** Spring crea los objetos, los almacena en su memoria interna (en un registro llamado *Bean Factory*) y tú solo se los pides cuando los necesitas (`context.getBean(...)`).

```text
┌──────────────────────────────────────────────────────────────────┐
│                   SPRING APPLICATION CONTEXT                     │
│                                                                  │
│   Lee: applicationContext.xml                                    │
│   Crea: new Grupo()                                              │
│   Registra: bean id="grupoBean" [Instancia viva en memoria]      │
└──────────────────────────────────────────────────────────────────┘
                                ▲
                                │ context.getBean("grupoBean")
┌───────────────────────────────┴──────────────────────────────────┐
│                       TU CLASE (Main.java)                       │
│   Recibe el bean ya instanciado y le asigna sus propiedades      │
└──────────────────────────────────────────────────────────────────┘
```

### 3. ¿Qué es exactamente un "Bean"?

Un **Bean** en Spring no es más que un objeto Java ordinario (POJO) que cumple tres condiciones:
1. Ha sido instanciado por el contenedor de Spring.
2. Está registrado dentro del contenedor bajo un identificador (`id="grupoBean"`).
3. Su ciclo de vida (creación, inicialización, inyección y destrucción) está gobernado por Spring.

Por defecto, los beans en Spring son **Singleton**: una única instancia para toda la aplicación que se reutiliza cada vez que alguien pide ese bean.

### 4. ¿Hacia dónde vamos en el Entregable 2?

En este Entregable 1 hemos hecho **IoC básico**: Spring crea el objeto `Grupo`, pero tú has tenido que hacer los `setNombre(...)` a mano en Java.

En el **Entregable 2 (`JavaSpringIoD`)**, daremos el salto a la **Inyección de Dependencias (DI)**:
- No solo dejaremos que Spring cree el grupo, sino que Spring **le inyectará automáticamente** sus propiedades leyendo un archivo externo `.properties`.
- Además, inyectaremos una lista de objetos (`List<Componente>`) dentro del `Grupo` directamente desde el XML, demostrando cómo Spring conecta objetos complejos entre sí sin que tengas que programar ni una sola línea de conexión manual.

---

## 🚀 Cómo Subir este Entregable (Git y L2E)

### 1. Subir al repositorio Git (Rama `SPRING-BOOT`)
Para subir únicamente la carpeta requerida con la nomenclatura oficial de Accenture:
```bash
git checkout SPRING-BOOT
git add "Spring Boot - Uso de IoC - Blanca Perez"
git commit -m "feat(act1): entrega uso IoC Spring con XML"
git push origin SPRING-BOOT
```

### 2. Subir a la Plataforma L2E (Archivo ZIP)
El archivo ZIP ya está listo en:
👉 `entregables/acc/entregable-01-ioc/Spring Boot - Uso de IoC - Blanca Perez.zip`
Solo tienes que arrastrarlo a la tarea:
🔗 [Tarea L2E ID 8537](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8537)

---

> [!TIP]
> **Conclusión del Tutor:**  
> Has completado con éxito la base sobre la que se sustenta todo el universo de Spring y Spring Boot. Cuando veas en el futuro una anotación `@Service` o `@Autowired`, recuerda este `applicationContext.xml`: en el fondo, Spring sigue haciendo exactamente lo mismo que acabas de dominar aquí. ¡Enhorabuena! 🎉
