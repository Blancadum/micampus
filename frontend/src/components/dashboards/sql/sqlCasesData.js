/**
 * sqlCasesData.js
 * Casos de Estudio Pormenorizados del Mundo Real para el Playground de MiCampus.
 * Cada caso contiene:
 * 1. Situación y contexto narrativo de negocio.
 * 2. Organización exhaustiva de las tablas (campos, tipos, descripciones, PK/FK).
 * 3. Mapa de relaciones (cardinalidad y explicación didáctica).
 * 4. Datos de prueba realistas en memoria.
 * 5. Espacio de retos de negocio con pistas, soluciones canónicas y ejecutor SQL.
 */

export const REAL_WORLD_CASES = [
  {
    id: 'case-techstore',
    name: 'TechStore',
    industry: 'E-Commerce & Logística de Envíos',
    icon: '🛒',
    accentColor: '#1a5490',
    summary: 'Plataforma de comercio electrónico de tecnología que gestiona clientes, catálogo de productos y ciclo de vida de pedidos.',
    situation: `TechStore es una tienda online de electrónica e informática con almacén central en Madrid. El departamento de operaciones, el equipo financiero y el área de marketing necesitan consultar diariamente la base de datos para responder a preguntas críticas de negocio: controlar roturas de stock antes de que se agoten los artículos, facturar pedidos entregados por ciudad, recompensar a compradores VIP y recuperar a clientes que crearon una cuenta pero nunca llegaron a comprar.`,
    
    // 2. Organización de las Tablas
    tables: [
      {
        name: 'clientes',
        label: 'Clientes Registrados',
        icon: '👥',
        description: 'Almacena la información de los usuarios registrados en la tienda y su estatus de fidelización.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', desc: 'Identificador único e irrepetible del cliente.' },
          { name: 'nombre', type: 'VARCHAR(100)', key: '', desc: 'Nombre y apellidos del usuario.' },
          { name: 'email', type: 'VARCHAR(120)', key: 'UNIQUE', desc: 'Correo electrónico único para facturas y login.' },
          { name: 'ciudad', type: 'VARCHAR(60)', key: '', desc: 'Ciudad de destino habitual para los envíos.' },
          { name: 'nivel', type: 'VARCHAR(20)', key: '', desc: 'Segmento del cliente: \'Estándar\' o \'VIP\'.' },
          { name: 'saldo_puntos', type: 'INT', key: '', desc: 'Puntos de fidelidad acumulados canjeables por descuentos.' }
        ],
        sampleData: [
          { id: 1, nombre: 'Lucía Méndez', email: 'lucia.mendez@techstore.es', ciudad: 'Madrid', nivel: 'VIP', saldo_puntos: 450 },
          { id: 2, nombre: 'Javier Navarro', email: 'j.navarro@techstore.es', ciudad: 'Barcelona', nivel: 'Estándar', saldo_puntos: 120 },
          { id: 3, nombre: 'Carmen Ortiz', email: 'carmen.ortiz@techstore.es', ciudad: 'Valencia', nivel: 'VIP', saldo_puntos: 890 },
          { id: 4, nombre: 'Marcos Alonso', email: 'm.alonso@techstore.es', ciudad: 'Madrid', nivel: 'Estándar', saldo_puntos: 50 },
          { id: 5, nombre: 'Patricia Gil', email: 'patricia.gil@techstore.es', ciudad: 'Sevilla', nivel: 'VIP', saldo_puntos: 620 },
          { id: 6, nombre: 'David Serrano', email: 'd.serrano@techstore.es', ciudad: 'Bilbao', nivel: 'Estándar', saldo_puntos: 0 },
          { id: 7, nombre: 'Elena Vega', email: 'elena.vega@techstore.es', ciudad: 'Barcelona', nivel: 'Estándar', saldo_puntos: 95 },
          { id: 8, nombre: 'Raúl Morales', email: 'raul.m@techstore.es', ciudad: 'Madrid', nivel: 'Estándar', saldo_puntos: 0 }
        ]
      },
      {
        name: 'productos',
        label: 'Catálogo de Productos',
        icon: '📦',
        description: 'Inventario físico de artículos tecnológicos con precios de venta y control de existencias en almacén.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', desc: 'Código de producto único (SKU).' },
          { name: 'nombre', type: 'VARCHAR(120)', key: '', desc: 'Nombre comercial del dispositivo.' },
          { name: 'categoria', type: 'VARCHAR(50)', key: '', desc: 'Familia (Portátiles, Monitores, Audio, Accesorios, Móviles).' },
          { name: 'precio', type: 'DECIMAL(10,2)', key: '', desc: 'Precio de venta al público en euros.' },
          { name: 'stock', type: 'INT', key: '', desc: 'Unidades reales disponibles en la estantería del almacén.' },
          { name: 'proveedor', type: 'VARCHAR(80)', key: '', desc: 'Marca fabricante o distribuidor oficial.' }
        ],
        sampleData: [
          { id: 101, nombre: 'Portátil ThinkPad Pro 16"', categoria: 'Portátiles', precio: 1249.99, stock: 8, proveedor: 'Lenovo' },
          { id: 102, nombre: 'Monitor Curvo 34" UltraWide 144Hz', categoria: 'Monitores', precio: 459.50, stock: 15, proveedor: 'LG' },
          { id: 103, nombre: 'Teclado Mecánico RGB Switch Red', categoria: 'Accesorios', precio: 89.90, stock: 45, proveedor: 'Corsair' },
          { id: 104, nombre: 'Ratón Ergonómico Inalámbrico', categoria: 'Accesorios', precio: 49.95, stock: 60, proveedor: 'Logitech' },
          { id: 105, nombre: 'Auriculares Cancelación Ruido ANC', categoria: 'Audio', precio: 199.00, stock: 6, proveedor: 'Sony' },
          { id: 106, nombre: 'Smartphone Galaxy Pro 256GB', categoria: 'Móviles', precio: 899.00, stock: 12, proveedor: 'Samsung' },
          { id: 107, nombre: 'Disco SSD NVMe 2TB PCIe 4.0', categoria: 'Componentes', precio: 139.99, stock: 25, proveedor: 'Crucial' },
          { id: 108, nombre: 'Webcam 4K con Micrófono Estéreo', categoria: 'Accesorios', precio: 119.50, stock: 4, proveedor: 'Elgato' }
        ]
      },
      {
        name: 'pedidos',
        label: 'Historial de Pedidos',
        icon: '📑',
        description: 'Registros de compras tramitadas, con estados de entrega y pasarelas de pago.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', desc: 'Número de factura único.' },
          { name: 'cliente_id', type: 'INT', key: 'FK', desc: 'Referencia al comprador (FOREIGN KEY -> clientes.id).' },
          { name: 'fecha', type: 'DATE', key: '', desc: 'Día en que se formalizó la compra.' },
          { name: 'total', type: 'DECIMAL(10,2)', key: '', desc: 'Importe cobrado en euros.' },
          { name: 'estado', type: 'VARCHAR(30)', key: '', desc: 'Estado: \'Entregado\', \'En tránsito\', \'Cancelado\', \'Pendiente\'.' },
          { name: 'metodo_pago', type: 'VARCHAR(40)', key: '', desc: 'Pasarela: \'Tarjeta\', \'Bizum\', \'PayPal\', \'Transferencia\'.' }
        ],
        sampleData: [
          { id: 1001, cliente_id: 1, fecha: '2025-05-01', total: 1339.89, estado: 'Entregado', metodo_pago: 'Tarjeta' },
          { id: 1002, cliente_id: 2, fecha: '2025-05-03', total: 459.50, estado: 'Entregado', metodo_pago: 'PayPal' },
          { id: 1003, cliente_id: 3, fecha: '2025-05-04', total: 1098.00, estado: 'Entregado', metodo_pago: 'Bizum' },
          { id: 1004, cliente_id: 1, fecha: '2025-05-07', total: 89.90, estado: 'Entregado', metodo_pago: 'Tarjeta' },
          { id: 1005, cliente_id: 4, fecha: '2025-05-08', total: 49.95, estado: 'Cancelado', metodo_pago: 'Tarjeta' },
          { id: 1006, cliente_id: 5, fecha: '2025-05-10', total: 1448.99, estado: 'En tránsito', metodo_pago: 'Transferencia' },
          { id: 1007, cliente_id: 3, fecha: '2025-05-12', total: 139.99, estado: 'En tránsito', metodo_pago: 'Bizum' },
          { id: 1008, cliente_id: 7, fecha: '2025-05-14', total: 119.50, estado: 'Pendiente', metodo_pago: 'Tarjeta' },
          { id: 1009, cliente_id: 6, fecha: '2025-05-15', total: 899.00, estado: 'Entregado', metodo_pago: 'Tarjeta' },
          { id: 1010, cliente_id: 5, fecha: '2025-05-16', total: 199.00, estado: 'Entregado', metodo_pago: 'Bizum' }
        ]
      }
    ],

    // 3. Cómo se relacionan entre sí
    relationships: [
      {
        parent: 'clientes',
        child: 'pedidos',
        foreignKey: 'cliente_id',
        referenceKey: 'id',
        cardinality: '1 : N (Uno a Muchos)',
        rule: 'Un cliente registrado puede realizar de 0 a N pedidos a lo largo del tiempo. Sin embargo, cada pedido pertenece única y exclusivamente a un solo cliente.',
        practicalImplication: 'Si un cliente nunca ha comprado (como Raúl Morales), su ID no aparece en pedidos. Para encontrarlo en SQL se utiliza un LEFT JOIN filtrando con WHERE pedidos.id IS NULL.'
      }
    ],

    // 4. Retos Guiados de Práctica
    challenges: [
      {
        id: 'tech-c1',
        title: 'Alerta Urgente de Rotura de Stock',
        badge: 'Logística',
        problem: 'El jefe de almacén necesita contactar urgentemente a los proveedores de aquellos productos que tengan un stock crítico menor a 10 unidades, ordenados de menor a mayor cantidad.',
        hint: 'Filtra la tabla productos con WHERE stock < 10 y ordénalos con ORDER BY stock ASC.',
        initialSql: `SELECT id, nombre, categoria, precio, stock, proveedor
FROM productos
WHERE stock < 10
ORDER BY stock ASC;`,
        explanation: 'WHERE descarta en el paso 2 del motor los productos con existencias suficientes. ORDER BY ASC sitúa en el primer lugar el artículo más urgente (Webcam 4K con 4 unidades).'
      },
      {
        id: 'tech-c2',
        title: 'Facturación Real por Ciudad (Pedidos Entregados)',
        badge: 'Finanzas',
        problem: 'Calcula el número total de pedidos y la facturación acumulada (suma total) agrupada por ciudad del cliente, pero únicamente para pedidos que hayan sido efectivamente entregados.',
        hint: 'Une pedidos con clientes mediante INNER JOIN, filtra con WHERE pedidos.estado = \'Entregado\', agrupa con GROUP BY clientes.ciudad y suma con SUM(pedidos.total).',
        initialSql: `SELECT c.ciudad,
       COUNT(p.id) AS total_pedidos,
       ROUND(SUM(p.total), 2) AS facturacion_total
FROM pedidos p
INNER JOIN clientes c ON p.cliente_id = c.id
WHERE p.estado = 'Entregado'
GROUP BY c.ciudad
ORDER BY facturacion_total DESC;`,
        explanation: 'El INNER JOIN descarta pedidos huérfanos. WHERE p.estado = \'Entregado\' elimina cancelados y en tránsito antes de que el GROUP BY cree los montones por ciudad.'
      },
      {
        id: 'tech-c3',
        title: 'Detectar Clientes sin Ninguna Compra (Leads Fríos)',
        badge: 'Marketing',
        problem: 'Localiza a los usuarios registrados en TechStore que todavía no han realizado ningún pedido para enviarles una campaña con cupón de descuento.',
        hint: 'Usa LEFT JOIN desde clientes hacia pedidos y quédate con los nulos usando WHERE pedidos.id IS NULL.',
        initialSql: `SELECT c.id, c.nombre, c.email, c.ciudad, c.nivel
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
WHERE p.id IS NULL;`,
        explanation: 'El LEFT JOIN preserva a todos los clientes. Si un cliente no tiene compras, las columnas de pedidos se rellenan con NULL. Al aplicar WHERE p.id IS NULL aislamos a los usuarios sin pedidos.'
      },
      {
        id: 'tech-c4',
        title: 'Podio VIP: Los 3 Clientes con Mayor Gasto Acumulado',
        badge: 'Dirección',
        problem: 'Obtén el nombre, correo y gasto total de los 3 mejores clientes de la tienda, excluyendo compras canceladas.',
        hint: 'Agrupa por cliente con GROUP BY c.id, calcula SUM(p.total), ordena de mayor a menor y limita con LIMIT 3.',
        initialSql: `SELECT c.nombre, c.email, c.nivel,
       ROUND(SUM(p.total), 2) AS gasto_acumulado
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
WHERE p.estado != 'Cancelado'
GROUP BY c.id, c.nombre, c.email, c.nivel
ORDER BY gasto_acumulado DESC
LIMIT 3;`,
        explanation: 'SUM(p.total) colapsa todas las compras del cliente en una sola cifra. ORDER BY DESC y LIMIT 3 devuelven exactamente a los tres clientes más valiosos.'
      }
    ]
  },

  {
    id: 'case-medicare',
    name: 'MediCare',
    industry: 'Salud, Citas Médicas & Gestión Hospitalaria',
    icon: '🏥',
    accentColor: '#0891b2',
    summary: 'Sistema integral de gestión de un policlínico privado con doctores especialistas, pacientes e historial de citas médicas.',
    situation: `MediCare es un centro médico privado con facultativos en distintas especialidades (Cardiología, Traumatología, Dermatología y Pediatría). La dirección médica necesita controlar las agendas de los doctores, calcular los honorarios devengados por consulta, monitorizar los tiempos de espera y detectar qué pacientes cancelan o no asisten a sus citas para optimizar el calendario de los despachos.`,
    
    // 2. Organización de las Tablas
    tables: [
      {
        name: 'medicos',
        label: 'Cuadro Médico',
        icon: '👨‍⚕️',
        description: 'Doctores colegiados con su especialidad médica asignada y tarifa por consulta.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', desc: 'Número de colegiado y clave primaria del doctor.' },
          { name: 'nombre', type: 'VARCHAR(100)', key: '', desc: 'Nombre y apellidos del facultativo.' },
          { name: 'especialidad', type: 'VARCHAR(60)', key: '', desc: 'Especialidad: Cardiología, Dermatología, etc.' },
          { name: 'despacho', type: 'INT', key: '', desc: 'Número de consulta física en el edificio.' },
          { name: 'honorario_consulta', type: 'DECIMAL(8,2)', key: '', desc: 'Tarifa en euros cobrada por acto médico.' }
        ],
        sampleData: [
          { id: 1, nombre: 'Dra. Sofía Ramos', especialidad: 'Cardiología', despacho: 101, honorario_consulta: 95.00 },
          { id: 2, nombre: 'Dr. Alejandro Marín', especialidad: 'Dermatología', despacho: 102, honorario_consulta: 80.00 },
          { id: 3, nombre: 'Dra. Beatriz Santos', especialidad: 'Pediatría', despacho: 103, honorario_consulta: 75.00 },
          { id: 4, nombre: 'Dr. Manuel Cordero', especialidad: 'Traumatología', despacho: 104, honorario_consulta: 110.00 },
          { id: 5, nombre: 'Dr. Julián Prieto', especialidad: 'Cardiología', despacho: 105, honorario_consulta: 95.00 }
        ]
      },
      {
        name: 'pacientes',
        label: 'Expediente de Pacientes',
        icon: '🧑‍🤝‍🧑',
        description: 'Información demográfica y aseguradora médica de los usuarios de la clínica.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', desc: 'Número de historia clínica del paciente.' },
          { name: 'nombre', type: 'VARCHAR(100)', key: '', desc: 'Nombre del paciente.' },
          { name: 'edad', type: 'INT', key: '', desc: 'Edad en años.' },
          { name: 'telefono', type: 'VARCHAR(20)', key: '', desc: 'Teléfono de contacto.' },
          { name: 'seguro', type: 'VARCHAR(50)', key: '', desc: 'Aseguradora privada (\'Sanitas\', \'Adeslas\', \'Sin seguro\').' }
        ],
        sampleData: [
          { id: 101, nombre: 'Gonzalo Vidal', edad: 48, telefono: '611223344', seguro: 'Sanitas' },
          { id: 102, nombre: 'Marta Soler', edad: 34, telefono: '622334455', seguro: 'Adeslas' },
          { id: 103, nombre: 'Nicolás Ibáñez', edad: 11, telefono: '633445566', seguro: 'Mapfre' },
          { id: 104, nombre: 'Sara Pineda', edad: 62, telefono: '644556677', seguro: 'Sin seguro' },
          { id: 105, nombre: 'Carlos Duque', edad: 29, telefono: '655667788', seguro: 'Sanitas' },
          { id: 106, nombre: 'Isabel Herrero', edad: 55, telefono: '666778899', seguro: 'Adeslas' }
        ]
      },
      {
        name: 'citas',
        label: 'Agenda de Citas Médicas',
        icon: '📅',
        description: 'Tabla intermedia de citas que conecta a médicos con pacientes.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', desc: 'Identificador único de la cita en agenda.' },
          { name: 'medico_id', type: 'INT', key: 'FK', desc: 'Doctor asignado (FOREIGN KEY -> medicos.id).' },
          { name: 'paciente_id', type: 'INT', key: 'FK', desc: 'Paciente citado (FOREIGN KEY -> pacientes.id).' },
          { name: 'fecha', type: 'DATE', key: '', desc: 'Día de la consulta médica.' },
          { name: 'motivo', type: 'VARCHAR(100)', key: '', desc: 'Razón de consulta (Revisión, Dolor agudo, etc.).' },
          { name: 'estado', type: 'VARCHAR(30)', key: '', desc: 'Estado: \'Completada\', \'Programada\', \'Cancelada\', \'No asistió\'.' }
        ],
        sampleData: [
          { id: 501, medico_id: 1, paciente_id: 101, fecha: '2025-06-01', motivo: 'Revisión tensión y ECG', estado: 'Completada' },
          { id: 502, medico_id: 2, paciente_id: 102, fecha: '2025-06-01', motivo: 'Revisión lunar en espalda', estado: 'Completada' },
          { id: 503, medico_id: 3, paciente_id: 103, fecha: '2025-06-02', motivo: 'Vacunación infantil', estado: 'Completada' },
          { id: 504, medico_id: 4, paciente_id: 104, fecha: '2025-06-02', motivo: 'Dolor en rodilla derecha', estado: 'Cancelada' },
          { id: 505, medico_id: 1, paciente_id: 105, fecha: '2025-06-03', motivo: 'Arritmias esporádicas', estado: 'Completada' },
          { id: 506, medico_id: 2, paciente_id: 106, fecha: '2025-06-03', motivo: 'Eccema cutáneo', estado: 'Completada' },
          { id: 507, medico_id: 4, paciente_id: 101, fecha: '2025-06-04', motivo: 'Esguince de tobillo', estado: 'Completada' },
          { id: 508, medico_id: 5, paciente_id: 104, fecha: '2025-06-04', motivo: 'Segunda opinión cardíaca', estado: 'No asistió' },
          { id: 509, medico_id: 3, paciente_id: 103, fecha: '2025-06-05', motivo: 'Control pediátrico semestral', estado: 'Programada' }
        ]
      }
    ],

    // 3. Cómo se relacionan entre sí
    relationships: [
      {
        parent: 'medicos',
        child: 'citas',
        foreignKey: 'medico_id',
        referenceKey: 'id',
        cardinality: '1 : N',
        rule: 'Un médico puede atender múltiples citas, pero cada cita médica es conducida por un solo doctor responsable.',
        practicalImplication: 'Permite calcular cuántas consultas ha completado cada doctor y qué recaudación ha generado su despacho.'
      },
      {
        parent: 'pacientes',
        child: 'citas',
        foreignKey: 'paciente_id',
        referenceKey: 'id',
        cardinality: '1 : N',
        rule: 'Un paciente puede pedir múltiples citas a lo largo del año con distintos especialistas médicos.',
        practicalImplication: 'La tabla \'citas\' actúa como puente de una relación N:M entre médicos y pacientes, almacenando el motivo, la fecha y el estado de la visita.'
      }
    ],

    challenges: [
      {
        id: 'med-c1',
        title: 'Citas de Pacientes en la Especialidad de Cardiología',
        badge: 'Consultas',
        problem: 'Obtén el nombre del paciente, el médico que le atiende, la fecha y el motivo para todas las citas pertenecientes al servicio de Cardiología.',
        hint: 'Une citas con pacientes y médicos usando INNER JOIN y filtra por m.especialidad = \'Cardiología\'.',
        initialSql: `SELECT p.nombre AS paciente, m.nombre AS medico, c.fecha, c.motivo, c.estado
FROM citas c
INNER JOIN medicos m ON c.medico_id = m.id
INNER JOIN pacientes p ON c.paciente_id = p.id
WHERE m.especialidad = 'Cardiología'
ORDER BY c.fecha ASC;`,
        explanation: 'El doble INNER JOIN cruza las tres tablas del modelo ER a través de las dos claves foráneas de la tabla intermedia citas.'
      },
      {
        id: 'med-c2',
        title: 'Facturación de Honorarios por Médico en Consultas Completadas',
        badge: 'Finanzas',
        problem: 'Calcula el número de citas completadas y el total de honorarios generados por cada doctor, ordenados de mayor a menor recaudación.',
        hint: 'Agrupa por médico y suma los honorarios multiplicados por las citas completadas con SUM(m.honorario_consulta).',
        initialSql: `SELECT m.nombre AS medico, m.especialidad,
       COUNT(c.id) AS citas_atendidas,
       ROUND(SUM(m.honorario_consulta), 2) AS total_honorarios
FROM medicos m
INNER JOIN citas c ON m.id = c.medico_id
WHERE c.estado = 'Completada'
GROUP BY m.id, m.nombre, m.especialidad
ORDER BY total_honorarios DESC;`,
        explanation: 'Filtramos con WHERE c.estado = \'Completada\' para no cobrar citas canceladas ni inasistencias, y calculamos el volumen total devengado con SUM.'
      },
      {
        id: 'med-c3',
        title: 'Detección de Inasistencias y Cancelaciones',
        badge: 'Gestión',
        problem: 'Encuentra las citas que fueron canceladas o en las que el paciente no asistió, mostrando los datos de contacto del paciente para reprogramar.',
        hint: 'Filtra por c.estado IN (\'Cancelada\', \'No asistió\') uniendo con la tabla pacientes.',
        initialSql: `SELECT c.id AS cita_num, p.nombre AS paciente, p.telefono, m.nombre AS doctor, c.fecha, c.estado
FROM citas c
INNER JOIN pacientes p ON c.paciente_id = p.id
INNER JOIN medicos m ON c.medico_id = m.id
WHERE c.estado IN ('Cancelada', 'No asistió');`,
        explanation: 'La cláusula IN (\'Cancelada\', \'No asistió\') filtra eficientemente estados anómalos para el servicio de atención telefónica del hospital.'
      }
    ]
  },

  {
    id: 'case-educampus',
    name: 'EduCampus',
    industry: 'Universidad, Grados Informáticos & Calificaciones',
    icon: '🎓',
    accentColor: '#16a34a',
    summary: 'Gestión académica de titulaciones de desarrollo de software (DAM, DAW, ASIR) con matrículas, cursos y actas de notas.',
    situation: `EduCampus coordina los estudios de ciclo superior en informática. La secretaría académica y el claustro docente necesitan evaluar el rendimiento de los alumnos en asignaturas de programación y bases de datos, calcular medias por titulación, detectar cursos huérfanos sin alumnos y premiar a los alumnos con mejores expedientes para becas de excelencia.`,

    tables: [
      {
        name: 'profesores',
        label: 'Claustro Docente',
        icon: '👨‍🏫',
        description: 'Docentes titulares asignados a los módulos formativos.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', desc: 'Identificador del profesor.' },
          { name: 'nombre', type: 'VARCHAR(100)', key: '', desc: 'Nombre y apellidos.' },
          { name: 'depto', type: 'VARCHAR(60)', key: '', desc: 'Departamento académico.' },
          { name: 'salario', type: 'DECIMAL(10,2)', key: '', desc: 'Sueldo mensual en euros.' }
        ],
        sampleData: [
          { id: 1, nombre: 'Dr. Fernando Ruiz', depto: 'Informática', salario: 2750.00 },
          { id: 2, nombre: 'Dra. Carmen Delgado', depto: 'Sistemas', salario: 2950.00 },
          { id: 3, nombre: 'Prof. Alberto Blanco', depto: 'Informática', salario: 2400.00 },
          { id: 4, nombre: 'Dra. Laura Ortega', depto: 'Bases de Datos', salario: 3100.00 }
        ]
      },
      {
        name: 'cursos',
        label: 'Catálogo de Asignaturas',
        icon: '📚',
        description: 'Módulos oficiales que componen las titulaciones de DAM y DAW.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', desc: 'Código de asignatura.' },
          { name: 'nombre', type: 'VARCHAR(100)', key: '', desc: 'Título de la materia.' },
          { name: 'profesor_id', type: 'INT', key: 'FK', desc: 'Profesor titular (FOREIGN KEY -> profesores.id).' },
          { name: 'horas', type: 'INT', key: '', desc: 'Carga lectiva en horas.' },
          { name: 'creditos', type: 'INT', key: '', desc: 'Créditos ECTS del módulo.' }
        ],
        sampleData: [
          { id: 101, nombre: 'Bases de Datos Relacionales (SQL)', profesor_id: 4, horas: 120, creditos: 8 },
          { id: 102, nombre: 'Programación en Java', profesor_id: 1, horas: 160, creditos: 10 },
          { id: 103, nombre: 'Desarrollo Web en PHP', profesor_id: 3, horas: 100, creditos: 6 },
          { id: 104, nombre: 'Despliegue y Cloud', profesor_id: 2, horas: 80, creditos: 5 },
          { id: 105, nombre: 'Seguridad en Redes', profesor_id: 2, horas: 90, creditos: 6 },
          { id: 106, nombre: 'Inteligencia Artificial con Spring AI', profesor_id: 1, horas: 60, creditos: 4 }
        ]
      },
      {
        name: 'estudiantes',
        label: 'Censo de Estudiantes',
        icon: '🎒',
        description: 'Alumnos matriculados en las distintas ramas formativas.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', desc: 'Número de expediente estudiantil.' },
          { name: 'nombre', type: 'VARCHAR(100)', key: '', desc: 'Nombre del alumno.' },
          { name: 'carrera', type: 'VARCHAR(20)', key: '', desc: 'Titulación: DAM, DAW, ASIR.' },
          { name: 'nota_media', type: 'DECIMAL(4,2)', key: '', desc: 'Calificación media global.' }
        ],
        sampleData: [
          { id: 1, nombre: 'Juan García', carrera: 'DAM', nota_media: 8.5 },
          { id: 2, nombre: 'María López', carrera: 'DAW', nota_media: 9.4 },
          { id: 3, nombre: 'Pedro González', carrera: 'DAM', nota_media: 6.8 },
          { id: 4, nombre: 'Elena Morales', carrera: 'DAW', nota_media: 9.8 },
          { id: 5, nombre: 'Carlos Sanz', carrera: 'DAM', nota_media: 7.2 },
          { id: 6, nombre: 'Lucía Fernández', carrera: 'DAW', nota_media: 8.9 },
          { id: 7, nombre: 'Alejandro Ramos', carrera: 'ASIR', nota_media: 7.7 },
          { id: 8, nombre: 'Sofía Castro', carrera: 'ASIR', nota_media: 8.1 }
        ]
      },
      {
        name: 'matriculas',
        label: 'Actas de Calificaciones',
        icon: '📝',
        description: 'Tabla intermedia que conecta estudiantes con cursos y guarda la nota final.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', desc: 'Número de acta de examen.' },
          { name: 'estudiante_id', type: 'INT', key: 'FK', desc: 'FOREIGN KEY -> estudiantes.id.' },
          { name: 'curso_id', type: 'INT', key: 'FK', desc: 'FOREIGN KEY -> cursos.id.' },
          { name: 'nota_final', type: 'DECIMAL(4,2)', key: '', desc: 'Calificación obtenida de 0 a 10.' },
          { name: 'estado', type: 'VARCHAR(30)', key: '', desc: '\'Sobresaliente\', \'Notable\', \'Aprobado\', \'Suspenso\'.' }
        ],
        sampleData: [
          { id: 1, estudiante_id: 1, curso_id: 101, nota_final: 9.0, estado: 'Sobresaliente' },
          { id: 2, estudiante_id: 1, curso_id: 102, nota_final: 8.0, estado: 'Notable' },
          { id: 3, estudiante_id: 2, curso_id: 101, nota_final: 9.5, estado: 'Sobresaliente' },
          { id: 4, estudiante_id: 2, curso_id: 103, nota_final: 9.3, estado: 'Sobresaliente' },
          { id: 5, estudiante_id: 3, curso_id: 101, nota_final: 6.5, estado: 'Aprobado' },
          { id: 6, estudiante_id: 3, curso_id: 104, nota_final: 7.0, estado: 'Notable' },
          { id: 7, estudiante_id: 4, curso_id: 103, nota_final: 10.0, estado: 'Matricula de Honor' },
          { id: 8, estudiante_id: 4, curso_id: 106, nota_final: 9.6, estado: 'Sobresaliente' },
          { id: 9, estudiante_id: 5, curso_id: 102, nota_final: 4.5, estado: 'Suspenso' },
          { id: 10, estudiante_id: 6, curso_id: 101, nota_final: 8.8, estado: 'Notable' }
        ]
      }
    ],

    relationships: [
      {
        parent: 'profesores',
        child: 'cursos',
        foreignKey: 'profesor_id',
        referenceKey: 'id',
        cardinality: '1 : N',
        rule: 'Un profesor imparte una o varias asignaturas, pero cada asignatura tiene un docente titular.',
        practicalImplication: 'Permite saber la carga docente por profesor y qué departamentos imparten qué materias.'
      },
      {
        parent: 'estudiantes & cursos',
        child: 'matriculas',
        foreignKey: 'estudiante_id, curso_id',
        referenceKey: 'id',
        cardinality: 'N : M (Muchos a Muchos)',
        rule: 'Un estudiante cursa múltiples asignaturas y una asignatura tiene muchos estudiantes inscritos.',
        practicalImplication: 'La tabla puente \'matriculas\' descompone la relación N:M y almacena los atributos propios del acto evaluativo: la nota final y la mención honorífica.'
      }
    ],

    challenges: [
      {
        id: 'edu-c1',
        title: 'Alumnos Matriculados con Mención de Sobresaliente',
        badge: 'Evaluación',
        problem: 'Obtén el nombre del estudiante, el curso en el que está matriculado y su calificación final para todos aquellos con nota_final superior o igual a 9.0.',
        hint: 'Une estudiantes, matriculas y cursos mediante dos INNER JOINs y filtra con WHERE m.nota_final >= 9.0.',
        initialSql: `SELECT e.nombre AS estudiante, c.nombre AS curso, m.nota_final, m.estado
FROM estudiantes e
INNER JOIN matriculas m ON e.id = m.estudiante_id
INNER JOIN cursos c ON m.curso_id = c.id
WHERE m.nota_final >= 9.0
ORDER BY m.nota_final DESC;`,
        explanation: 'El cruce de 3 tablas a través de la tabla puente matriculas permite proyectar datos de ambas entidades fuertes (alumno y curso) junto con el atributo evaluativo.'
      },
      {
        id: 'edu-c2',
        title: 'Estadísticas de Rendimiento por Titulación (DAM vs DAW)',
        badge: 'Analítica',
        problem: 'Calcula el número de alumnos y la nota media general para cada carrera, ordenadas de mayor a menor rendimiento.',
        hint: 'Agrupa por carrera académica con GROUP BY carrera y usa AVG(nota_media).',
        initialSql: `SELECT carrera,
       COUNT(*) AS total_alumnos,
       ROUND(AVG(nota_media), 2) AS nota_promedio
FROM estudiantes
GROUP BY carrera
ORDER BY nota_promedio DESC;`,
        explanation: 'GROUP BY carrera divide los alumnos en grupos y calcula la agregación AVG para comparar el nivel medio de cada grado.'
      },
      {
        id: 'edu-c3',
        title: 'Cursos Huérfanos: Materias sin Alumnos Matriculados',
        badge: 'Secretaría',
        problem: 'Detecta qué asignaturas del catálogo aún no tienen ningún estudiante matriculado para informar a jefatura de estudios.',
        hint: 'Aplica un LEFT JOIN desde cursos hacia matriculas y filtra con WHERE matriculas.id IS NULL.',
        initialSql: `SELECT c.id, c.nombre AS curso, c.horas, c.creditos
FROM cursos c
LEFT JOIN matriculas m ON c.id = m.curso_id
WHERE m.id IS NULL;`,
        explanation: 'Las materias sin alumnos inscritos vendrán con NULL en los campos de la tabla derecha (matriculas), lo que permite localizarlas al instante.'
      }
    ]
  },

  {
    id: 'case-biblioteca',
    name: 'BiblioTech',
    industry: 'Biblioteca Municipal, Catálogo & Préstamos',
    icon: '📚',
    accentColor: '#8b5cf6',
    summary: 'Sistema integral de gestión bibliotecaria con catálogo de obras, registro de socios lectores y control de préstamos, plazos y retrasos.',
    situation: `La Biblioteca Central gestiona miles de títulos físicos clasificados por género literario y autoría. El mostrador de atención al lector necesita consultar la base de datos para: tramitar nuevos préstamos, controlar la disponibilidad de ejemplares, identificar a los lectores con libros fuera de plazo (con fecha de devolución vencida) para emitir recordatorios de devolución, y analizar los títulos más solicitados para adquirir nuevas copias en la próxima compra presupuestaria.`,

    tables: [
      {
        name: 'libros',
        label: 'Catálogo Bibliográfico',
        icon: '📖',
        description: 'Fondos bibliográficos disponibles en el archivo de la biblioteca.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', desc: 'Identificador único de la obra (signatura).' },
          { name: 'titulo', type: 'VARCHAR(120)', key: '', desc: 'Título completo de la obra.' },
          { name: 'autor', type: 'VARCHAR(100)', key: '', desc: 'Autor/a principal.' },
          { name: 'genero', type: 'VARCHAR(50)', key: '', desc: 'Género literario (\'Novela\', \'Ciencia Ficción\', \'Informática\', \'Historia\').' },
          { name: 'ejemplares_disponibles', type: 'INT', key: '', desc: 'Copias físicas disponibles para retirar en mostrador.' },
          { name: 'anio', type: 'INT', key: '', desc: 'Año de publicación.' }
        ],
        sampleData: [
          { id: 201, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez', genero: 'Novela', ejemplares_disponibles: 4, anio: 1967 },
          { id: 202, titulo: 'Clean Code: Manual de Estilo Ágil', autor: 'Robert C. Martin', genero: 'Informática', ejemplares_disponibles: 2, anio: 2008 },
          { id: 203, titulo: 'Dune: Crónicas de Arrakis', autor: 'Frank Herbert', genero: 'Ciencia Ficción', ejemplares_disponibles: 0, anio: 1965 },
          { id: 204, titulo: 'Diseño de Bases de Datos Relacionales', autor: 'Abraham Silberschatz', genero: 'Informática', ejemplares_disponibles: 5, anio: 2019 },
          { id: 205, titulo: 'El Nombre de la Rosa', autor: 'Umberto Eco', genero: 'Novela', ejemplares_disponibles: 3, anio: 1980 },
          { id: 206, titulo: 'Sapiens: De animales a dioses', autor: 'Yuval Noah Harari', genero: 'Ensayo', ejemplares_disponibles: 1, anio: 2014 },
          { id: 207, titulo: 'Aprende SQL en un Fin de Semana', autor: 'Antonio Padial', genero: 'Informática', ejemplares_disponibles: 6, anio: 2021 },
          { id: 208, titulo: 'Historia del Arte Clásico', autor: 'E.H. Gombrich', genero: 'Historia', ejemplares_disponibles: 3, anio: 1950 }
        ]
      },
      {
        name: 'socios',
        label: 'Censo de Lectores',
        icon: '🪪',
        description: 'Usuarios acreditados con carnet de biblioteca activo.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', desc: 'Número de carnet de biblioteca.' },
          { name: 'nombre', type: 'VARCHAR(100)', key: '', desc: 'Nombre del socio lector.' },
          { name: 'email', type: 'VARCHAR(120)', key: 'UNIQUE', desc: 'Correo electrónico para avisos de devolución.' },
          { name: 'telefono', type: 'VARCHAR(20)', key: '', desc: 'Teléfono de contacto.' },
          { name: 'tipo_socio', type: 'VARCHAR(30)', key: '', desc: '\'General\', \'Estudiante\', \'Investigador\'.' },
          { name: 'sancionado', type: 'VARCHAR(20)', key: '', desc: '\'No\' o \'Sí (Por retraso)\'.' }
        ],
        sampleData: [
          { id: 1, nombre: 'Ana Beltrán', email: 'ana.beltran@gmail.com', telefono: '677112233', tipo_socio: 'Estudiante', sancionado: 'No' },
          { id: 2, nombre: 'Carlos Mendoza', email: 'carlos.m@yahoo.es', telefono: '688223344', tipo_socio: 'General', sancionado: 'Sí (Por retraso)' },
          { id: 3, nombre: 'Mireia Puig', email: 'mireia.p@outlook.com', telefono: '699334455', tipo_socio: 'Investigador', sancionado: 'No' },
          { id: 4, nombre: 'Jorge Quintana', email: 'jorge.q@gmail.com', telefono: '600445566', tipo_socio: 'Estudiante', sancionado: 'No' },
          { id: 5, nombre: 'Laura Domínguez', email: 'laura.d@gmail.com', telefono: '611556677', tipo_socio: 'General', sancionado: 'No' },
          { id: 6, nombre: 'Roberto Vaca', email: 'roberto.v@gmail.com', telefono: '622667788', tipo_socio: 'Estudiante', sancionado: 'No' }
        ]
      },
      {
        name: 'prestamos',
        label: 'Registro de Préstamos y Devoluciones',
        icon: '📋',
        description: 'Tabla intermedia que conecta los libros prestados con los socios.',
        columns: [
          { name: 'id', type: 'INT', key: 'PK', desc: 'Número de resguardo del préstamo.' },
          { name: 'libro_id', type: 'INT', key: 'FK', desc: 'FOREIGN KEY -> libros.id.' },
          { name: 'socio_id', type: 'INT', key: 'FK', desc: 'FOREIGN KEY -> socios.id.' },
          { name: 'fecha_prestamo', type: 'DATE', key: '', desc: 'Día de retirada en mostrador.' },
          { name: 'fecha_limite', type: 'DATE', key: '', desc: 'Fecha tope pactada para la devolución.' },
          { name: 'fecha_devolucion', type: 'DATE', key: '', desc: 'Día real de devolución (o NULL si sigue prestado).' },
          { name: 'estado', type: 'VARCHAR(30)', key: '', desc: '\'Activo\', \'Devuelto\', \'Vencido con retraso\'.' }
        ],
        sampleData: [
          { id: 701, libro_id: 201, socio_id: 1, fecha_prestamo: '2025-05-10', fecha_limite: '2025-05-25', fecha_devolucion: '2025-05-23', estado: 'Devuelto' },
          { id: 702, libro_id: 202, socio_id: 2, fecha_prestamo: '2025-05-12', fecha_limite: '2025-05-27', fecha_devolucion: null, estado: 'Vencido con retraso' },
          { id: 703, libro_id: 203, socio_id: 3, fecha_prestamo: '2025-05-15', fecha_limite: '2025-05-30', fecha_devolucion: null, estado: 'Activo' },
          { id: 704, libro_id: 201, socio_id: 4, fecha_prestamo: '2025-05-16', fecha_limite: '2025-05-31', fecha_devolucion: '2025-05-29', estado: 'Devuelto' },
          { id: 705, libro_id: 204, socio_id: 1, fecha_prestamo: '2025-05-18', fecha_limite: '2025-06-02', fecha_devolucion: null, estado: 'Activo' },
          { id: 706, libro_id: 202, socio_id: 5, fecha_prestamo: '2025-05-20', fecha_limite: '2025-06-04', fecha_devolucion: '2025-06-03', estado: 'Devuelto' },
          { id: 707, libro_id: 206, socio_id: 2, fecha_prestamo: '2025-05-21', fecha_limite: '2025-06-05', fecha_devolucion: null, estado: 'Vencido con retraso' },
          { id: 708, libro_id: 201, socio_id: 3, fecha_prestamo: '2025-05-22', fecha_limite: '2025-06-06', fecha_devolucion: null, estado: 'Activo' }
        ]
      }
    ],

    relationships: [
      {
        parent: 'libros',
        child: 'prestamos',
        foreignKey: 'libro_id',
        referenceKey: 'id',
        cardinality: '1 : N',
        rule: 'Un mismo libro puede ser prestado muchas veces a distintos lectores a lo largo de los meses.',
        practicalImplication: 'Permite calcular estadísticas de demanda con COUNT(prestamos.id) GROUP BY libro_id y detectar libros que nunca han sido prestados con un LEFT JOIN.'
      },
      {
        parent: 'socios',
        child: 'prestamos',
        foreignKey: 'socio_id',
        referenceKey: 'id',
        cardinality: '1 : N',
        rule: 'Un socio lector puede acumular múltiples préstamos activos o históricos.',
        practicalImplication: 'Permite consultar cuántos libros tiene un lector en su casa y si tiene alguno fuera de plazo mediante WHERE fecha_devolucion IS NULL AND estado = \'Vencido con retraso\'.'
      },
      {
        parent: 'libros & socios',
        child: 'prestamos',
        foreignKey: 'libro_id, socio_id',
        referenceKey: 'id',
        cardinality: 'N : M (Muchos a Muchos)',
        rule: 'La relación entre libros y socios es N:M y se descompone a través de la tabla intermedia \'prestamos\'.',
        practicalImplication: 'La tabla intermedia almacena los atributos de la transacción: la fecha de retirada, la fecha máxima de entrega y el estado del préstamo.'
      }
    ],

    challenges: [
      {
        id: 'bib-c1',
        title: 'Préstamos Vencidos Fuera de Plazo (Alerta de Retención)',
        badge: 'Atención al Lector',
        problem: 'El personal de biblioteca necesita avisar urgentemente por teléfono a los socios con libros fuera de plazo. Obtén el número de préstamo, el título de la obra, el nombre del socio, su teléfono y la fecha límite para todos los préstamos vencidos no devueltos.',
        hint: 'Une prestamos con libros y socios mediante dos INNER JOINs y filtra con WHERE p.fecha_devolucion IS NULL AND p.estado = \'Vencido con retraso\'.',
        initialSql: `SELECT p.id AS prestamo_num, l.titulo, s.nombre AS socio, s.telefono, p.fecha_limite, p.estado
FROM prestamos p
INNER JOIN libros l ON p.libro_id = l.id
INNER JOIN socios s ON p.socio_id = s.id
WHERE p.fecha_devolucion IS NULL AND p.estado = 'Vencido con retraso'
ORDER BY p.fecha_limite ASC;`,
        explanation: 'El doble INNER JOIN cruza las tres tablas a través de libro_id y socio_id. La condición fecha_devolucion IS NULL garantiza que solo avisamos por ejemplares que aún no han sido entregados físicamente en el mostrador.'
      },
      {
        id: 'bib-c2',
        title: 'Los Libros Más Solicitados (Top Popularidad)',
        badge: 'Adquisiciones',
        problem: 'El comité de compras necesita saber qué libros tienen mayor demanda de lectura para comprar más copias. Obtén el título, autor, género y el número total de préstamos históricos de cada libro, ordenados de mayor a menor número de préstamos.',
        hint: 'Agrupa por libro con GROUP BY l.id, calcula COUNT(p.id) y ordena con ORDER BY total_prestamos DESC.',
        initialSql: `SELECT l.titulo, l.autor, l.genero,
       COUNT(p.id) AS total_prestamos
FROM libros l
INNER JOIN prestamos p ON l.id = p.libro_id
GROUP BY l.id, l.titulo, l.autor, l.genero
ORDER BY total_prestamos DESC;`,
        explanation: 'COUNT(p.id) cuenta cuántas veces figura cada libro_id en la tabla de préstamos. Cien Años de Soledad lidera con 3 préstamos registrados.'
      },
      {
        id: 'bib-c3',
        title: 'Libros Olvidados: Obras Jamás Prestadas (Anti-JOIN)',
        badge: 'Archivo',
        problem: 'Localiza qué obras del catálogo nunca han sido solicitadas en préstamo por ningún socio de la biblioteca.',
        hint: 'Aplica un LEFT JOIN desde libros hacia prestamos y busca los nulos con WHERE p.id IS NULL.',
        initialSql: `SELECT l.id, l.titulo, l.autor, l.genero, l.ejemplares_disponibles
FROM libros l
LEFT JOIN prestamos p ON l.id = p.libro_id
WHERE p.id IS NULL;`,
        explanation: 'El LEFT JOIN preserva todos los libros. Si un libro nunca ha sido prestado, sus columnas en prestamos son NULL. Al filtrar WHERE p.id IS NULL detectamos que \'Historia del Arte Clásico\' jamás ha salido de la estantería.'
      },
      {
        id: 'bib-c4',
        title: 'Lectores Asiduos: Socios con 2 o Más Préstamos',
        badge: 'Fidelización',
        problem: 'La biblioteca quiere reconocer a los socios más activos. Encuentra los lectores que hayan retirado 2 o más libros en total.',
        hint: 'Agrupa por socio con GROUP BY s.id y filtra los grupos con HAVING COUNT(p.id) >= 2.',
        initialSql: `SELECT s.nombre, s.tipo_socio, s.email,
       COUNT(p.id) AS total_libros_leidos
FROM socios s
INNER JOIN prestamos p ON s.id = p.socio_id
GROUP BY s.id, s.nombre, s.tipo_socio, s.email
HAVING COUNT(p.id) >= 2
ORDER BY total_libros_leidos DESC;`,
        explanation: 'Como el filtro evalúa una función agregada (COUNT(p.id) >= 2), debe colocarse obligatoriamente en HAVING y no en WHERE.'
      }
    ]
  }
];

/**
 * Ejecutor en memoria multicaso para el Playground Pormenorizado.
 */
export function executeCaseSql(caseId, sql) {
  const startTime = performance.now();
  const clean = sql.trim().replace(/;$/, '').replace(/\s+/g, ' ');
  const upper = clean.toUpperCase();

  const caseObj = REAL_WORLD_CASES.find((c) => c.id === caseId) || REAL_WORLD_CASES[0];

  try {
    // 1. Detección automática de retos predefinidos por similitud
    const matchedChallenge = caseObj.challenges.find((ch) => {
      const chNorm = ch.initialSql.trim().replace(/;$/, '').replace(/\s+/g, ' ').toUpperCase();
      return chNorm === upper;
    });

    if (matchedChallenge) {
      return runChallengeExact(caseId, matchedChallenge.id, startTime);
    }

    // 2. Ejecutor dinámico según el caso
    return runDynamicCaseQuery(caseObj, clean, startTime);
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Error al ejecutar la consulta en el caso de estudio.'
    };
  }
}

function runChallengeExact(caseId, challengeId, startTime) {
  if (caseId === 'case-techstore') {
    if (challengeId === 'tech-c1') {
      const rows = [
        { id: 108, nombre: 'Webcam 4K con Micrófono Estéreo', categoria: 'Accesorios', precio: '119.50 €', stock: 4, proveedor: 'Elgato' },
        { id: 105, nombre: 'Auriculares Cancelación Ruido ANC', categoria: 'Audio', precio: '199.00 €', stock: 6, proveedor: 'Sony' },
        { id: 101, nombre: 'Portátil ThinkPad Pro 16"', categoria: 'Portátiles', precio: '1249.99 €', stock: 8, proveedor: 'Lenovo' }
      ];
      return formatResult(['id', 'nombre', 'categoria', 'precio', 'stock', 'proveedor'], rows, startTime);
    }
    if (challengeId === 'tech-c2') {
      const rows = [
        { ciudad: 'Sevilla', total_pedidos: 1, facturacion_total: '199.00 €' },
        { ciudad: 'Valencia', total_pedidos: 1, facturacion_total: '1098.00 €' },
        { ciudad: 'Madrid', total_pedidos: 2, facturacion_total: '1429.79 €' },
        { ciudad: 'Bilbao', total_pedidos: 1, facturacion_total: '899.00 €' },
        { ciudad: 'Barcelona', total_pedidos: 1, facturacion_total: '459.50 €' }
      ].sort((a, b) => parseFloat(b.facturacion_total) - parseFloat(a.facturacion_total));
      return formatResult(['ciudad', 'total_pedidos', 'facturacion_total'], rows, startTime);
    }
    if (challengeId === 'tech-c3') {
      const rows = [
        { id: 8, nombre: 'Raúl Morales', email: 'raul.m@techstore.es', ciudad: 'Madrid', nivel: 'Estándar' }
      ];
      return formatResult(['id', 'nombre', 'email', 'ciudad', 'nivel'], rows, startTime);
    }
    if (challengeId === 'tech-c4') {
      const rows = [
        { nombre: 'Patricia Gil', email: 'patricia.gil@techstore.es', nivel: 'VIP', gasto_acumulado: '1647.99 €' },
        { nombre: 'Lucía Méndez', email: 'lucia.mendez@techstore.es', nivel: 'VIP', gasto_acumulado: '1429.79 €' },
        { nombre: 'Carmen Ortiz', email: 'carmen.ortiz@techstore.es', nivel: 'VIP', gasto_acumulado: '1237.99 €' }
      ];
      return formatResult(['nombre', 'email', 'nivel', 'gasto_acumulado'], rows, startTime);
    }
  }

  if (caseId === 'case-medicare') {
    if (challengeId === 'med-c1') {
      const rows = [
        { paciente: 'Gonzalo Vidal', medico: 'Dra. Sofía Ramos', fecha: '2025-06-01', motivo: 'Revisión tensión y ECG', estado: 'Completada' },
        { paciente: 'Carlos Duque', medico: 'Dra. Sofía Ramos', fecha: '2025-06-03', motivo: 'Arritmias esporádicas', estado: 'Completada' },
        { paciente: 'Sara Pineda', medico: 'Dr. Julián Prieto', fecha: '2025-06-04', motivo: 'Segunda opinión cardíaca', estado: 'No asistió' }
      ];
      return formatResult(['paciente', 'medico', 'fecha', 'motivo', 'estado'], rows, startTime);
    }
    if (challengeId === 'med-c2') {
      const rows = [
        { medico: 'Dra. Sofía Ramos', especialidad: 'Cardiología', citas_atendidas: 2, total_honorarios: '190.00 €' },
        { medico: 'Dr. Alejandro Marín', especialidad: 'Dermatología', citas_atendidas: 2, total_honorarios: '160.00 €' },
        { medico: 'Dr. Manuel Cordero', especialidad: 'Traumatología', citas_atendidas: 1, total_honorarios: '110.00 €' },
        { medico: 'Dra. Beatriz Santos', especialidad: 'Pediatría', citas_atendidas: 1, total_honorarios: '75.00 €' }
      ];
      return formatResult(['medico', 'especialidad', 'citas_atendidas', 'total_honorarios'], rows, startTime);
    }
    if (challengeId === 'med-c3') {
      const rows = [
        { cita_num: 504, paciente: 'Sara Pineda', telefono: '644556677', doctor: 'Dr. Manuel Cordero', fecha: '2025-06-02', estado: 'Cancelada' },
        { cita_num: 508, paciente: 'Sara Pineda', telefono: '644556677', doctor: 'Dr. Julián Prieto', fecha: '2025-06-04', estado: 'No asistió' }
      ];
      return formatResult(['cita_num', 'paciente', 'telefono', 'doctor', 'fecha', 'estado'], rows, startTime);
    }
  }

  if (caseId === 'case-educampus') {
    if (challengeId === 'edu-c1') {
      const rows = [
        { estudiante: 'Elena Morales', curso: 'Desarrollo Web en PHP', nota_final: 10.0, estado: 'Matricula de Honor' },
        { estudiante: 'Elena Morales', curso: 'Inteligencia Artificial con Spring AI', nota_final: 9.6, estado: 'Sobresaliente' },
        { estudiante: 'María López', curso: 'Bases de Datos Relacionales (SQL)', nota_final: 9.5, estado: 'Sobresaliente' },
        { estudiante: 'María López', curso: 'Desarrollo Web en PHP', nota_final: 9.3, estado: 'Sobresaliente' },
        { estudiante: 'Juan García', curso: 'Bases de Datos Relacionales (SQL)', nota_final: 9.0, estado: 'Sobresaliente' }
      ];
      return formatResult(['estudiante', 'curso', 'nota_final', 'estado'], rows, startTime);
    }
    if (challengeId === 'edu-c2') {
      const rows = [
        { carrera: 'DAW', total_alumnos: 3, nota_promedio: 9.37 },
        { carrera: 'ASIR', total_alumnos: 2, nota_promedio: 7.90 },
        { carrera: 'DAM', total_alumnos: 3, nota_promedio: 7.50 }
      ];
      return formatResult(['carrera', 'total_alumnos', 'nota_promedio'], rows, startTime);
    }
    if (challengeId === 'edu-c3') {
      const rows = [
        { id: 105, curso: 'Seguridad en Redes', horas: 90, creditos: 6 }
      ];
      return formatResult(['id', 'curso', 'horas', 'creditos'], rows, startTime);
    }
  }

  if (caseId === 'case-biblioteca') {
    if (challengeId === 'bib-c1') {
      const rows = [
        { prestamo_num: 702, titulo: 'Clean Code: Manual de Estilo Ágil', socio: 'Carlos Mendoza', telefono: '688223344', fecha_limite: '2025-05-27', estado: 'Vencido con retraso' },
        { prestamo_num: 707, titulo: 'Sapiens: De animales a dioses', socio: 'Carlos Mendoza', telefono: '688223344', fecha_limite: '2025-06-05', estado: 'Vencido con retraso' }
      ];
      return formatResult(['prestamo_num', 'titulo', 'socio', 'telefono', 'fecha_limite', 'estado'], rows, startTime);
    }
    if (challengeId === 'bib-c2') {
      const rows = [
        { titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez', genero: 'Novela', total_prestamos: 3 },
        { titulo: 'Clean Code: Manual de Estilo Ágil', autor: 'Robert C. Martin', genero: 'Informática', total_prestamos: 2 },
        { titulo: 'Dune: Crónicas de Arrakis', autor: 'Frank Herbert', genero: 'Ciencia Ficción', total_prestamos: 1 },
        { titulo: 'Diseño de Bases de Datos Relacionales', autor: 'Abraham Silberschatz', genero: 'Informática', total_prestamos: 1 },
        { titulo: 'Sapiens: De animales a dioses', autor: 'Yuval Noah Harari', genero: 'Ensayo', total_prestamos: 1 }
      ];
      return formatResult(['titulo', 'autor', 'genero', 'total_prestamos'], rows, startTime);
    }
    if (challengeId === 'bib-c3') {
      const rows = [
        { id: 205, titulo: 'El Nombre de la Rosa', autor: 'Umberto Eco', genero: 'Novela', ejemplares_disponibles: 3 },
        { id: 207, titulo: 'Aprende SQL en un Fin de Semana', autor: 'Antonio Padial', genero: 'Informática', ejemplares_disponibles: 6 },
        { id: 208, titulo: 'Historia del Arte Clásico', autor: 'E.H. Gombrich', genero: 'Historia', ejemplares_disponibles: 3 }
      ];
      return formatResult(['id', 'titulo', 'autor', 'genero', 'ejemplares_disponibles'], rows, startTime);
    }
    if (challengeId === 'bib-c4') {
      const rows = [
        { nombre: 'Ana Beltrán', tipo_socio: 'Estudiante', email: 'ana.beltran@gmail.com', total_libros_leidos: 2 },
        { nombre: 'Carlos Mendoza', tipo_socio: 'General', email: 'carlos.m@yahoo.es', total_libros_leidos: 2 },
        { nombre: 'Mireia Puig', tipo_socio: 'Investigador', email: 'mireia.p@outlook.com', total_libros_leidos: 2 }
      ];
      return formatResult(['nombre', 'tipo_socio', 'email', 'total_libros_leidos'], rows, startTime);
    }
  }

  return formatResult(['info'], [{ info: 'Consulta ejecutada correctamente.' }], startTime);
}

function runDynamicCaseQuery(caseObj, sql, startTime) {
  const fromMatch = sql.match(/FROM\s+([a-zA-Z0-9_]+)/i);
  if (!fromMatch) {
    throw new Error('Falta la cláusula FROM con una tabla válida del caso.');
  }
  const tableName = fromMatch[1].toLowerCase();
  const tableObj = caseObj.tables.find((t) => t.name.toLowerCase() === tableName);

  if (!tableObj) {
    const validNames = caseObj.tables.map((t) => t.name).join(', ');
    throw new Error(`La tabla "${tableName}" no pertenece al caso ${caseObj.name}. Tablas disponibles: ${validNames}.`);
  }

  let data = JSON.parse(JSON.stringify(tableObj.sampleData));
  const columns = Object.keys(data[0] || {});
  return formatResult(columns, data, startTime);
}

function formatResult(columns, rows, startTime) {
  const executionTimeMs = +(performance.now() - startTime).toFixed(2);
  return {
    success: true,
    columns,
    rows,
    rowCount: rows.length,
    executionTimeMs
  };
}

