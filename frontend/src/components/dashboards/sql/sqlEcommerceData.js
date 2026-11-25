/**
 * sqlEcommerceData.js
 * Base de datos realista para el Generador Visual de Consultas y el Taller de Negocio.
 * Simula el backend de una tienda online de tecnología ("TechStore").
 */

export const ECOMMERCE_DB = {
  clientes: [
    { id: 1, nombre: 'Lucía Méndez', email: 'lucia.mendez@techstore.es', ciudad: 'Madrid', nivel: 'VIP', fecha_alta: '2025-01-15', saldo_puntos: 450 },
    { id: 2, nombre: 'Javier Navarro', email: 'j.navarro@techstore.es', ciudad: 'Barcelona', nivel: 'Estándar', fecha_alta: '2025-02-01', saldo_puntos: 120 },
    { id: 3, nombre: 'Carmen Ortiz', email: 'carmen.ortiz@techstore.es', ciudad: 'Valencia', nivel: 'VIP', fecha_alta: '2025-02-18', saldo_puntos: 890 },
    { id: 4, nombre: 'Marcos Alonso', email: 'm.alonso@techstore.es', ciudad: 'Madrid', nivel: 'Estándar', fecha_alta: '2025-03-05', saldo_puntos: 50 },
    { id: 5, nombre: 'Patricia Gil', email: 'patricia.gil@techstore.es', ciudad: 'Sevilla', nivel: 'VIP', fecha_alta: '2025-03-20', saldo_puntos: 620 },
    { id: 6, nombre: 'David Serrano', email: 'd.serrano@techstore.es', ciudad: 'Bilbao', nivel: 'Estándar', fecha_alta: '2025-04-10', saldo_puntos: 0 },
    { id: 7, nombre: 'Elena Vega', email: 'elena.vega@techstore.es', ciudad: 'Barcelona', nivel: 'Estándar', fecha_alta: '2025-05-02', saldo_puntos: 95 },
    { id: 8, nombre: 'Raúl Morales', email: 'raul.m@techstore.es', ciudad: 'Madrid', nivel: 'Estándar', fecha_alta: '2025-05-14', saldo_puntos: 0 } // Cliente sin pedidos (lead frío)
  ],

  productos: [
    { id: 101, nombre: 'Portátil ThinkPad Pro 16"', categoria: 'Portátiles', precio: 1249.99, stock: 8, proveedor: 'Lenovo' },
    { id: 102, nombre: 'Monitor Curvo 34" UltraWide 144Hz', categoria: 'Monitores', precio: 459.50, stock: 15, proveedor: 'LG' },
    { id: 103, nombre: 'Teclado Mecánico RGB Switch Red', categoria: 'Accesorios', precio: 89.90, stock: 45, proveedor: 'Corsair' },
    { id: 104, nombre: 'Ratón Ergonómico Inalámbrico', categoria: 'Accesorios', precio: 49.95, stock: 60, proveedor: 'Logitech' },
    { id: 105, nombre: 'Auriculares Cancelación Ruido ANC', categoria: 'Audio', precio: 199.00, stock: 6, proveedor: 'Sony' }, // Stock crítico
    { id: 106, nombre: 'Smartphone Galaxy Pro 256GB', categoria: 'Móviles', precio: 899.00, stock: 12, proveedor: 'Samsung' },
    { id: 107, nombre: 'Disco SSD NVMe 2TB PCIe 4.0', categoria: 'Componentes', precio: 139.99, stock: 25, proveedor: 'Crucial' },
    { id: 108, nombre: 'Webcam 4K con Micrófono Estéreo', categoria: 'Accesorios', precio: 119.50, stock: 4, proveedor: 'Elgato' } // Stock crítico
  ],

  pedidos: [
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
};

export const REAL_WORLD_MISSIONS = [
  {
    id: 'mision-1-stock',
    area: '📦 Logística & Almacén',
    title: 'Misión 1: Alerta Urgente de Rotura de Stock',
    context: 'El responsable de almacén necesita contactar a los proveedores para reponer aquellos artículos con stock crítico (menos de 10 unidades disponibles).',
    goal: 'Obtén el ID, nombre del producto, proveedor, precio y stock de los artículos con stock menor a 10, ordenados de menor a mayor cantidad.',
    builderConfig: {
      table: 'productos',
      columns: ['id', 'nombre', 'proveedor', 'precio', 'stock'],
      whereCol: 'stock',
      whereOp: '<',
      whereVal: '10',
      orderByCol: 'stock',
      orderDir: 'ASC',
      limit: '10'
    },
    canonicalSql: `SELECT id, nombre, proveedor, precio, stock
FROM productos
WHERE stock < 10
ORDER BY stock ASC;`,
    explanation: `Filtramos con WHERE stock < 10 y ordenamos de forma ascendente (ASC) para que el producto con menor existencia (Webcam 4K con 4 unidades) aparezca en la primera posición.`
  },
  {
    id: 'mision-2-facturacion-ciudad',
    area: '💳 Finanzas & Facturación',
    title: 'Misión 2: Facturación Real por Ciudad (Pedidos Entregados)',
    context: 'La dirección financiera quiere conocer qué ciudades generan mayor volumen de negocio, contabilizando únicamente los pedidos confirmados y entregados (excluyendo cancelados y pendientes).',
    goal: 'Une pedidos con clientes y calcula el número de compras y el total facturado por ciudad, ordenado de mayor a menor importe.',
    builderConfig: {
      table: 'pedidos',
      joinTable: 'clientes',
      joinOn: 'pedidos.cliente_id = clientes.id',
      groupByCol: 'clientes.ciudad',
      whereCol: 'pedidos.estado',
      whereOp: '=',
      whereVal: 'Entregado'
    },
    canonicalSql: `SELECT c.ciudad,
       COUNT(p.id) AS total_pedidos,
       ROUND(SUM(p.total), 2) AS facturacion_total
FROM pedidos p
INNER JOIN clientes c ON p.cliente_id = c.id
WHERE p.estado = 'Entregado'
GROUP BY c.ciudad
ORDER BY facturacion_total DESC;`,
    explanation: `Hacemos INNER JOIN entre 'pedidos' y 'clientes'. Primero descartamos los no entregados con WHERE (paso 2 del motor), agrupamos por ciudad (paso 3) y calculamos la suma total (SUM) y conteo (COUNT).`
  },
  {
    id: 'mision-3-clientes-vip',
    area: '⭐ Marketing & Fidelización',
    title: 'Misión 3: El Top 3 de Clientes con Mayor Gasto Total',
    context: 'El equipo de marketing va a regalar un vale exclusivo de 100 € a los 3 mejores clientes de la tienda según el dinero total gastado en compras válidas.',
    goal: 'Lista el nombre del cliente, su email, nivel y el importe total gastado en pedidos válidos (no cancelados), limitando a los 3 primeros.',
    builderConfig: {
      table: 'pedidos',
      joinTable: 'clientes',
      canonicalSql: ''
    },
    canonicalSql: `SELECT c.nombre, c.email, c.nivel,
       ROUND(SUM(p.total), 2) AS gasto_acumulado
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
WHERE p.estado != 'Cancelado'
GROUP BY c.id, c.nombre, c.email, c.nivel
ORDER BY gasto_acumulado DESC
LIMIT 3;`,
    explanation: `Calculamos el SUM(total) agrupado por cliente. Usamos ORDER BY gasto_acumulado DESC para situar a los mayores compradores arriba y LIMIT 3 para seleccionar únicamente el podio de clientes.`
  },
  {
    id: 'mision-4-leads-frios',
    area: '🎯 Conversión & Ventas',
    title: 'Misión 4: Detectar Usuarios Registrados sin Ninguna Compra',
    context: 'Buscamos reactivar usuarios registrados que crearon su cuenta pero nunca se animaron a tramitar su primer pedido.',
    goal: 'Encuentra los clientes que no tienen ningún pedido en la tabla de pedidos para enviarles una campaña de bienvenida.',
    canonicalSql: `SELECT c.id, c.nombre, c.email, c.ciudad, c.fecha_alta
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
WHERE p.id IS NULL;`,
    explanation: `Este es el clásico Anti-JOIN. El LEFT JOIN preserva a todos los clientes. Aquellos que nunca han comprado tendrán NULL en las columnas de la tabla pedidos. Al filtrar 'WHERE p.id IS NULL' aislamos a los usuarios sin pedidos (como Raúl Morales).`
  },
  {
    id: 'mision-5-ticket-medio',
    area: '📊 Dirección Estratégica',
    title: 'Misión 5: Ticket Medio y Número de Pedidos por Nivel de Cliente',
    context: 'La junta directiva desea analizar si los clientes con cuenta "VIP" realmente tienen un gasto medio por compra significativamente superior al de los clientes "Estándar".',
    goal: 'Calcula el número de pedidos y el gasto medio por pedido (ticket medio) comparando clientes VIP frente a Estándar.',
    canonicalSql: `SELECT c.nivel AS tipo_cliente,
       COUNT(p.id) AS numero_pedidos,
       ROUND(AVG(p.total), 2) AS ticket_medio,
       ROUND(SUM(p.total), 2) AS volumen_total
FROM clientes c
INNER JOIN pedidos p ON c.id = p.cliente_id
WHERE p.estado != 'Cancelado'
GROUP BY c.nivel
ORDER BY ticket_medio DESC;`,
    explanation: `Agrupamos por 'c.nivel' y calculamos dos métricas esenciales del e-commerce: AVG(p.total) para el ticket medio y SUM(p.total) para el volumen de facturación total.`
  },
  {
    id: 'mision-6-biblioteca-prestamos',
    area: '📚 Biblioteca & Cultura',
    title: 'Misión 6: Biblioteca Central • Control de Préstamos Fuera de Plazo',
    context: 'En el servicio municipal de bibliotecas, el mostrador de atención al lector necesita identificar los préstamos vencidos que aún no han sido devueltos para emitir avisos telefónicos a los socios sancionables.',
    goal: 'Cruza préstamos con libros y socios para mostrar el número de préstamo, título, nombre del socio, teléfono de contacto y fecha límite para préstamos con estado \'Vencido con retraso\'.',
    builderConfig: {
      table: 'pedidos',
      columns: ['id', 'cliente_id', 'total', 'estado'],
      whereCol: 'estado',
      whereOp: '=',
      whereVal: 'Cancelado'
    },
    canonicalSql: `SELECT p.id AS prestamo_num, l.titulo, s.nombre AS socio, s.telefono, p.fecha_limite, p.estado
FROM prestamos p
INNER JOIN libros l ON p.libro_id = l.id
INNER JOIN socios s ON p.socio_id = s.id
WHERE p.fecha_devolucion IS NULL AND p.estado = 'Vencido con retraso'
ORDER BY p.fecha_limite ASC;`,
    explanation: `Este cruce canónico de 3 tablas conecta la entidad 'libros' y 'socios' a través de la tabla intermedia 'prestamos'. La condición 'p.fecha_devolucion IS NULL' garantiza que solo se consideren ejemplares que aún siguen en posesión del lector.`
  }
];

/**
 * Ejecutor en memoria para la base de datos de TechStore (E-commerce).
 */
export function executeEcommerceSql(sql) {
  const startTime = performance.now();
  const clean = sql.trim().replace(/;$/, '').replace(/\s+/g, ' ');

  try {
    // Normalizar
    const upper = clean.toUpperCase();

    // Comprobar si coincide con alguna de las misiones
    if (upper.includes('WHERE STOCK < 10') || upper.includes('STOCK < 10')) {
      const rows = ECOMMERCE_DB.productos
        .filter((p) => p.stock < 10)
        .sort((a, b) => a.stock - b.stock)
        .map((p) => ({ id: p.id, nombre: p.nombre, proveedor: p.proveedor, precio: `${p.precio} €`, stock: p.stock }));
      return formatResult(['id', 'nombre', 'proveedor', 'precio', 'stock'], rows, startTime);
    }

    if (upper.includes('GROUP BY C.CIUDAD') || upper.includes('GROUP BY CIUDAD')) {
      const cityMap = {};
      ECOMMERCE_DB.pedidos
        .filter((p) => p.estado === 'Entregado')
        .forEach((p) => {
          const c = ECOMMERCE_DB.clientes.find((cl) => cl.id === p.cliente_id);
          const ciudad = c ? c.ciudad : 'Desconocida';
          if (!cityMap[ciudad]) cityMap[ciudad] = { total_pedidos: 0, facturacion: 0 };
          cityMap[ciudad].total_pedidos += 1;
          cityMap[ciudad].facturacion += p.total;
        });

      const rows = Object.entries(cityMap)
        .map(([ciudad, data]) => ({
          ciudad,
          total_pedidos: data.total_pedidos,
          facturacion_total: `${data.facturacion.toFixed(2)} €`
        }))
        .sort((a, b) => parseFloat(b.facturacion_total) - parseFloat(a.facturacion_total));

      return formatResult(['ciudad', 'total_pedidos', 'facturacion_total'], rows, startTime);
    }

    if (upper.includes('LIMIT 3') && (upper.includes('GASTO') || upper.includes('SUM(P.TOTAL)') || upper.includes('SUM('))) {
      const clientMap = {};
      ECOMMERCE_DB.pedidos
        .filter((p) => p.estado !== 'Cancelado')
        .forEach((p) => {
          if (!clientMap[p.cliente_id]) clientMap[p.cliente_id] = 0;
          clientMap[p.cliente_id] += p.total;
        });

      const rows = Object.entries(clientMap)
        .map(([cId, total]) => {
          const c = ECOMMERCE_DB.clientes.find((cl) => cl.id === Number(cId));
          return {
            nombre: c?.nombre || 'Cliente',
            email: c?.email || '',
            nivel: c?.nivel || 'Estándar',
            gasto_acumulado: `${total.toFixed(2)} €`
          };
        })
        .sort((a, b) => parseFloat(b.gasto_acumulado) - parseFloat(a.gasto_acumulado))
        .slice(0, 3);

      return formatResult(['nombre', 'email', 'nivel', 'gasto_acumulado'], rows, startTime);
    }

    if (upper.includes('PRESTAMOS') || upper.includes('LIBROS') || upper.includes('VENCIDO')) {
      const rows = [
        { prestamo_num: 702, titulo: 'Clean Code: Manual de Estilo Ágil', socio: 'Carlos Mendoza', telefono: '688223344', fecha_limite: '2025-05-27', estado: 'Vencido con retraso' },
        { prestamo_num: 707, titulo: 'Sapiens: De animales a dioses', socio: 'Carlos Mendoza', telefono: '688223344', fecha_limite: '2025-06-05', estado: 'Vencido con retraso' }
      ];
      return formatResult(['prestamo_num', 'titulo', 'socio', 'telefono', 'fecha_limite', 'estado'], rows, startTime);
    }

    if (upper.includes('P.ID IS NULL') || (upper.includes('LEFT JOIN') && upper.includes('NULL'))) {
      const clientOrderIds = new Set(ECOMMERCE_DB.pedidos.map((p) => p.cliente_id));
      const rows = ECOMMERCE_DB.clientes
        .filter((c) => !clientOrderIds.has(c.id))
        .map((c) => ({
          id: c.id,
          nombre: c.nombre,
          email: c.email,
          ciudad: c.ciudad,
          fecha_alta: c.fecha_alta
        }));
      return formatResult(['id', 'nombre', 'email', 'ciudad', 'fecha_alta'], rows, startTime);
    }

    if (upper.includes('GROUP BY C.NIVEL') || upper.includes('GROUP BY NIVEL')) {
      const stats = { VIP: { pedidos: 0, suma: 0 }, Estándar: { pedidos: 0, suma: 0 } };
      ECOMMERCE_DB.pedidos
        .filter((p) => p.estado !== 'Cancelado')
        .forEach((p) => {
          const c = ECOMMERCE_DB.clientes.find((cl) => cl.id === p.cliente_id);
          const nivel = c ? c.nivel : 'Estándar';
          if (!stats[nivel]) stats[nivel] = { pedidos: 0, suma: 0 };
          stats[nivel].pedidos += 1;
          stats[nivel].suma += p.total;
        });

      const rows = Object.entries(stats).map(([tipo_cliente, data]) => ({
        tipo_cliente,
        numero_pedidos: data.pedidos,
        ticket_medio: `${(data.suma / (data.pedidos || 1)).toFixed(2)} €`,
        volumen_total: `${data.suma.toFixed(2)} €`
      }));

      return formatResult(['tipo_cliente', 'numero_pedidos', 'ticket_medio', 'volumen_total'], rows, startTime);
    }

    // Consulta genérica sobre clientes
    if (upper.includes('FROM CLIENTES')) {
      let data = [...ECOMMERCE_DB.clientes];
      if (upper.includes('VIP')) data = data.filter((c) => c.nivel === 'VIP');
      return formatResult(['id', 'nombre', 'email', 'ciudad', 'nivel', 'saldo_puntos'], data, startTime);
    }

    // Consulta genérica sobre productos
    if (upper.includes('FROM PRODUCTOS')) {
      let data = [...ECOMMERCE_DB.productos];
      if (upper.includes('PORTÁTILES')) data = data.filter((p) => p.categoria === 'Portátiles');
      return formatResult(['id', 'nombre', 'categoria', 'precio', 'stock', 'proveedor'], data, startTime);
    }

    // Consulta genérica sobre pedidos
    if (upper.includes('FROM PEDIDOS')) {
      return formatResult(['id', 'cliente_id', 'fecha', 'total', 'estado', 'metodo_pago'], ECOMMERCE_DB.pedidos, startTime);
    }

    // Fallback con productos
    return formatResult(['id', 'nombre', 'categoria', 'precio', 'stock'], ECOMMERCE_DB.productos.slice(0, 5), startTime);
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Error al ejecutar la consulta en el taller de negocio.'
    };
  }
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

