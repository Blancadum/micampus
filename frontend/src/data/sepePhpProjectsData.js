/**
 * sepePhpProjectsData.js
 * Metadatos y código fuente de los 4 proyectos prácticos del aula
 * del Certificado de Profesionalidad SEPE MF0492_3 (Servidor Web):
 * 1. Agenda de Contactos (UF1844)
 * 2. Mascota Virtual Tamagotchi POO (UF1844)
 * 3. Aplicación Web Biblioteca Municipal (UF1845)
 * 4. API REST Biblioteca & Rutas Amigables .htaccess (UF1846)
 */

export const SEPE_PHP_PROJECTS = [
  {
    id: 'agenda',
    slug: 'proyecto-1-agenda',
    num: '01',
    uf: 'UF1844',
    title: 'Agenda de Contactos',
    subtitle: 'CRUD en Sesión, Sanitización XSS y Funciones Modulares',
    icon: '📒',
    color: '#3b82f6',
    hours: '15h lectivas',
    level: 'Iniciación a Intermedio',
    summary: 'Primera aplicación web interactiva desarrollada en clase: gestión completa de contactos en memoria mediante la superglobal $_SESSION, sanitización contra Cross-Site Scripting (XSS), búsqueda con stripos(), edición con precarga y control de acceso.',
    tags: ['PHP 8', '$_SESSION', 'XSS htmlspecialchars', 'CRUD', 'Modularidad'],
    objectives: [
      'Gestionar el ciclo de vida de sesiones con session_start() y session_destroy().',
      'Implementar un CRUD completo (Crear, Leer, Editar, Borrar) sobre arrays asociativos multidimensionales.',
      'Sanitizar de forma transversal todas las salidas HTML con htmlspecialchars(..., ENT_QUOTES, "UTF-8").',
      'Controlar el acceso a páginas privadas mediante la función guardián comprobarUsuario().',
      'Realizar borrado seguro con unset() y reconstrucción de índices continuos con array_values().'
    ],
    architecture: {
      pattern: 'Arquitectura Modular Basada en Scripts (Procedural Seguro)',
      storage: 'Array superglobal en memoria de sesión ($_SESSION["nombre"], $_SESSION["telefono"], $_SESSION["email"])',
      entryPoint: 'agenda.html / contactos.php'
    },
    files: [
      {
        name: 'funciones.php',
        path: 'public/fuentes/sepe/sepe-php/MF0492_3-ProgramacionWebEntornoServidor/Viernes_110926/funciones.php',
        desc: 'Librería central de funciones: verificación de sesión, búsqueda y renderizado.',
        code: `<?php
/* ==========================================================
 * SEGURIDAD & SESIÓN
 * ========================================================== */
// Comprueba si ya hay un usuario autenticado en la sesión.
// Si no existe, redirige inmediatamente a 'agenda.html'.
function comprobarUsuario()
{
    if ( !isset($_SESSION["usuario"]) )
    {
        header("Location: agenda.html");
        exit; // Imprescindible para detener la ejecución
    }
}

/* ==========================================================
 * ENTRADA / SALIDA DE DATOS
 * ========================================================== */
// Busca un contacto por coincidencia exacta o parcial.
// Retorna el índice numérico si se encuentra; -1 si no existe.
function buscarContacto($nombre)
{
    $posicion = -1; // Partimos suponiendo que NO lo hemos encontrado

    for ($i = 0; $i < count($_SESSION["nombre"]); $i++) {
        if ($_SESSION["nombre"][$i] === $nombre) 
        {
            $posicion = $i;
            break;
        }
    }
    return $posicion;
}

// Renderiza los datos de un contacto aplicando htmlspecialchars() contra XSS
function mostrarContacto($nombre, $telefono, $email)
{
    echo "<h2>Contacto encontrado</h2>";
    echo "<p>Nombre: " . htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8') . "</p>";
    echo "<p>Teléfono: " . htmlspecialchars($telefono, ENT_QUOTES, 'UTF-8') . "</p>";
    echo "<p>Email: " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "</p>";
}
?>`
      },
      {
        name: 'contactos.php',
        path: 'public/fuentes/sepe/sepe-php/MF0492_3-ProgramacionWebEntornoServidor/Viernes_110926/contactos.php',
        desc: 'Vista principal: muestra la tabla de contactos y barra de acciones.',
        code: `<?php
session_start();
require_once "funciones.php";
comprobarUsuario();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="./css/estilosAgenda.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <title>Agenda de contactos</title>
</head>
<body>
    <header>
        <h1><i class="fa-solid fa-address-book"></i> Agenda</h1>
        <p>Hola, <?php echo htmlspecialchars($_SESSION["usuario"]); ?> · 
           <a href="logout.php" title="Cerrar sesión"><i class="fa-solid fa-right-from-bracket"></i></a>
        </p>
    </header>

    <nav>
        <a href="agregar.php"><i class="fa-solid fa-plus"></i> Agregar</a>
        <a href="buscar.php"><i class="fa-solid fa-magnifying-glass"></i> Buscar</a>
        <a href="actualizar.php"><i class="fa-solid fa-pencil"></i> Actualizar</a>
        <a href="eliminar.php"><i class="fa-solid fa-trash"></i> Eliminar</a>
    </nav>

    <main>
        <section>
            <h2>Mis contactos</h2>
            <p>Total: <?php echo count($_SESSION["nombre"]); ?> contactos</p>
            <?php for ($i = 0; $i < count($_SESSION["nombre"]); $i++): ?>
                <article class="tarjeta-contacto">
                    <h3><?php echo htmlspecialchars($_SESSION["nombre"][$i]); ?></h3>
                    <p><i class="fa-solid fa-phone"></i> <?php echo htmlspecialchars($_SESSION["telefono"][$i]); ?></p>
                    <p><i class="fa-solid fa-envelope"></i> <?php echo htmlspecialchars($_SESSION["email"][$i]); ?></p>
                </article>
            <?php endfor; ?>
        </section>
    </main>
</body>
</html>`
      },
      {
        name: 'agregar.php',
        path: 'public/fuentes/sepe/sepe-php/MF0492_3-ProgramacionWebEntornoServidor/Viernes_110926/agregar.php',
        desc: 'Formulario de alta con validación de campos obligatorios.',
        code: `<?php
session_start();
require_once "funciones.php";
comprobarUsuario();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="./css/estilosAgenda.css">
    <title>Agregar contacto</title>
</head>
<body>
    <header><h1>Nuevo Contacto</h1></header>
    <main>
        <form action="procesar_datosContacto.php" method="POST">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>

            <label for="telefono">Teléfono:</label>
            <input type="tel" id="telefono" name="telefono" required>

            <label for="email">Correo electrónico:</label>
            <input type="email" id="email" name="email" required>

            <button type="submit">Guardar Contacto</button>
            <a href="contactos.php">Volver</a>
        </form>
    </main>
</body>
</html>`
      }
    ]
  },
  {
    id: 'tamagotchi',
    slug: 'proyecto-2-tamagotchi',
    num: '02',
    uf: 'UF1844',
    title: 'Mascota Virtual (Tamagotchi)',
    subtitle: 'Programación Orientada a Objetos, Encapsulamiento y Persistencia',
    icon: '👾',
    color: '#8b5cf6',
    hours: '15h lectivas',
    level: 'Intermedio',
    summary: 'Segundo proyecto del curso donde se transiciona de la programación procedural al paradigma orientado a objetos (POO). Se diseña la clase Tamagotchi con atributos de estado privados, constructor y métodos interactivos que persisten la instancia completa en $_SESSION.',
    tags: ['PHP POO', 'Clases & Objetos', 'Encapsulamiento', 'Getters/Setters', 'Persistencia Objeto'],
    objectives: [
      'Definir clases con modificadores de acceso private para proteger el estado interno.',
      'Implementar el constructor __construct() inicializando estadísticas saludables por defecto.',
      'Codificar getters y setters con sanitización y validación estricta de tipos.',
      'Diseñar métodos de negocio: alimentar(), jugar(), dormir(), medicar() con límites 0-100.',
      'Persistir instancias de objetos completos en $_SESSION["mascota"] entre peticiones HTTP.'
    ],
    architecture: {
      pattern: 'Modelo - Controlador Ligero (MVC Simplificado)',
      storage: 'Serialización nativa de objetos PHP en $_SESSION',
      entryPoint: 'index.html -> menu.php'
    },
    files: [
      {
        name: 'Tamagotchi.php',
        path: 'public/fuentes/sepe/sepe-php/MF0492_3-ProgramacionWebEntornoServidor/Jueves_170926/Tamagotchi.php',
        desc: 'Clase central con atributos privados y métodos de comportamiento.',
        code: `<?php
/**
 * Clase Tamagotchi
 * Representa el estado y comportamiento de la mascota virtual.
 */
class Tamagotchi
{
    // Atributos de estado encapsulados
    private $nombre;
    private $hambre;
    private $felicidad;
    private $energia;
    private $salud;

    // Constructor: Inicializa las métricas iniciales de la mascota
    public function __construct()
    {
        $this->hambre = 80;
        $this->felicidad = 20;
        $this->energia = 30;
        $this->salud = 50;
    }

    // Setters con validación de cadenas
    public function setNombre($nombre)
    {
        $nombre = trim($nombre);
        if ($nombre === "" || is_null($nombre)) {
            return false;
        }
        $this->nombre = $nombre;
        return true;
    }

    // Getters
    public function getNombre()    { return $this->nombre; }
    public function getHambre()    { return $this->hambre; }
    public function getFelicidad() { return $this->felicidad; }
    public function getEnergia()   { return $this->energia; }
    public function getSalud()     { return $this->salud; }

    // Métodos de comportamiento
    public function alimentar()
    {
        $this->hambre = max(0, $this->hambre - 25);
        $this->energia = min(100, $this->energia + 10);
    }

    public function jugar()
    {
        $this->felicidad = min(100, $this->felicidad + 30);
        $this->energia = max(0, $this->energia - 20);
        $this->hambre = min(100, $this->hambre + 15);
    }

    public function dormir()
    {
        $this->energia = 100;
        $this->hambre = min(100, $this->hambre + 20);
    }

    public function curar()
    {
        $this->salud = 100;
        $this->felicidad = max(0, $this->felicidad - 10);
    }

    public function estaVivo()
    {
        return ($this->hambre < 100 && $this->salud > 0 && $this->energia > 0);
    }
}
?>`
      },
      {
        name: 'procesar.php',
        path: 'public/fuentes/sepe/sepe-php/MF0492_3-ProgramacionWebEntornoServidor/Jueves_170926/procesar.php',
        desc: 'Controlador de peticiones: recupera el objeto de sesión, ejecuta la acción y vuelve a guardarlo.',
        code: `<?php
session_start();
require_once "Tamagotchi.php";

if (!isset($_SESSION["mascota"])) {
    header("Location: index.html");
    exit;
}

// 1. Recuperamos la instancia del objeto guardado en sesión
$mascota = $_SESSION["mascota"];

// 2. Comprobamos la acción enviada desde el formulario
$accion = $_POST["accion"] ?? "";

switch ($accion) {
    case "alimentar":
        $mascota->alimentar();
        break;
    case "jugar":
        $mascota->jugar();
        break;
    case "dormir":
        $mascota->dormir();
        break;
    case "curar":
        $mascota->curar();
        break;
}

// 3. Volvemos a guardar el objeto con su estado actualizado
$_SESSION["mascota"] = $mascota;

// 4. Redirigimos a la vista interactiva
header("Location: menu.php");
exit;
?>`
      }
    ]
  },
  {
    id: 'biblioteca',
    slug: 'proyecto-3-biblioteca',
    num: '03',
    uf: 'UF1845',
    title: 'Biblioteca Municipal',
    subtitle: 'Full-Stack PHP, PDO, MySQL, Transacciones ACID, Triggers y Paginación',
    icon: '📚',
    color: '#10b981',
    hours: '25h lectivas',
    level: 'Avanzado',
    summary: 'El proyecto central del certificado formativo: un sistema de gestión bibliotecaria completo con persistencia en MySQL mediante PDO. Incorpora transacciones ACID para operaciones críticas de préstamo, disparadores de control de stock, paginación con LIMIT/OFFSET/ceil() y baja lógica.',
    tags: ['MySQL', 'PDO', 'Transacciones ACID', 'Triggers', 'Paginación LIMIT', 'Baja Lógica'],
    objectives: [
      'Conectar PHP a MySQL mediante PDO usando DSN utf8mb4 y modo de excepciones obligatorio.',
      'Blindar la aplicación contra inyección SQL con prepare() y marcadores :id.',
      'Implementar transacciones atómicas con beginTransaction(), commit() y rollBack().',
      'Crear triggers en MySQL para reducir automáticamente el stock de ejemplares al prestar.',
      'Construir un paginador dinámico con cláusulas LIMIT, OFFSET y cálculo de páginas con ceil().',
      'Gestionar la baja lógica (cambio de estado a "Inactivo") conservando la integridad histórica.'
    ],
    architecture: {
      pattern: 'Arquitectura en 3 Capas (Presentación PHP/HTML + Lógica de Negocio + Persistencia PDO/MySQL)',
      database: 'biblioteca (tablas socio, autor, libro, clasificacion, prestamo)',
      entryPoint: 'socios.php / libros.php / prestamos.php'
    },
    files: [
      {
        name: 'conexion.php',
        path: 'public/fuentes/sepe/sepe-php/MF0492_3-ProgramacionWebEntornoServidor/Miercoles_141026/conexion.php',
        desc: 'Capa de abstracción PDO con manejo de errores y codificación segura.',
        code: `<?php
$servidor = "localhost";
$usuario  = "root";
$clave    = "";
$bd       = "biblioteca";

try {
    $dsn = "mysql:host=$servidor;dbname=$bd;charset=utf8mb4";
    $opciones = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false
    ];

    $conexion = new PDO($dsn, $usuario, $clave, $opciones);
} catch (PDOException $e) {
    die("Fallo crítico en conexión a Base de Datos: " . $e->getMessage());
}
?>`
      },
      {
        name: 'autores.php (Paginación)',
        path: 'public/fuentes/sepe/sepe-php/Jueves_221026/autores.php',
        desc: 'Paginación profesional determinista con LIMIT, OFFSET, ceil() y ordenación estable.',
        code: `<?php
require_once "conexion.php";
include "header.php";

// 1. Configuración de paginación
$por_pagina = 5;
$pagina = isset($_GET['pag']) ? (int)$_GET['pag'] : 1;
if ($pagina < 1) $pagina = 1;

// Fórmula del desplazamiento oficial del aula
$offset = ($pagina - 1) * $por_pagina;

// 2. Conteo total de registros para calcular número de páginas
$sql_total = "SELECT COUNT(*) FROM autor";
$total_autores = $conexion->query($sql_total)->fetchColumn();

// Redondeo por exceso para obtener el total de páginas
$total_paginas = ceil($total_autores / $por_pagina);

// 3. Consulta paginada con ORDER BY estable
$sql = "SELECT * FROM autor ORDER BY apellido, nombre, id_autor LIMIT :limit OFFSET :offset";
$stmt = $conexion->prepare($sql);
$stmt->bindValue(':limit', (int)$por_pagina, PDO::PARAM_INT);
$stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
$stmt->execute();
$autores = $stmt->fetchAll();
?>

<main class="contenedor">
    <h2>Catálogo de Autores (Página <?= $pagina ?> de <?= $total_paginas ?>)</h2>
    <table class="tabla-biblioteca">
        <thead>
            <tr><th>ID</th><th>Nombre</th><th>Apellidos</th></tr>
        </thead>
        <tbody>
            <?php foreach ($autores as $a): ?>
                <tr>
                    <td><?= $a['id_autor'] ?></td>
                    <td><?= htmlspecialchars($a['nombre']) ?></td>
                    <td><?= htmlspecialchars($a['apellido']) ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <!-- Botones de Paginación -->
    <div class="paginador">
        <?php for ($p = 1; $p <= $total_paginas; $p++): ?>
            <a href="autores.php?pag=<?= $p ?>" class="<?= $p === $pagina ? 'activo' : '' ?>">
                <?= $p ?>
            </a>
        <?php endfor; ?>
    </div>
</main>
<?php include "footer.php"; ?>`
      },
      {
        name: 'nuevo_prestamo.php (Transacción ACID)',
        path: 'public/fuentes/sepe/sepe-php/Jueves_221026/nuevo_prestamo.php',
        desc: 'Registro atómico de préstamo y actualización de ejemplares con beginTransaction().',
        code: `<?php
require_once "conexion.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id_socio = (int)$_POST["id_socio"];
    $id_libro = (int)$_POST["id_libro"];

    try {
        // INICIO DE LA TRANSACCIÓN ACID
        $conexion->beginTransaction();

        // 1. Insertamos el préstamo
        $sql1 = "INSERT INTO prestamo (id_socio, id_libro, fecha_prestamo, estado) 
                 VALUES (:socio, :libro, NOW(), 'Activo')";
        $stmt1 = $conexion->prepare($sql1);
        $stmt1->execute(['socio' => $id_socio, 'libro' => $id_libro]);

        // 2. Decrementamos el stock del libro
        $sql2 = "UPDATE libro SET ejemplares = ejemplares - 1 WHERE id_libro = :libro";
        $stmt2 = $conexion->prepare($sql2);
        $stmt2->execute(['libro' => $id_libro]);

        // CONFIRMACIÓN DE AMBAS OPERACIONES
        $conexion->commit();
        $mensaje = "Préstamo registrado correctamente con transacción confirmada.";
    } catch (Exception $e) {
        // SI OCURRE CUALQUIER ERROR, DESHACEMOS LOS CAMBIOS
        $conexion->rollBack();
        $error = "Error al tramitar préstamo. Operación revertida: " . $e->getMessage();
    }
}
?>`
      },
      {
        name: 'triggers_biblioteca.sql',
        path: 'public/fuentes/sepe/sepe-php/MF0492_3-ProgramacionWebEntornoServidor/Martes_131026/transaccionesTriggers_131026.docx',
        desc: 'Disparador MySQL para control automático de disponibilidad de stock.',
        code: `-- Trigger en MySQL para reducir stock al insertar préstamo
DELIMITER //
CREATE TRIGGER tr_actualizar_stock_prestamo
AFTER INSERT ON prestamo
FOR EACH ROW
BEGIN
    UPDATE libro 
    SET ejemplares = ejemplares - 1 
    WHERE id_libro = NEW.id_libro;
END //
DELIMITER ;`
      }
    ]
  },
  {
    id: 'apiRest',
    slug: 'proyecto-4-api-rest',
    num: '04',
    uf: 'UF1846',
    title: 'API REST & Rutas Amigables (.htaccess)',
    subtitle: 'Arquitectura de Servicios Web Distribuidos, JSON y URL Rewriting',
    icon: '🔌',
    color: '#eab308',
    hours: '20h lectivas',
    level: 'Avanzado',
    summary: 'La culminación técnica del curso en la UF1846 (visto entre el 27 y 30 de octubre): transformación de la aplicación Biblioteca en una API RESTful distribuida con soporte de los 5 verbos HTTP (GET, POST, PUT, PATCH, DELETE), lectura del cuerpo con php://input y rutas amigables transparentes mediante mod_rewrite de Apache.',
    tags: ['API REST', 'HTTP Verbs', 'php://input', 'json_decode', 'Apache .htaccess', 'mod_rewrite'],
    objectives: [
      'Diferenciar entre aplicación distribuida, servicio web y API REST.',
      'Mapear de forma limpia operaciones CRUD a verbos HTTP (GET, POST, PUT, PATCH, DELETE).',
      'Configurar cabeceras obligatorias: header("Content-Type: application/json; charset=utf-8").',
      'Leer flujos raw del cuerpo de peticiones con file_get_contents("php://input") y json_decode().',
      'Emitir códigos de estado HTTP precisos (200, 201, 400, 404, 405, 500) con http_response_code().',
      'Configurar Apache mod_rewrite en .htaccess para reescribir /api/socios/16 hacia socios.php?id=16.'
    ],
    architecture: {
      pattern: 'Arquitectura Orientada a Servicios RESTful Desacoplada (Stateless)',
      transport: 'HTTP / JSON con cabeceras Content-Type estándar',
      entryPoint: '/api/socios.php y /api/socios/:id'
    },
    files: [
      {
        name: '.htaccess',
        path: 'public/fuentes/sepe/sepe-php/Viernes_301026/.htaccess',
        desc: 'Configuración Apache para Rutas Amigables (Clean URLs).',
        code: `# Desactivar la negociación automática de contenido de Apache
Options -MultiViews

# Activar el motor de reescritura de URLs
RewriteEngine On

# Regla 1: Captura de un socio por ID numérico en la URL (ej: /api/socios/16 -> socios.php?id=16)
RewriteRule ^socios/([0-9]+)/?$ socios.php?id=$1 [L,QSA]

# Regla 2: Petición a la colección general (ej: /api/socios -> socios.php)
RewriteRule ^socios/?$ socios.php [L,QSA]`
      },
      {
        name: 'socios.php (API REST Completa)',
        path: 'public/fuentes/sepe/sepe-php/Viernes_301026/socios.php',
        desc: 'Controlador REST con soporte de los 5 verbos HTTP (GET, POST, PUT, PATCH, DELETE).',
        code: `<?php
// 1. Cabecera obligatoria de respuesta JSON
header('Content-Type: application/json; charset=utf-8');

// 2. Conexión a la base de datos Biblioteca
require_once '../conexion.php';

// 3. Inspeccionar el verbo HTTP solicitado
$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'GET') {
    $id = $_GET['id'] ?? null;
    if ($id && filter_var($id, FILTER_VALIDATE_INT)) {
        $stmt = $conexion->prepare("SELECT * FROM socio WHERE id_socio = :id");
        $stmt->execute(['id' => $id]);
        $socio = $stmt->fetch();
        if ($socio) {
            echo json_encode($socio, JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Socio no encontrado"]);
        }
    } else {
        $socios = $conexion->query("SELECT * FROM socio")->fetchAll();
        echo json_encode($socios, JSON_UNESCAPED_UNICODE);
    }
}
elseif ($metodo === 'POST') {
    // Lectura del cuerpo HTTP (Body)
    $json = file_get_contents('php://input');
    $datos = json_decode($json, true);

    if (empty($datos['nombre']) || empty($datos['apellido1']) || empty($datos['dni'])) {
        http_response_code(400);
        echo json_encode(["error" => "Faltan campos obligatorios del socio"]);
        exit;
    }

    $sql = "INSERT INTO socio (nombre, apellido1, dni, fecha_alta, estado) 
            VALUES (:nom, :ape, :dni, NOW(), 'Activo')";
    $stmt = $conexion->prepare($sql);
    $stmt->execute([
        'nom' => trim($datos['nombre']),
        'ape' => trim($datos['apellido1']),
        'dni' => trim($datos['dni'])
    ]);

    http_response_code(201);
    echo json_encode([
        "mensaje" => "Socio creado exitosamente",
        "id_socio" => $conexion->lastInsertId()
    ], JSON_UNESCAPED_UNICODE);
}
elseif ($metodo === 'PUT') {
    $id = $_GET['id'] ?? null;
    $datos = json_decode(file_get_contents('php://input'), true);

    if (!$id || empty($datos['nombre']) || empty($datos['apellido1'])) {
        http_response_code(400);
        echo json_encode(["error" => "Datos incompletos o identificador no válido"]);
        exit;
    }

    $sql = "UPDATE socio SET nombre = :nom, apellido1 = :ape WHERE id_socio = :id";
    $stmt = $conexion->prepare($sql);
    $stmt->execute(['nom' => $datos['nombre'], 'ape' => $datos['apellido1'], 'id' => $id]);

    http_response_code(200);
    echo json_encode(["mensaje" => "Socio actualizado correctamente"], JSON_UNESCAPED_UNICODE);
}
elseif ($metodo === 'PATCH') {
    $id = $_GET['id'] ?? null;
    $datos = json_decode(file_get_contents('php://input'), true);

    if (!$id || empty($datos['estado'])) {
        http_response_code(400);
        echo json_encode(["error" => "Se requiere campo 'estado'"]);
        exit;
    }

    $sql = "UPDATE socio SET estado = :estado WHERE id_socio = :id";
    $stmt = $conexion->prepare($sql);
    $stmt->execute(['estado' => $datos['estado'], 'id' => $id]);

    echo json_encode(["mensaje" => "Estado actualizado a " . $datos['estado']], JSON_UNESCAPED_UNICODE);
}
elseif ($metodo === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(["error" => "ID no proporcionado"]);
        exit;
    }

    $stmt = $conexion->prepare("DELETE FROM socio WHERE id_socio = :id");
    $stmt->execute(['id' => $id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["mensaje" => "Socio eliminado correctamente"]);
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Socio no encontrado"]);
    }
}
else {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
}
?>`
      }
    ]
  }
];

