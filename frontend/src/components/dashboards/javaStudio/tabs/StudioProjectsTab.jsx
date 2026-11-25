import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PROYECTOS } from '../../../../data/javaStudio/studioData.js';
import StudioCodeBlock from '../StudioCodeBlock.jsx';
import StudioDiagramModal from '../StudioDiagramModal.jsx';
import {
  IconLayers,
  IconRepeat,
  IconHexagon,
  IconAlertTriangle,
  IconArrowLeft,
  IconArrowRight
} from '../StudioIcons.jsx';

const CAPAS_INFOGRAFIAS = [
  {
    titulo: 'Arquitectura Tradicional en 3 Capas',
    subtitulo: 'Controller (Presentation) ➔ Service (Business) ➔ Repository (Data) con Spring Boot.',
    src: '/springboot/media/infografias/arquitectura-3-capas/Arquitectura_tradicional_en_3_capas.png',
    etiqueta: '3 Capas'
  },
  {
    titulo: 'Acoplamiento vs Cohesión en 3 Capas',
    subtitulo: 'Beneficios arquitectónicos: aislamiento de cambios, testabilidad con Mockito y modularidad.',
    src: '/springboot/media/infografias/arquitectura-3-capas/acoplamiento-3-capas-beneficios.png',
    etiqueta: 'Beneficios'
  },
  {
    titulo: 'Matriz de Dependencias entre Capas',
    subtitulo: 'Reglas estrictas de visibilidad: quién puede comunicarse con quién y flujos prohibidos.',
    src: '/springboot/media/infografias/arquitectura-3-capas/tabla-rdependencias.png',
    etiqueta: 'Dependencias'
  }
];

const HEXAGONAL_INFOGRAFIAS = [
  {
    titulo: 'Puertos y Adaptadores (Arquitectura Hexagonal)',
    subtitulo: 'El dominio aislado en el centro, puertos primarios/secundarios y adaptadores externos.',
    src: '/springboot/media/infografias/arquitectura-hexagonal/Arquitectura_Hexagonal__Puertos_y_Adaptadores_capas.png',
    etiqueta: 'Puertos & Adaptadores'
  },
  {
    titulo: 'Inversión de Control en Arquitectura Hexagonal',
    subtitulo: 'Cómo las interfaces de puerto invierten las dependencias para aislar la infraestructura.',
    src: '/springboot/media/infografias/arquitectura-hexagonal/Arquitectura_hexagonal__ioc.png',
    etiqueta: 'IoC Hexagonal'
  }
];

const TASKMANAGER_HTTP_REQUESTS = [
  {
    metodo: 'POST',
    url: '/api/v1/tasks',
    color: '#10b981',
    nombre: 'Crear Nueva Tarea',
    desc: 'Envía un payload JSON con los datos de la nueva tarea. Spring aplica Bean Validation (@Valid) antes de ejecutar el servicio.',
    idempotente: 'No (enviar la misma petición dos veces crearía dos tareas distintas o provocaría un 409 Conflict si el título se repite).',
    seguro: 'No seguro (modifica el estado del servidor creando un nuevo registro en base de datos).',
    params: '@Valid @RequestBody TaskRequestDTO (cuerpo JSON)',
    statusEsperado: '201 Created (con cabecera Location) / 400 Bad Request / 409 Conflict',
    reglaArquitectura: 'El Controller nunca debe recibir entidades JPA, sino DTOs inmutables (Java Records). La validación (@Valid) se ejecuta en la frontera web antes de que el Service o el Repository sean invocados.',
    explicacionDetallada: 'El cliente envía un verbo POST con el cuerpo JSON y el token JWT en la cabecera Authorization. El servidor comprueba la firma del token en JwtAuthFilter, procesa las restricciones de Bean Validation (@NotBlank, @Size, @FutureOrPresent) y, si son válidas, TaskServiceImpl abre una transacción ACID, valida que no haya títulos duplicados, persiste la entidad y devuelve un HTTP 201 Created con la cabecera Location apuntando al nuevo recurso.',
    codigo: `POST /api/v1/tasks HTTP/1.1\nHost: api.taskmanager.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...\nContent-Type: application/json\n\n{\n  "title": "Estudiar Mockito",\n  "description": "Repasar @Mock, @InjectMocks y verify()",\n  "dueDate": "2026-11-20"\n}`
  },
  {
    metodo: 'GET',
    url: '/api/v1/tasks',
    color: '#0284c7',
    nombre: 'Listar Todas las Tareas',
    desc: 'Recupera la colección completa de tareas del usuario. Admite opcionalmente query params (?completed=true/false) para filtrado.',
    idempotente: 'Sí (ejecutarla N veces seguidas produce el mismo resultado y no altera los datos).',
    seguro: 'Seguro (operación de solo lectura pura, sin efectos colaterales en la base de datos).',
    params: 'Query params opcionales (?completed=boolean)',
    statusEsperado: '200 OK (Array JSON)',
    reglaArquitectura: 'El método del servicio debe anotarse con @Transactional(readOnly = true) para desactivar el dirty checking de Hibernate, reduciendo drásticamente el consumo de CPU y memoria JVM.',
    explicacionDetallada: 'Permite recuperar la lista completa de tareas. Mediante query params opcionales (ej: ?completed=true) podemos filtrar sin necesidad de crear endpoints separados. En sistemas de producción con miles de registros, se debe complementar con Pageable para evitar desbordamientos de memoria (OutOfMemoryError).',
    codigo: `GET /api/v1/tasks HTTP/1.1\nHost: api.taskmanager.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...\nAccept: application/json`
  },
  {
    metodo: 'GET',
    url: '/api/v1/tasks/{id}',
    color: '#0284c7',
    nombre: 'Obtener Tarea por ID',
    desc: 'Consulta el detalle de una tarea específica mediante su identificador numérico en la URL (@PathVariable).',
    idempotente: 'Sí (consultar el mismo recurso por ID no muta su estado).',
    seguro: 'Seguro (solo lectura).',
    params: '@PathVariable Long id (ej: /api/v1/tasks/42)',
    statusEsperado: '200 OK / 404 Not Found',
    reglaArquitectura: 'Si el identificador no existe en la base de datos, el repositorio devuelve Optional.empty(). El servicio NUNCA debe devolver null, sino lanzar una TaskNotFoundException que el @RestControllerAdvice captura para responder con HTTP 404 Not Found.',
    explicacionDetallada: 'Usa @PathVariable para extraer el identificador numérico de la URL. Si la tarea existe, TaskMapper transforma la entidad a TaskResponseDTO protegiendo datos de auditoría internos y retorna HTTP 200 OK.',
    codigo: `GET /api/v1/tasks/42 HTTP/1.1\nHost: api.taskmanager.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...\nAccept: application/json`
  },
  {
    metodo: 'PUT',
    url: '/api/v1/tasks/{id}',
    color: '#f59e0b',
    nombre: 'Actualizar Tarea Completa',
    desc: 'Reemplaza y actualiza todos los datos de una tarea existente identificada por su ID.',
    idempotente: 'Sí (reemplazar una tarea con los mismos datos N veces deja el registro en el mismo estado final).',
    seguro: 'No seguro (modifica el estado del recurso existente).',
    params: '@PathVariable Long id + @Valid @RequestBody TaskRequestDTO',
    statusEsperado: '200 OK / 404 Not Found / 400 Bad Request',
    reglaArquitectura: 'Semánticamente en REST, PUT representa el reemplazo completo del recurso. Todos los campos obligatorios deben enviarse en el payload. Para modificaciones parciales se debe utilizar PATCH.',
    explicacionDetallada: 'Combina @PathVariable Long id con @Valid @RequestBody TaskRequestDTO. El servicio busca la tarea existente, valida que el nuevo título no colisione con otra tarea diferente, aplica los cambios y guarda la entidad actualizada devolviendo HTTP 200 OK con el DTO resultante.',
    codigo: `PUT /api/v1/tasks/42 HTTP/1.1\nHost: api.taskmanager.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...\nContent-Type: application/json\n\n{\n  "title": "Estudiar Mockito Avanzado",\n  "description": "Dominar @ExtendWith(MockitoExtension.class) y verify(times(1))",\n  "dueDate": "2026-11-25"\n}`
  },
  {
    metodo: 'PATCH',
    url: '/api/v1/tasks/{id}/complete',
    color: '#8b5cf6',
    nombre: 'Marcar Tarea como Completada',
    desc: 'Modificación atómica y parcial de estado para marcar la tarea como finalizada sin reenviar todo el cuerpo.',
    idempotente: 'Sí (marcar una tarea como completada múltiples veces no cambia su estado final completed = true).',
    seguro: 'No seguro (modifica el atributo completed en la base de datos).',
    params: '@PathVariable Long id',
    statusEsperado: '200 OK / 404 Not Found',
    reglaArquitectura: 'Aplica el principio de granularidad REST: permite ejecutar transiciones de estado de negocio sin forzar al cliente a reenviar todo el cuerpo JSON de la tarea.',
    explicacionDetallada: 'Ideal para interfaces de usuario donde el usuario pulsa un checkbox para completar la tarea. No requiere cuerpo JSON (Content-Length: 0); la semántica está explícitamente definida en la URI y el controlador.',
    codigo: `PATCH /api/v1/tasks/42/complete HTTP/1.1\nHost: api.taskmanager.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...\nContent-Length: 0`
  },
  {
    metodo: 'DELETE',
    url: '/api/v1/tasks/{id}',
    color: '#ef4444',
    nombre: 'Eliminar Tarea por ID',
    desc: 'Elimina permanentemente una tarea de la base de datos por su clave primaria.',
    idempotente: 'Sí (borrar un recurso una vez lo elimina; volver a intentar borrarlo no altera el estado del sistema).',
    seguro: 'No seguro (elimina permanentemente un registro de la base de datos).',
    params: '@PathVariable Long id',
    statusEsperado: '204 No Content (cuerpo vacío) / 404 Not Found',
    reglaArquitectura: 'Al borrar exitosamente, el controlador debe retornar HTTP 204 No Content sin cuerpo en la respuesta, ahorrando ancho de banda y cumpliendo estrictamente con el estándar REST.',
    explicacionDetallada: 'El Controller invoca taskService.deleteTask(id). El servicio verifica primero si el recurso existe mediante taskRepository.existsById(id). Si no existe lanza TaskNotFoundException (404); si existe ejecuta deleteById(id) y retorna ResponseEntity.noContent().build().',
    codigo: `DELETE /api/v1/tasks/42 HTTP/1.1\nHost: api.taskmanager.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...`
  }
];

const LIBRARY_HTTP_REQUESTS = [
  {
    metodo: 'POST',
    url: '/api/loans',
    color: '#10b981',
    nombre: 'Registrar Nuevo Préstamo',
    desc: 'Registra un préstamo validando existencia de libro y stock > 0, decrementando stock de forma transaccional.',
    idempotente: 'No (cada envío crea un nuevo préstamo y decrementa el stock disponible).',
    seguro: 'No seguro (modifica el stock y crea un registro de préstamo).',
    params: '@Valid @RequestBody LoanRequestDTO (cuerpo JSON)',
    statusEsperado: '201 Created / 400 Bad Request / 409 Out of Stock',
    reglaArquitectura: 'La validación de existencia del libro y comprobación de stock debe realizarse dentro de una transacción con aislamiento adecuado para evitar condiciones de carrera (Race Conditions).',
    explicacionDetallada: 'El cliente envía el ID del libro y el ID del usuario en formato JSON. El LoanServiceImpl abre una transacción ACID, consulta el libro en BookRepository, comprueba availableStock > 0, decrementa el stock atómicamente y crea el registro de préstamo con fecha de devolución a 14 días.',
    codigo: `POST /api/loans HTTP/1.1\nHost: api.library.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...\nContent-Type: application/json\n\n{\n  "bookId": 42,\n  "userId": 7\n}`
  },
  {
    metodo: 'GET',
    url: '/api/loans',
    color: '#0284c7',
    nombre: 'Listar Todos los Préstamos',
    desc: 'Recupera el listado de préstamos registrados, calculando dinámicamente si están activos o vencidos (OVERDUE).',
    idempotente: 'Sí (lectura sin efectos secundarios).',
    seguro: 'Seguro (solo consulta).',
    params: 'Query params opcionales (?userId=Long)',
    statusEsperado: '200 OK (Array JSON)',
    reglaArquitectura: 'El cálculo del estado OVERDUE debe realizarse en el mapper o en el modelo de dominio en tiempo de consulta, sin persistir estados temporales en la base de datos.',
    explicacionDetallada: 'Recupera los préstamos y mediante el mapper imperativo transforma cada entidad a LoanResponseDTO, evaluando si la fecha actual supera due_date para etiquetarlo como OVERDUE.',
    codigo: `GET /api/loans HTTP/1.1\nHost: api.library.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...\nAccept: application/json`
  },
  {
    metodo: 'GET',
    url: '/api/loans/{id}',
    color: '#0284c7',
    nombre: 'Obtener Préstamo por ID',
    desc: 'Consulta la información detallada de un préstamo específico.',
    idempotente: 'Sí (consulta por clave primaria).',
    seguro: 'Seguro (solo lectura).',
    params: '@PathVariable Long id',
    statusEsperado: '200 OK / 404 Not Found',
    reglaArquitectura: 'Utiliza Optional<Loan> para evitar NullPointerException. Si no existe lanza LoanNotFoundException.',
    explicacionDetallada: 'Busca el préstamo por ID en LoanRepository. Si existe retorna HTTP 200 OK con el DTO; si no existe el ExceptionHandler responde con HTTP 404.',
    codigo: `GET /api/loans/101 HTTP/1.1\nHost: api.library.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...\nAccept: application/json`
  },
  {
    metodo: 'PUT',
    url: '/api/loans/{id}/return',
    color: '#f59e0b',
    nombre: 'Devolver Libro de Préstamo',
    desc: 'Marca el préstamo como DEVUELTO (RETURNED) y repone automáticamente +1 en el stock de ejemplares disponibles.',
    idempotente: 'Sí (devolver el mismo préstamo dos veces no debe incrementar el stock dos veces).',
    seguro: 'No seguro (modifica el estado del préstamo y el stock del libro).',
    params: '@PathVariable Long id',
    statusEsperado: '200 OK / 404 Not Found',
    reglaArquitectura: 'Debe verificar que el préstamo estaba en estado ACTIVE antes de reponer el stock para evitar duplicaciones de inventario.',
    explicacionDetallada: 'El servicio busca el préstamo, comprueba que su estado sea ACTIVE, cambia su estado a RETURNED, incrementa en 1 el stock del libro asociado en BookRepository y guarda ambos cambios dentro de la misma transacción.',
    codigo: `PUT /api/loans/101/return HTTP/1.1\nHost: api.library.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...\nContent-Length: 0`
  },
  {
    metodo: 'DELETE',
    url: '/api/loans/{id}',
    color: '#ef4444',
    nombre: 'Cancelar / Borrar Préstamo',
    desc: 'Elimina el registro de préstamo si fue emitido por error administrativo.',
    idempotente: 'Sí (el resultado final tras borrar es que el registro no existe).',
    seguro: 'No seguro (elimina datos).',
    params: '@PathVariable Long id',
    statusEsperado: '204 No Content / 404 Not Found',
    reglaArquitectura: 'Retorna 204 No Content tras la eliminación.',
    explicacionDetallada: 'Elimina el préstamo de la base de datos previa comprobación de existencia.',
    codigo: `DELETE /api/loans/101 HTTP/1.1\nHost: api.library.com\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...`
  }
];

function getHexPieces(isTaskManager) {
  if (isTaskManager) {
    return [
      {
        tipo: 'Dominio Puro (Core)',
        nombre: 'Task (Modelo de Dominio)',
        paquete: 'com.backend.taskmanager.domain.model.Task',
        detalle: 'Entidad de dominio pura en Java POJO. No contiene anotaciones de persistencia (@Entity, @Table) ni dependencias del framework Spring. Encapsula las reglas de negocio e invariantes de una tarea.',
        claveDefensa: 'El modelo de negocio está 100% desacoplado de la tecnología de persistencia. Se puede testear con JUnit puro en microsegundos sin necesidad de levantar Spring ni contenedores.',
        codigo: `package com.backend.taskmanager.domain.model;\n\nimport java.time.LocalDate;\n\npublic class Task {\n    private Long id;\n    private String title;\n    private String description;\n    boolean completed;\n    private LocalDate dueDate;\n\n    public Task(Long id, String title, String description, LocalDate dueDate) {\n        if (title == null || title.isBlank()) {\n            throw new IllegalArgumentException("El título de la tarea es obligatorio");\n        }\n        this.id = id;\n        this.title = title;\n        this.description = description;\n        this.completed = false;\n        this.dueDate = dueDate;\n    }\n\n    public void complete() {\n        if (this.completed) throw new IllegalStateException("La tarea ya estaba completada");\n        this.completed = true;\n    }\n\n    public Long getId() { return id; }\n    public String getTitle() { return title; }\n    public String getDescription() { return description; }\n    public boolean isCompleted() { return completed; }\n    public LocalDate getDueDate() { return dueDate; }\n}`
      },
      {
        tipo: 'Puerto de Entrada (Driver Port)',
        nombre: 'CreateTaskUseCase',
        paquete: 'com.backend.taskmanager.domain.port.in.CreateTaskUseCase',
        detalle: 'Interfaz Java que define el contrato de operaciones que el mundo exterior puede solicitar a la aplicación. Define qué casos de uso ofrece el sistema sin importar cómo se llamen (REST, CLI, Mensajería).',
        claveDefensa: 'Los controladores REST o clientes CLI solo conocen y llaman a esta interfaz. La aplicación no sabe ni le importa quién la está invocando.',
        codigo: `package com.backend.taskmanager.domain.port.in;\n\nimport com.backend.taskmanager.domain.model.Task;\nimport java.time.LocalDate;\n\npublic interface CreateTaskUseCase {\n    Task createTask(CreateTaskCommand command);\n\n    record CreateTaskCommand(String title, String description, LocalDate dueDate) {\n        public CreateTaskCommand {\n            if (title == null || title.isBlank()) {\n                throw new IllegalArgumentException("Título inválido");\n            }\n        }\n    }\n}`
      },
      {
        tipo: 'Servicio de Aplicación (Use Case Implementation)',
        nombre: 'TaskApplicationService',
        paquete: 'com.backend.taskmanager.application.service.TaskApplicationService',
        detalle: 'Orquesta la ejecución de la regla de negocio. Implementa el puerto de entrada (CreateTaskUseCase), valida la lógica de negocio y se apoya en los puertos de salida (TaskRepositoryPort) para persistir los cambios.',
        claveDefensa: 'Coordina el dominio y los puertos de salida utilizando el principio de Inversión de Dependencias (DIP). No depende de implementaciones concretas de base de datos.',
        codigo: `package com.backend.taskmanager.application.service;\n\nimport com.backend.taskmanager.domain.model.Task;\nimport com.backend.taskmanager.domain.port.in.CreateTaskUseCase;\nimport com.backend.taskmanager.domain.port.out.TaskRepositoryPort;\n\npublic class TaskApplicationService implements CreateTaskUseCase {\n    private final TaskRepositoryPort taskRepositoryPort;\n\n    public TaskApplicationService(TaskRepositoryPort taskRepositoryPort) {\n        this.taskRepositoryPort = taskRepositoryPort;\n    }\n\n    @Override\n    public Task createTask(CreateTaskCommand cmd) {\n        Task newTask = new Task(null, cmd.title(), cmd.description(), cmd.dueDate());\n        return taskRepositoryPort.save(newTask);\n    }\n}`
      },
      {
        tipo: 'Puerto de Salida (Driven Port)',
        nombre: 'TaskRepositoryPort (SPI)',
        paquete: 'com.backend.taskmanager.domain.port.out.TaskRepositoryPort',
        detalle: 'Interfaz definida por el dominio que estipula las operaciones requeridas de almacenamiento (save, findById, findAll, deleteById). Es una Interfaz Proveedora de Servicio (SPI).',
        claveDefensa: 'Permite intercambiar el motor de persistencia (JPA relacional, MongoDB o memoria simulada) sin modificar una sola línea de código del dominio ni de los servicios de aplicación.',
        codigo: `package com.backend.taskmanager.domain.port.out;\n\nimport com.backend.taskmanager.domain.model.Task;\nimport java.util.List;\nimport java.util.Optional;\n\npublic interface TaskRepositoryPort {\n    Task save(Task task);\n    Optional<Task> findById(Long id);\n    List<Task> findAll();\n    void deleteById(Long id);\n}`
      },
      {
        tipo: 'Adaptador de Entrada (Driving Adapter / Web)',
        nombre: 'TaskRestController',
        paquete: 'com.backend.taskmanager.infrastructure.adapter.in.rest.TaskRestController',
        detalle: 'Controlador Spring MVC que atiende peticiones HTTP, deserializa JSON a TaskRequestDTO, valida restricciones (@Valid) y delega la ejecución al caso de uso inyectado (CreateTaskUseCase).',
        claveDefensa: 'Aísla el protocolo HTTP. Si mañana se decidiera migrar a GraphQL o gRPC, el dominio y los casos de uso permanecerían intactos.',
        codigo: `package com.backend.taskmanager.infrastructure.adapter.in.rest;\n\nimport com.backend.taskmanager.domain.model.Task;\nimport com.backend.taskmanager.domain.port.in.CreateTaskUseCase;\nimport com.backend.taskmanager.domain.port.in.CreateTaskUseCase.CreateTaskCommand;\nimport jakarta.validation.Valid;\nimport org.springframework.http.HttpStatus;\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.*;\n\n@RestController\n@RequestMapping("/api/v1/tasks")\npublic class TaskRestController {\n    private final CreateTaskUseCase createTaskUseCase;\n\n    public TaskRestController(CreateTaskUseCase createTaskUseCase) {\n        this.createTaskUseCase = createTaskUseCase;\n    }\n\n    @PostMapping\n    public ResponseEntity<TaskResponseDTO> create(@Valid @RequestBody TaskRequestDTO dto) {\n        CreateTaskCommand cmd = new CreateTaskCommand(dto.title(), dto.description(), dto.dueDate());\n        Task created = createTaskUseCase.createTask(cmd);\n        return ResponseEntity.status(HttpStatus.CREATED).body(TaskResponseDTO.fromDomain(created));\n    }\n}`
      },
      {
        tipo: 'Adaptador Secundario (Driven / Persistence Adapter)',
        nombre: 'TaskJpaPersistenceAdapter',
        paquete: 'com.backend.taskmanager.infrastructure.adapter.out.persistence.TaskJpaPersistenceAdapter',
        detalle: 'Implementa el puerto de salida TaskRepositoryPort. Utiliza un repositorio de Spring Data JPA (SpringDataJpaTaskRepository) y una entidad @Entity TaskJpaEntity, aislando el mapeo relacional de la lógica pura.',
        claveDefensa: 'Aísla Hibernate y SQL. La base de datos relacional (H2 / MySQL) es tratada como un plugin exterior. El modelo puro jamás se acopla a anotaciones de persistencia.',
        codigo: `package com.backend.taskmanager.infrastructure.adapter.out.persistence;\n\nimport com.backend.taskmanager.domain.model.Task;\nimport com.backend.taskmanager.domain.port.out.TaskRepositoryPort;\nimport org.springframework.stereotype.Component;\nimport java.util.Optional;\n\n@Component\npublic class TaskJpaPersistenceAdapter implements TaskRepositoryPort {\n    private final SpringDataJpaTaskRepository jpaRepository;\n    private final TaskPersistenceMapper mapper;\n\n    public TaskJpaPersistenceAdapter(SpringDataJpaTaskRepository jpaRepository, TaskPersistenceMapper mapper) {\n        this.jpaRepository = jpaRepository;\n        this.mapper = mapper;\n    }\n\n    @Override\n    public Task save(Task task) {\n        TaskJpaEntity entity = mapper.toEntity(task);\n        TaskJpaEntity saved = jpaRepository.save(entity);\n        return mapper.toDomain(saved);\n    }\n\n    @Override\n    public Optional<Task> findById(Long id) {\n        return jpaRepository.findById(id).map(mapper::toDomain);\n    }\n\n    @Override\n    public java.util.List<Task> findAll() {\n        return jpaRepository.findAll().stream().map(mapper::toDomain).toList();\n    }\n\n    @Override\n    public void deleteById(Long id) {\n        jpaRepository.deleteById(id);\n    }\n}`
      }
    ];
  } else {
    // Librería
    return [
      {
        tipo: 'Dominio Puro (Core)',
        nombre: 'Loan & Book (Modelos de Dominio)',
        paquete: 'com.backend.library.domain.model.Loan',
        detalle: 'Modelos de dominio puro para préstamos de biblioteca y control de stock. No contienen anotaciones @Entity.',
        claveDefensa: 'La regla de validar stock disponible > 0 y calcular los 14 días reglamentarios reside en el dominio sin depender de ningún framework.',
        codigo: `package com.backend.library.domain.model;\n\nimport java.time.LocalDate;\n\npublic class Loan {\n    private Long id;\n    private Long bookId;\n    private Long userId;\n    private LocalDate loanDate;\n    private LocalDate returnDate;\n    private LoanStatus status;\n\n    public Loan(Long bookId, Long userId) {\n        this.bookId = bookId;\n        this.userId = userId;\n        this.loanDate = LocalDate.now();\n        this.returnDate = LocalDate.now().plusDays(14);\n        this.status = LoanStatus.ACTIVE;\n    }\n}`
      },
      {
        tipo: 'Puerto de Entrada (Driver Port)',
        nombre: 'CreateLoanUseCase',
        paquete: 'com.backend.library.domain.port.in.CreateLoanUseCase',
        detalle: 'Interfaz que define el caso de uso de registrar un nuevo préstamo de libro para un usuario.',
        claveDefensa: 'Permite invocar la misma lógica tanto desde REST como desde una consola CLI de la biblioteca.',
        codigo: `package com.backend.library.domain.port.in;\n\nimport com.backend.library.domain.model.Loan;\n\npublic interface CreateLoanUseCase {\n    Loan borrowBook(Long bookId, Long userId);\n}`
      },
      {
        tipo: 'Servicio de Aplicación (Use Case Implementation)',
        nombre: 'LoanApplicationService',
        paquete: 'com.backend.library.application.service.LoanApplicationService',
        detalle: 'Orquesta el flujo: comprueba existencia del libro mediante BookRepositoryPort, valida stock, decrementa stock y guarda préstamo con LoanRepositoryPort.',
        claveDefensa: 'Coordina dos puertos de salida desacoplados con garantía de lógica de negocio transaccional.',
        codigo: `package com.backend.library.application.service;\n\nimport com.backend.library.domain.model.Loan;\nimport com.backend.library.domain.port.in.CreateLoanUseCase;\nimport com.backend.library.domain.port.out.LoanRepositoryPort;\nimport com.backend.library.domain.port.out.BookRepositoryPort;\n\npublic class LoanApplicationService implements CreateLoanUseCase {\n    private final LoanRepositoryPort loanRepository;\n    private final BookRepositoryPort bookRepository;\n\n    public LoanApplicationService(LoanRepositoryPort loanRepository, BookRepositoryPort bookRepository) {\n        this.loanRepository = loanRepository;\n        this.bookRepository = bookRepository;\n    }\n\n    @Override\n    public Loan borrowBook(Long bookId, Long userId) {\n        if (!bookRepository.hasAvailableStock(bookId)) {\n            throw new IllegalStateException("Libro sin stock disponible");\n        }\n        bookRepository.decrementStock(bookId);\n        Loan loan = new Loan(bookId, userId);\n        return loanRepository.save(loan);\n    }\n}`
      },
      {
        tipo: 'Puerto de Salida (Driven Port)',
        nombre: 'LoanRepositoryPort & BookRepositoryPort',
        paquete: 'com.backend.library.domain.port.out.LoanRepositoryPort',
        detalle: 'Interfaces que definen las necesidades de lectura y guardado de préstamos y existencias de libros.',
        claveDefensa: 'Las pruebas unitarias del servicio pueden utilizar mocks sencillos de estas interfaces sin levantar H2.',
        codigo: `package com.backend.library.domain.port.out;\n\nimport com.backend.library.domain.model.Loan;\n\npublic interface LoanRepositoryPort {\n    Loan save(Loan loan);\n    java.util.List<Loan> findActiveLoansByUser(Long userId);\n}`
      },
      {
        tipo: 'Adaptador Primario (Driving / REST & CLI Adapter)',
        nombre: 'LoanRestController',
        paquete: 'com.backend.library.infrastructure.adapter.in.rest.LoanRestController',
        detalle: 'Expone el endpoint POST /api/loans consumiendo CreateLoanUseCase.',
        claveDefensa: 'Permite cambiar o añadir nuevos adaptadores de entrada sin tocar la lógica de préstamos.',
        codigo: `@RestController\n@RequestMapping("/api/loans")\npublic class LoanRestController {\n    private final CreateLoanUseCase createLoanUseCase;\n    public LoanRestController(CreateLoanUseCase uc) { this.createLoanUseCase = uc; }\n    @PostMapping\n    public ResponseEntity<LoanDTO> create(@RequestBody LoanRequest req) {\n        return ResponseEntity.status(201).body(LoanDTO.from(createLoanUseCase.borrowBook(req.bookId(), req.userId())));\n    }\n}`
      },
      {
        tipo: 'Adaptador Secundario (Driven / Persistence Adapter)',
        nombre: 'LoanJpaPersistenceAdapter',
        paquete: 'com.backend.library.infrastructure.adapter.out.persistence.LoanJpaPersistenceAdapter',
        detalle: 'Conexión con Spring Data JPA y base de datos relacional para préstamos.',
        claveDefensa: 'Aísla el modelo relacional (@Entity LoanJpaEntity) del modelo de dominio puro.',
        codigo: `@Component\npublic class LoanJpaPersistenceAdapter implements LoanRepositoryPort {\n    private final SpringDataJpaLoanRepository repo;\n    public LoanJpaPersistenceAdapter(SpringDataJpaLoanRepository repo) { this.repo = repo; }\n    @Override\n    public Loan save(Loan loan) {\n        LoanJpaEntity entity = LoanMapper.toEntity(loan);\n        return LoanMapper.toDomain(repo.save(entity));\n    }\n}`
      }
    ];
  }
}

export default function StudioProjectsTab({
  projectId = 'taskmanager',
  initialViewMode = 'capas'
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Prefijo base unificado siempre en /java/studio
  const basePath = '/java/studio';

  // Modo de vista sincronizado directamente con la URL: capas | ciclo | hexagonal
  const viewMode =
    initialViewMode === 'hexagonal'
      ? 'hexagonal'
      : initialViewMode === 'ciclo' || initialViewMode === 'fases'
      ? 'ciclo'
      : 'capas';

  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);
  const [selectedHttpIndex, setSelectedHttpIndex] = useState(0);
  const [selectedFlowPhase, setSelectedFlowPhase] = useState(0);
  const [selectedHexIndex, setSelectedHexIndex] = useState(0);
  const [modalState, setModalState] = useState(null);

  const handlePrevDiagram = () => {
    setModalState((prev) => {
      if (!prev) return null;
      const newIndex = prev.index > 0 ? prev.index - 1 : prev.list.length - 1;
      return { ...prev, index: newIndex };
    });
  };

  const handleNextDiagram = () => {
    setModalState((prev) => {
      if (!prev) return null;
      const newIndex = prev.index < prev.list.length - 1 ? prev.index + 1 : 0;
      return { ...prev, index: newIndex };
    });
  };

  const isTaskManager = projectId === 'taskmanager';
  const project = PROYECTOS[projectId] || PROYECTOS['taskmanager'];
  const requestsList = isTaskManager ? TASKMANAGER_HTTP_REQUESTS : LIBRARY_HTTP_REQUESTS;
  const currentReq = requestsList[selectedHttpIndex] || requestsList[0];

  const capas = project.capas || [];
  const currentLayer = capas[selectedLayerIndex] || capas[0];

  const hexPieces = getHexPieces(isTaskManager);
  const currentHexPiece = hexPieces[selectedHexIndex] || hexPieces[0];

  const handleModeChange = (newMode) => {
    navigate(`${basePath}/${projectId}/${newMode}`);
  };

  // 7 fases dinámicas
  const flowPhases = [
    {
      id: 'req',
      faseNum: 1,
      title: '1. Petición HTTP REST',
      capaNombre: 'Red Externa / Cliente HTTP',
      color: '#0284c7',
      metafora: 'El cliente hojeando la carta y enviando la orden',
      queEntra: 'Petición HTTP a través de Internet con verbo (POST, GET, PUT, DELETE), URI, Authorization Bearer JWT y JSON opcional.',
      queHace: 'El cliente frontend (React) o Postman emite la llamada hacia el puerto 8080 del servidor.',
      queSale: 'Flujo de bytes TCP que alcanza el Tomcat embebido de Spring Boot.',
      prohibicion: 'El cliente no tiene acceso directo a la BD ni a los servicios internos; todo pasa obligatoriamente por la API REST.',
      codigo: currentReq.codigo
    },
    {
      id: 'sec',
      faseNum: 2,
      title: '2. Filtro Security',
      capaNombre: 'Capa Transversal de Seguridad (OncePerRequestFilter)',
      color: '#8b5cf6',
      metafora: 'El control de seguridad y aduanas en la entrada del edificio',
      queEntra: 'Cabecera Authorization: Bearer <jwt>.',
      queHace: 'Extrae el token, verifica criptográficamente la firma HMAC-SHA256 y puebla el SecurityContextHolder.',
      queSale: 'Si el token es válido, cede el turno con filterChain.doFilter(request, response).',
      prohibicion: 'No debe ejecutar lógica de negocio ni consultar tareas; su única función es autenticar al emisor.',
      codigo: `@Component\npublic class JwtAuthFilter extends OncePerRequestFilter {\n    @Override\n    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) \n            throws ServletException, IOException {\n        String token = extractToken(req);\n        if (jwtService.validateToken(token)) {\n            SecurityContextHolder.getContext().setAuthentication(auth);\n        }\n        chain.doFilter(req, res);\n    }\n}`
    },
    {
      id: 'ctrl',
      faseNum: 3,
      title: '3. @RestController',
      capaNombre: 'Capa Web / Presentación (Spring Web MVC)',
      color: '#10b981',
      metafora: 'El camarero del restaurante que toma la comanda en la mesa',
      queEntra: 'JSON deserializado por Jackson en un RequestDTO (o @PathVariable ID).',
      queHace: 'Ejecuta Bean Validation (@Valid). Si las restricciones pasan, llama inmediatamente al @Service.',
      queSale: isTaskManager ? 'Invoca taskService.createTask(dto) o taskService.getTaskById(id).' : 'Invoca loanService.createLoan(dto).',
      prohibicion: '¡EL CAMARERO NO COCINA! En el Controller está TERMINANTEMENTE PROHIBIDO: 1) Inyectar repositorios, 2) Escribir consultas SQL/JPQL, 3) Realizar cálculos de negocio.',
      codigo: isTaskManager
        ? `@RestController\n@RequestMapping("/api/v1/tasks")\npublic class TaskController {\n    @PostMapping\n    public ResponseEntity<TaskResponseDTO> createTask(@Valid @RequestBody TaskRequestDTO dto) {\n        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(dto));\n    }\n}`
        : `@RestController\n@RequestMapping("/api/loans")\npublic class LoanController {\n    @PostMapping\n    public ResponseEntity<LoanResponseDTO> createLoan(@Valid @RequestBody LoanRequestDTO dto) {\n        return ResponseEntity.status(HttpStatus.CREATED).body(loanService.createLoan(dto));\n    }\n}`
    },
    {
      id: 'srv',
      faseNum: 4,
      title: '4. @Service',
      capaNombre: 'Capa de Negocio / Lógica de Aplicación',
      color: '#f59e0b',
      metafora: 'El chef de cocina que elabora la receta y toma las decisiones',
      queEntra: 'DTOs inmutables de Java validados y limpios de HTTP.',
      queHace: 'Abre transacción ACID (@Transactional), valida reglas de negocio (sin duplicados, stock > 0) y coordina repositorios.',
      queSale: 'Entidad de dominio persistida tras coordinarse con la persistencia.',
      prohibicion: '¡EL CHEF NO SABE QUÉ ES HTTP! En el Service está PROHIBIDO: 1) Importar clases web (HttpServletRequest, ResponseEntity), 2) Conocer qué cliente llamó. Debe poder invocarse desde REST, CLI o Kafka sin cambios.',
      codigo: isTaskManager
        ? `@Service\npublic class TaskServiceImpl implements TaskService {\n    @Transactional\n    public TaskResponseDTO createTask(TaskRequestDTO dto) {\n        if (taskRepository.existsByTitleIgnoreCase(dto.getTitle())) throw new DuplicateTaskException();\n        Task task = taskMapper.toEntity(dto);\n        return taskMapper.toDTO(taskRepository.save(task));\n    }\n}`
        : `@Service\npublic class LoanServiceImpl implements LoanService {\n    @Transactional\n    public LoanResponseDTO createLoan(LoanRequestDTO dto) {\n        Book book = bookRepository.findById(dto.getBookId()).orElseThrow(...);\n        if (book.getAvailableStock() <= 0) throw new BookOutOfStockException();\n        book.setAvailableStock(book.getAvailableStock() - 1);\n        Loan loan = new Loan(book, dto.getUserId(), LocalDate.now(), LocalDate.now().plusDays(14));\n        return loanMapper.toDTO(loanRepository.save(loan));\n    }\n}`
    },
    {
      id: 'repo',
      faseNum: 5,
      title: '5. @Repository & JPA',
      capaNombre: 'Capa de Persistencia / Acceso a Datos (Spring Data JPA)',
      color: '#6366f1',
      metafora: 'La despensa y el almacén donde se guardan físicamente los ingredientes',
      queEntra: 'Entidad Java (@Entity Task o @Entity Loan) con campos mapeados.',
      queHace: 'Hibernate traduce los métodos de Spring Data JPA en sentencias SQL (INSERT, SELECT, UPDATE) ejecutadas contra JDBC.',
      queSale: 'Registro grabado físicamente en la tabla relacional con su ID asignado.',
      prohibicion: 'El repositorio solo almacena y consulta datos. No debe validar reglas de negocio complejas ni comprobar permisos.',
      codigo: isTaskManager
        ? `INSERT INTO tasks (title, description, completed, due_date) \nVALUES ('Estudiar Mockito', 'Repasar @Mock, @InjectMocks y verify()', false, '2026-11-20');`
        : `UPDATE books SET available_stock = available_stock - 1 WHERE id = 42;\nINSERT INTO loans (book_id, user_id, start_date, due_date, status) \nVALUES (42, 7, '2026-11-14', '2026-11-28', 'ACTIVE');`
    },
    {
      id: 'map',
      faseNum: 6,
      title: '6. Mapper & DTO',
      capaNombre: 'Frontera de Desacoplamiento (DTO & Mapping)',
      color: '#ec4899',
      metafora: 'El emplatado y control de calidad antes de salir de la cocina',
      queEntra: 'Entidad JPA con campos internos (id, versión de Hibernate, metadatos).',
      queHace: 'Mapea atributo por atributo hacia un ResponseDTO limpio mediante getters y setters imperativos tradicionales.',
      queSale: 'Objeto Java Record inmutable listo para serializarse a JSON.',
      prohibicion: 'NUNCA devolver la entidad JPA directamente al cliente. Provoca fugas de seguridad y bucles infinitos de Jackson (StackOverflowError).',
      codigo: isTaskManager
        ? `public TaskResponseDTO toDTO(Task entity) {\n    if (entity == null) return null;\n    TaskResponseDTO dto = new TaskResponseDTO();\n    dto.setId(entity.getId());\n    dto.setTitle(entity.getTitle());\n    dto.setDescription(entity.getDescription());\n    dto.setCompleted(entity.isCompleted());\n    dto.setDueDate(entity.getDueDate());\n    return dto;\n}`
        : `public static LoanResponseDTO toResponseDTO(Loan loan) {\n    if (loan == null) return null;\n    LoanResponseDTO dto = new LoanResponseDTO();\n    dto.setId(loan.getId());\n    dto.setBookTitle(loan.getBook().getTitle());\n    dto.setDueDate(loan.getDueDate());\n    if (loan.getStatus() == LoanStatus.ACTIVE && loan.getDueDate().isBefore(LocalDate.now())) {\n        dto.setStatus("OVERDUE");\n    } else {\n        dto.setStatus(loan.getStatus().name());\n    }\n    return dto;\n}`
    },
    {
      id: 'resp',
      faseNum: 7,
      title: '7. ResponseEntity',
      capaNombre: 'Capa Web / Salida HTTP (Response Layer)',
      color: '#10b981',
      metafora: 'El plato servido en la mesa con el ticket oficial y estado',
      queEntra: 'ResponseDTO y el código de estado semántico decidido por el Controller.',
      queHace: 'Spring serializa el objeto DTO a JSON (Jackson) y compone cabeceras HTTP.',
      queSale: 'HTTP/1.1 201 Created con cabecera Content-Type: application/json y payload limpio.',
      prohibicion: 'Nunca devolver genéricos sin tipo (ResponseEntity<?>) ni omitir códigos semánticos.',
      codigo: `HTTP/1.1 201 Created\nLocation: /api/${isTaskManager ? 'v1/tasks/42' : 'loans/101'}\nContent-Type: application/json\n\n{\n  "id": ${isTaskManager ? '42' : '101'},\n  "status": "${isTaskManager ? 'PENDING' : 'ACTIVE'}",\n  "createdAt": "2026-11-14T13:00:00"\n}`
    }
  ];

  const currentPhase = flowPhases[selectedFlowPhase] || flowPhases[0];

  return (
    <div className="studio-projects-container">
      {/* CABECERA OPERACIONAL DE PROYECTO (TUTOR-ACCENTURE STYLE) */}
      <div className="project-header-bar">
        <div className="project-title-area">
          <h2 style={{ fontSize: '1.45rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {project.nombre}
            <span className="studio-badge studio-badge-purple" style={{ fontSize: '0.8rem', padding: '0.25rem 0.65rem' }}>
              {viewMode === 'hexagonal' ? 'Hexagonal Ports & Adapters' : viewMode === 'ciclo' ? 'Ciclo HTTP (7 Fases)' : '3 Capas Tradicional'}
            </span>
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0.35rem 0 0 0' }}>
            {isTaskManager
              ? 'Proyecto pedagógico evolutivo · 16 actividades oficiales · De IoC en XML a Microservicio Dockerizado'
              : 'Proyecto final integral de biblioteca · Préstamos, stock atómico, validaciones multicampo y seguridad JWT'}
          </p>
        </div>

        {/* CONMUTADOR RÁPIDO DE MODOS DE VISTA */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Vista:
          </span>
          <div className="category-pills" style={{ margin: 0 }}>
            <button
              type="button"
              className={`pill-btn ${viewMode === 'capas' ? 'active' : ''}`}
              onClick={() => handleModeChange('capas')}
            >
              <IconLayers style={{ fontSize: '0.9rem' }} /> 3 Capas
            </button>
            <button
              type="button"
              className={`pill-btn ${viewMode === 'ciclo' ? 'active' : ''}`}
              onClick={() => handleModeChange('ciclo')}
            >
              <IconRepeat style={{ fontSize: '0.9rem' }} /> Ciclo HTTP (7 Fases)
            </button>
            <button
              type="button"
              className={`pill-btn ${viewMode === 'hexagonal' ? 'active' : ''}`}
              onClick={() => handleModeChange('hexagonal')}
            >
              <IconHexagon style={{ fontSize: '0.9rem' }} /> Hexagonal
            </button>
          </div>
        </div>
      </div>

      {/* BARRA DE ENLACES PRÁCTICOS DISCRETOS */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem', padding: '0.65rem 1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', alignItems: 'center', justifyContent: 'space-between' }}>
        {isTaskManager ? (
          <>
            <div style={{ fontSize: '0.86rem', color: '#475569' }}>
              🛠️ <strong>TaskManager Enterprise:</strong> 16 actividades integradas paso a paso con H2/MySQL, Spring Security y Docker.
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Link
                to="/java/studio/actividades"
                className="studio-btn-primary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', textDecoration: 'none' }}
              >
                Ver las 16 Actividades Resueltas ➔
              </Link>
              <Link
                to="/java/studio/actividades/actividad-1"
                className="studio-btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', textDecoration: 'none' }}
              >
                Pasos Previos (Act. 1-4)
              </Link>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '0.86rem', color: '#475569' }}>
              🏆 <strong>Library API REST (Proyecto Final):</strong> Préstamos con cálculo dinámico de OVERDUE, control concurrente de stock y test suite.
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Link
                to="/springboot/libreria/por-capas?presentacion"
                className="studio-btn-primary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', textDecoration: 'none', background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' }}
              >
                🎤 Memoria & Presentación (5 Ejes) ➔
              </Link>
              <Link
                to="/springboot/libreria/por-capas"
                className="studio-btn-primary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', textDecoration: 'none', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}
              >
                🏛️ Entregable Oficial (Por Capas) ➔
              </Link>
              <Link
                to="/springboot/libreria/hexagonal"
                className="studio-btn-primary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', textDecoration: 'none', background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}
              >
                ⚡ Evolución Hexagonal ➔
              </Link>
              <a
                href={viewMode === 'hexagonal' 
                  ? "/java-studio/proyectos/libreria-hexagonal/index-secure.html" 
                  : "/java-studio/proyectos/libreria-capas/index-secure.html"}
                target="_blank"
                rel="noopener noreferrer"
                className="studio-btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', textDecoration: 'none' }}
              >
                Probar SPA Interactiva ↗
              </a>
            </div>
          </>
        )}
      </div>

      {/* =====================================================================
          VISTA 1: 3 CAPAS TRADICIONALES (ARQUITECTURA ESTÁTICA)
          ===================================================================== */}
      {viewMode === 'capas' && (
        <div>
          {/* PANEL PEDAGÓGICO: QUÉ SON LAS CAPAS Y REGLAS DE ORO */}
          <div className="studio-card" style={{ marginBottom: '1.25rem', borderLeft: '4px solid #6d28d9' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#6d28d9', fontWeight: 800 }}>
                Fundamento Arquitectónico: ¿Qué es la Arquitectura en 3 Capas?
              </h4>
              <button
                type="button"
                onClick={() => handleModeChange('ciclo')}
                className="studio-badge studio-badge-blue"
                style={{ cursor: 'pointer', textDecoration: 'none', border: 'none' }}
              >
                Ver Ciclo HTTP Dinámico (7 Fases) →
              </button>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
              Es la <strong>organización estática del código fuente en paquetes Java</strong> según su responsabilidad técnica. Cada capa aísla una preocupación (presentación, negocio, datos) para que los cambios en una no afecten a las demás y se puedan testear con mocks sin arrancar la base de datos ni el servidor.
            </p>

            {/* Las 4 Reglas de Oro */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem', fontSize: '0.84rem' }}>
              <div style={{ background: '#f8fafc', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#6d28d9', display: 'block', marginBottom: '0.2rem' }}>
                  1. Dirección Estricta hacia Adentro
                </strong>
                <span style={{ color: '#64748b' }}>
                  Controller ➔ Service ➔ Repository. <strong>Prohibido</strong> que el Controller salte directamente al Repository sin pasar por la capa de negocio.
                </span>
              </div>

              <div style={{ background: '#f8fafc', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0284c7', display: 'block', marginBottom: '0.2rem' }}>
                  2. Service Agnóstico de la Web
                </strong>
                <span style={{ color: '#64748b' }}>
                  El Service <strong>nunca</strong> importa <code>HttpServletRequest</code>, <code>ResponseEntity</code> ni <code>@RequestParam</code>. Su lógica funciona igual si se llama desde REST, CLI o Kafka.
                </span>
              </div>

              <div style={{ background: '#f8fafc', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#f59e0b', display: 'block', marginBottom: '0.2rem' }}>
                  3. Entidades JPA Ocultas (DTOs)
                </strong>
                <span style={{ color: '#64748b' }}>
                  Las clases <code>@Entity</code> jamás se devuelven en la API REST. Se usan <strong>DTOs (Java Records) y Mappers</strong> para evitar <code>LazyInitializationException</code> y over-posting.
                </span>
              </div>

              <div style={{ background: '#f8fafc', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#10b981', display: 'block', marginBottom: '0.2rem' }}>
                  4. Pirámide de Testing Aislada
                </strong>
                <span style={{ color: '#64748b' }}>
                  Web se prueba con <code>@WebMvcTest</code> + <code>@MockBean</code>; Service con JUnit 5 + Mockito puro (ultrarrápido); Repository con <code>@DataJpaTest</code> + H2.
                </span>
              </div>
            </div>
          </div>

          {/* INFOGRAFÍAS DE ARQUITECTURA EN 3 CAPAS */}
          <div className="studio-card" style={{ marginBottom: '1.25rem', borderLeft: '4px solid #2563eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontSize: '1.25rem' }}>📐</span>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  Infografías Maestras: Arquitectura en 3 Capas
                </h4>
              </div>
              <span className="studio-badge studio-badge-blue" style={{ fontSize: '0.72rem' }}>
                3 Infografías de Estudio
              </span>
            </div>

            <p style={{ margin: '0 0 1rem 0', fontSize: '0.86rem', color: '#475569', lineHeight: 1.55 }}>
              Modelos de referencia visual sobre flujo de capas, desacoplamiento y matriz de dependencias. Haz clic en cualquiera para ampliarla a pantalla completa.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {CAPAS_INFOGRAFIAS.map((diag, idx) => (
                <div
                  key={idx}
                  onClick={() => setModalState({ list: CAPAS_INFOGRAFIAS, index: idx })}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.15)';
                    e.currentTarget.style.borderColor = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '170px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f1f5f9', overflow: 'hidden' }}>
                    <img
                      src={diag.src}
                      alt={diag.titulo}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: '0.5rem' }}
                      loading="lazy"
                    />
                    <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(15, 23, 42, 0.75)', color: '#ffffff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>
                      🔍 Ampliar
                    </div>
                    <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.5rem', background: '#2563eb', color: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>
                      {diag.etiqueta}
                    </div>
                  </div>
                  <div style={{ padding: '0.85rem', flex: 1 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem', lineHeight: 1.35 }}>
                      {diag.titulo}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.45 }}>
                      {diag.subtitulo}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MAPA VISUAL DE CAPAS INTERACTIVO (CLIC DIRECTO) */}
          <div className="studio-card" style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
              Mapa de Flujo de Dependencias entre Capas (Haz clic para inspeccionar):
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.65rem' }}>
              {capas.map((capa, idx) => {
                const isSelected = idx === selectedLayerIndex;
                return (
                  <button
                    key={capa.id || idx}
                    type="button"
                    onClick={() => setSelectedLayerIndex(idx)}
                    style={{
                      background: isSelected ? '#6d28d9' : '#f8fafc',
                      color: isSelected ? '#ffffff' : '#0f172a',
                      border: isSelected ? '1px solid #6d28d9' : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '0.85rem 0.95rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 2px 6px rgba(109, 40, 217, 0.25)' : 'none'
                    }}
                  >
                    <span style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800, opacity: 0.85, marginBottom: '0.2rem', color: isSelected ? '#ffffff' : '#6d28d9' }}>
                      Capa {idx + 1}
                    </span>
                    <strong style={{ display: 'block', fontSize: '0.92rem', marginBottom: '0.15rem' }}>
                      {capa.nombre.split('(')[0].trim()}
                    </strong>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'monospace', opacity: 0.85 }}>
                      {capa.archivo || `${capa.nombre.split(' ')[0]}.java`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* VISTA A ANCHO COMPLETO: FICHA DE LA CAPA */}
          <div style={{ width: '100%', minWidth: 0 }}>
            <div style={{ minWidth: 0 }}>
              {/* TARJETA DETALLADA DE LA CAPA SELECCIONADA */}
              {currentLayer && (
                <article className="challenge-display-card" style={{ borderLeft: '5px solid #6d28d9' }}>
                  <div className="challenge-card-header">
                    <div>
                      <span className="studio-badge studio-badge-purple" style={{ marginBottom: '0.35rem' }}>
                        {currentLayer.archivo || currentLayer.paquete}
                      </span>
                      <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>
                        {currentLayer.nombre}
                      </h3>
                      <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.92rem', color: '#64748b' }}>
                        {currentLayer.descripcion || currentLayer.responsabilidad}
                      </p>
                    </div>
                    <span className="studio-badge">
                      Capa {selectedLayerIndex + 1} de {capas.length}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <h5 style={{ margin: '0 0 0.5rem 0', color: '#334155', fontSize: '0.88rem', fontWeight: 700 }}>
                        Anotaciones Clave
                      </h5>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {(currentLayer.anotaciones || []).map((ant, i) => (
                          <span key={i} className="studio-badge studio-badge-blue" style={{ fontFamily: 'monospace' }}>
                            {ant}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <h5 style={{ margin: '0 0 0.5rem 0', color: '#334155', fontSize: '0.88rem', fontWeight: 700 }}>
                        Responsabilidades Técnicas
                      </h5>
                      <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: '#475569', lineHeight: 1.6 }}>
                        {(currentLayer.responsabilidades || []).map((res, i) => (
                          <li key={i}>{res}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {currentLayer.codigoEjemplo && (
                    <div>
                      <h5 style={{ margin: '0.8rem 0 0.4rem 0', color: '#334155', fontSize: '0.88rem', fontWeight: 700 }}>
                        Código de Referencia
                      </h5>
                      <StudioCodeBlock code={currentLayer.codigoEjemplo} filename={`${currentLayer.nombre.split(' ')[0]}.java`} />
                    </div>
                  )}
                </article>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          VISTA 2: CICLO HTTP DINÁMICO (7 FASES DE EXTREMO A EXTREMO)
          ===================================================================== */}
      {viewMode === 'ciclo' && (
        <div>
          {/* PANEL PEDAGÓGICO: CAPAS VS FASES */}
          <div className="studio-card" style={{ marginBottom: '1.25rem', borderLeft: '4px solid #6d28d9' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#6d28d9', fontWeight: 800 }}>
                Concepto Clave: ¿Qué diferencia hay entre una Capa y una Fase?
              </h4>
              <button
                type="button"
                onClick={() => handleModeChange('capas')}
                className="studio-badge studio-badge-purple"
                style={{ cursor: 'pointer', textDecoration: 'none', border: 'none' }}
              >
                Ver Estructura de 3 Capas →
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', fontSize: '0.88rem', lineHeight: 1.55, marginTop: '0.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#6d28d9', display: 'block', marginBottom: '0.25rem' }}>
                  Las CAPAS (Estructura Estática — Dónde vive el código):
                </strong>
                <p style={{ margin: 0, color: '#64748b' }}>
                  Son los departamentos físicos en tus paquetes Java: <code>controller</code>, <code>service</code>, <code>repository</code>. No se mueven; dividen el código según su responsabilidad técnica.
                </p>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#f59e0b', display: 'block', marginBottom: '0.25rem' }}>
                  Las FASES (Viaje Dinámico — Cuándo ocurre en el tiempo):
                </strong>
                <p style={{ margin: 0, color: '#64748b' }}>
                  Es la película de qué le pasa a una petición HTTP desde que el usuario hace clic. <strong>En cada Fase, la petición cruza o trabaja dentro de una Capa concreta</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* CATÁLOGO DE PETICIONES REST */}
          <div className="studio-card" style={{ marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>
              Catálogo de Peticiones REST de {project.nombre.split(' ')[0]}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {requestsList.map((req, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedHttpIndex(idx)}
                  className={`studio-btn-secondary ${selectedHttpIndex === idx ? 'active' : ''}`}
                  style={{
                    borderColor: selectedHttpIndex === idx ? req.color : '#cbd5e1',
                    background: selectedHttpIndex === idx ? `${req.color}15` : '#ffffff',
                    color: selectedHttpIndex === idx ? req.color : '#334155',
                    fontWeight: 700
                  }}
                >
                  <span style={{ fontWeight: 800, marginRight: '0.35rem' }}>{req.metodo}</span>
                  <span>{req.url}</span>
                </button>
              ))}
            </div>

            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="studio-badge" style={{ background: currentReq.color, color: '#fff', fontWeight: 800 }}>
                  {currentReq.metodo}
                </span>
                <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{currentReq.nombre}</strong>
                <span style={{ fontSize: '0.84rem', color: '#64748b' }}>({currentReq.url})</span>
              </div>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.88rem', color: '#475569' }}>{currentReq.desc}</p>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.82rem', color: '#64748b' }}>
                <span><strong>Idempotente:</strong> {currentReq.idempotente}</span>
                <span><strong>Seguro:</strong> {currentReq.seguro}</span>
                <span><strong>Status:</strong> {currentReq.statusEsperado}</span>
              </div>
            </div>
          </div>

          {/* VISTA A ANCHO COMPLETO: FASES DEL CICLO HTTP */}
          <div style={{ width: '100%', minWidth: 0 }}>
            {/* SELECTOR HORIZONTAL DE FASES */}
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
              {flowPhases.map((st, idx) => {
                const isSelected = selectedFlowPhase === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedFlowPhase(idx)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #6d28d9' : '1px solid #e2e8f0',
                      background: isSelected ? '#6d28d9' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#334155',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontWeight: 800 }}>Fase {st.faseNum || (idx + 1)}:</span>
                    <span>{st.title.replace(/^\d+\.\s*/, '')}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ minWidth: 0 }}>
              {/* TARJETA DETALLADA DE LA FASE ACTIVA */}
              <div className="challenge-display-card" style={{ borderLeft: '5px solid #6d28d9' }}>
                <div className="challenge-card-header">
                  <div>
                    <span className="studio-badge studio-badge-purple" style={{ marginBottom: '0.35rem' }}>
                      Fase {currentPhase.faseNum} de 7 · {currentPhase.capaNombre}
                    </span>
                    <h3 style={{ margin: '0.2rem 0 0.2rem 0', fontSize: '1.35rem', fontWeight: 800 }}>
                      {currentPhase.title}
                    </h3>
                    <div style={{ fontSize: '0.88rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                      <span>💡 Metáfora:</span>
                      <em>{currentPhase.metafora}</em>
                    </div>
                  </div>
                  <span className="studio-badge">
                    Fase {selectedFlowPhase + 1} de {flowPhases.length}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                  <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#0284c7', display: 'block', fontSize: '0.84rem' }}>📥 ¿Qué entra?</strong>
                    <span style={{ fontSize: '0.82rem', color: '#475569' }}>{currentPhase.queEntra}</span>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#10b981', display: 'block', fontSize: '0.84rem' }}>⚙️ ¿Qué hace la capa?</strong>
                    <span style={{ fontSize: '0.82rem', color: '#475569' }}>{currentPhase.queHace}</span>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#6d28d9', display: 'block', fontSize: '0.84rem' }}>📤 ¿Qué sale?</strong>
                    <span style={{ fontSize: '0.82rem', color: '#475569' }}>{currentPhase.queSale}</span>
                  </div>
                </div>

                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '0.85rem', borderRadius: '8px', color: '#991b1b', fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, marginBottom: '0.2rem' }}>
                    <IconAlertTriangle /> PROHIBICIÓN ESTRICTA DE ESTA FASE
                  </div>
                  <div>{currentPhase.prohibicion}</div>
                </div>

                {currentPhase.codigo && (
                  <div>
                    <h5 style={{ margin: '0.8rem 0 0.4rem 0', color: '#334155', fontSize: '0.88rem', fontWeight: 700 }}>
                      Código Ejecutado en esta Fase
                    </h5>
                    <StudioCodeBlock code={currentPhase.codigo} filename={`Fase${currentPhase.faseNum}_${currentPhase.id}.java`} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          VISTA 3: ARQUITECTURA HEXAGONAL (PORTS & ADAPTERS)
          ===================================================================== */}
      {viewMode === 'hexagonal' && (
        <div>
          {/* FUNDAMENTO HEXAGONAL */}
          <div className="studio-card" style={{ marginBottom: '1.25rem', borderLeft: '4px solid #6d28d9' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#6d28d9', fontSize: '1.1rem', fontWeight: 800 }}>
              Arquitectura Hexagonal (Ports & Adapters) en {project.nombre.split(' ')[0]}
            </h4>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
              {project.hexagonal?.descripcion || 'El dominio es el centro absoluto. El framework (Spring Boot), la base de datos (JPA) y el transporte HTTP son detalles reemplazables que se comunican a través de puertos (interfaces) y adaptadores.'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0284c7', display: 'block', fontSize: '0.86rem' }}>🎯 Núcleo de Dominio</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{project.hexagonal?.nucleo || 'POJOs puros sin dependencias de Spring ni anotaciones JPA.'}</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#10b981', display: 'block', fontSize: '0.86rem' }}>🔌 Puertos de Entrada</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{project.hexagonal?.puertosEntrada || 'Interfaces que declaran los casos de uso (ej: CreateTaskUseCase).'}</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#f59e0b', display: 'block', fontSize: '0.86rem' }}>🔌 Puertos de Salida</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{project.hexagonal?.puertosSalida || 'Interfaces que el dominio define para persistir o notificar (ej: TaskRepositoryPort).'}</span>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#6d28d9', display: 'block', fontSize: '0.86rem' }}>🧩 Adaptadores</strong>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Primarios (REST Controllers) y Secundarios (Spring Data JPA Repositories).</span>
              </div>
            </div>
          </div>

          {/* INFOGRAFÍAS DE ARQUITECTURA HEXAGONAL */}
          <div className="studio-card" style={{ marginBottom: '1.25rem', borderLeft: '4px solid #6d28d9' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.65rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontSize: '1.25rem' }}>📐</span>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                  Infografías Maestras: Arquitectura Hexagonal
                </h4>
              </div>
              <span className="studio-badge studio-badge-blue" style={{ fontSize: '0.72rem' }}>
                2 Infografías de Estudio
              </span>
            </div>

            <p style={{ margin: '0 0 1rem 0', fontSize: '0.86rem', color: '#475569', lineHeight: 1.55 }}>
              Modelos de referencia visual sobre puertos, adaptadores e inversión de dependencias en arquitecturas limpias. Haz clic para ampliar.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {HEXAGONAL_INFOGRAFIAS.map((diag, idx) => (
                <div
                  key={idx}
                  onClick={() => setModalState({ list: HEXAGONAL_INFOGRAFIAS, index: idx })}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(2, 132, 199, 0.15)';
                    e.currentTarget.style.borderColor = '#0284c7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '170px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f1f5f9', overflow: 'hidden' }}>
                    <img
                      src={diag.src}
                      alt={diag.titulo}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: '0.5rem' }}
                      loading="lazy"
                    />
                    <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(15, 23, 42, 0.75)', color: '#ffffff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>
                      🔍 Ampliar
                    </div>
                    <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.5rem', background: '#0284c7', color: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>
                      {diag.etiqueta}
                    </div>
                  </div>
                  <div style={{ padding: '0.85rem', flex: 1 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem', lineHeight: 1.35 }}>
                      {diag.titulo}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.45 }}>
                      {diag.subtitulo}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DIAGRAMA SVG DE PUERTOS Y ADAPTADORES */}
          <div className="studio-card" style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800 }}>
                Diagrama de Puertos y Adaptadores · {project.nombre.split(' ')[0]}
              </h4>
              <span className="studio-badge studio-badge-purple">Regla de Inversión de Dependencias (DIP)</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
              Las dependencias de código fuente apuntan <strong>SIEMPRE HACIA ADENTRO</strong>. El Dominio y los Casos de Uso jamás conocen los adaptadores externos.
            </p>
            <div style={{ maxWidth: '920px', margin: '0 auto', overflow: 'hidden' }}>
              <svg viewBox="0 0 920 380" width="100%" height="auto" style={{ borderRadius: '10px', background: '#0f172a', padding: '14px' }}>
                {/* Adaptadores Primarios */}
                <rect x="20" y="40" width="220" height="300" rx="10" fill="rgba(30, 41, 59, 0.7)" stroke="#38bdf8" strokeWidth="2" />
                <text x="130" y="75" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">ADAPTADORES PRIMARIOS</text>
                <text x="130" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">(Driver / Conduce)</text>

                <rect x="35" y="120" width="190" height="85" rx="6" fill="#1e293b" stroke="#0284c7" strokeWidth="1.5" />
                <text x="130" y="145" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">{isTaskManager ? 'TaskRestController' : 'LoanRestController'}</text>
                <text x="130" y="165" textAnchor="middle" fill="#38bdf8" fontSize="10">@RestController / REST API</text>
                <text x="130" y="185" textAnchor="middle" fill="#64748b" fontSize="9">Recibe JSON y valida @Valid</text>

                <rect x="35" y="225" width="190" height="70" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                <text x="130" y="250" textAnchor="middle" fill="#94a3b8" fontSize="11">Otros Clientes Futuros</text>
                <text x="130" y="270" textAnchor="middle" fill="#64748b" fontSize="10">GraphQL / CLI / Kafka Event</text>

                {/* Flecha hacia adentro */}
                <path d="M 240 162 L 300 162" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="270" y="152" textAnchor="middle" fill="#38bdf8" fontSize="10">Invoca</text>

                {/* Hexágono Central */}
                <rect x="300" y="40" width="320" height="300" rx="12" fill="rgba(109, 40, 217, 0.15)" stroke="#a855f7" strokeWidth="2.5" />
                <text x="460" y="75" textAnchor="middle" fill="#a855f7" fontSize="14" fontWeight="bold">NÚCLEO HEXAGONAL (DOMINIO)</text>
                <text x="460" y="95" textAnchor="middle" fill="#c084fc" fontSize="10">Totalmente libre de Spring, JPA y HTTP</text>

                {/* In Port */}
                <rect x="315" y="120" width="130" height="75" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                <text x="380" y="145" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">Puerto Entrada</text>
                <text x="380" y="165" textAnchor="middle" fill="#a5b4fc" fontSize="9">&lt;&lt;interface&gt;&gt;</text>
                <text x="380" y="180" textAnchor="middle" fill="#e0e7ff" fontSize="9">{isTaskManager ? 'CreateTaskUseCase' : 'CreateLoanUseCase'}</text>

                {/* Core Dominio */}
                <rect x="380" y="215" width="160" height="80" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="460" y="240" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Dominio Puro (POJO)</text>
                <text x="460" y="260" textAnchor="middle" fill="#a7f3d0" fontSize="10">{isTaskManager ? 'Task.java' : 'Loan.java & Book.java'}</text>
                <text x="460" y="278" textAnchor="middle" fill="#6ee7b7" fontSize="9">Reglas de Negocio Puras</text>

                {/* Out Port */}
                <rect x="475" y="120" width="130" height="75" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
                <text x="540" y="145" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">Puerto Salida</text>
                <text x="540" y="165" textAnchor="middle" fill="#a5b4fc" fontSize="9">&lt;&lt;interface&gt;&gt;</text>
                <text x="540" y="180" textAnchor="middle" fill="#e0e7ff" fontSize="9">{isTaskManager ? 'TaskRepositoryPort' : 'LoanRepositoryPort'}</text>

                {/* Flecha hacia afuera */}
                <path d="M 620 162 L 680 162" stroke="#a855f7" strokeWidth="2.5" />
                <text x="650" y="152" textAnchor="middle" fill="#a855f7" fontSize="10">Implementa</text>

                {/* Adaptadores Secundarios */}
                <rect x="680" y="40" width="220" height="300" rx="10" fill="rgba(30, 41, 59, 0.7)" stroke="#a855f7" strokeWidth="2" />
                <text x="790" y="75" textAnchor="middle" fill="#a855f7" fontSize="13" fontWeight="bold">ADAPTADORES SECUNDARIOS</text>
                <text x="790" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10">(Driven / Conducido)</text>

                <rect x="695" y="120" width="190" height="85" rx="6" fill="#1e293b" stroke="#7c3aed" strokeWidth="1.5" />
                <text x="790" y="145" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">{isTaskManager ? 'TaskJpaAdapter' : 'LoanJpaAdapter'}</text>
                <text x="790" y="165" textAnchor="middle" fill="#a855f7" fontSize="10">Spring Data JPA / Hibernate</text>
                <text x="790" y="185" textAnchor="middle" fill="#64748b" fontSize="9">Mapea entidades a BD</text>

                <rect x="695" y="225" width="190" height="70" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                <text x="790" y="250" textAnchor="middle" fill="#94a3b8" fontSize="11">Otros Repositorios Futuros</text>
                <text x="790" y="270" textAnchor="middle" fill="#64748b" fontSize="10">MongoDB / S3 / Notificaciones</text>
              </svg>
            </div>
          </div>

          {/* VISTA A ANCHO COMPLETO: PIEZAS HEXAGONALES */}
          <div style={{ width: '100%', minWidth: 0 }}>
            {/* SELECTOR HORIZONTAL DE PIEZAS HEXAGONALES */}
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
              {hexPieces.map((p, idx) => {
                const isSelected = selectedHexIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedHexIndex(idx)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #6d28d9' : '1px solid #e2e8f0',
                      background: isSelected ? '#6d28d9' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#334155',
                      fontWeight: isSelected ? 700 : 500,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontWeight: 800 }}>⬡ {p.nombre}</span>
                    <span style={{ opacity: 0.7, fontSize: '0.74rem' }}>({p.tipo})</span>
                  </button>
                );
              })}
            </div>

            <div style={{ minWidth: 0 }}>
              {/* TARJETA DETALLADA DE LA PIEZA HEXAGONAL */}
              {currentHexPiece && (
                <article className="challenge-display-card" style={{ borderLeft: '5px solid #6d28d9' }}>
                  <div className="challenge-card-header">
                    <div>
                      <span className="studio-badge studio-badge-purple" style={{ marginBottom: '0.35rem' }}>
                        {currentHexPiece.tipo}
                      </span>
                      <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>
                        {currentHexPiece.nombre}
                      </h3>
                      <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.88rem', color: '#6d28d9', fontFamily: 'monospace' }}>
                        {currentHexPiece.paquete}
                      </p>
                    </div>
                    <span className="studio-badge">
                      Pieza {selectedHexIndex + 1} de {hexPieces.length}
                    </span>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '1.1rem', borderRadius: '8px', borderLeft: '4px solid #6d28d9', border: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#6d28d9', display: 'block', marginBottom: '0.35rem', fontSize: '0.92rem' }}>
                      Propósito y Responsabilidad en el Hexágono:
                    </strong>
                    <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                      {currentHexPiece.detalle}
                    </p>
                  </div>

                  {currentHexPiece.claveDefensa && (
                    <div style={{ background: 'rgba(109, 40, 217, 0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #8b5cf6', border: '1px solid rgba(109, 40, 217, 0.15)' }}>
                      <strong style={{ color: '#6d28d9', display: 'block', marginBottom: '0.2rem', fontSize: '0.9rem' }}>
                        Justificación Arquitectónica:
                      </strong>
                      <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.55 }}>
                        {currentHexPiece.claveDefensa}
                      </p>
                    </div>
                  )}

                  {currentHexPiece.codigo && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <h5 style={{ margin: '0.8rem 0 0.4rem 0', color: '#334155', fontSize: '0.88rem', fontWeight: 700 }}>
                        Código de la Pieza
                      </h5>
                      <StudioCodeBlock code={currentHexPiece.codigo} filename={`${currentHexPiece.nombre.split(' ')[0]}.java`} />
                    </div>
                  )}
                </article>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL LIGHTBOX PARA INFOGRAFÍA EN ALTA RESOLUCIÓN CON FONDO BLANCO Y TECLAS */}
      {modalState && (
        <StudioDiagramModal
          diagrams={modalState.list}
          currentIndex={modalState.index}
          onClose={() => setModalState(null)}
          onPrev={handlePrevDiagram}
          onNext={handleNextDiagram}
          accentColor="#6d28d9"
        />
      )}
    </div>
  );
}
