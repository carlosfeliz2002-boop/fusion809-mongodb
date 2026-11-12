// ==========================================
// MÓDULO 4: 5 CONSULTAS AVANZADAS
// ==========================================
use('Fusion809_DB');

// 1. Operadores de comparación ($gte, $lte): Platos entre RD$500 y RD$800
db.platos.find({ precio: { $gte: 500, $lte: 800 } });

// 2. Operadores lógicos ($and, $or): Órdenes > RD$2,000 en Salón o con Tarjeta
db.ordenes.find({
  $and: [
    { total: { $gt: 2000 } },
    { $or: [{ canal: "Salón" }, { metodo_pago: "Tarjeta" }] }
  ]
});

// 3. Proyecciones y Ordenamiento: Top clientes por puntos de fidelidad
db.clientes.find(
  {},
  { _id: 0, nombre: 1, sector: 1, puntos_fidelidad: 1, vip: 1 }
).sort({ puntos_fidelidad: -1 });

// 4. Consulta sobre Arrays ($all): Platos estrella que llevan mariscos
db.platos.find({ etiquetas: { $all: ["estrella", "mariscos"] } });

// 5. Consulta sobre Subdocumentos ($elemMatch): Órdenes con 2+ unidades de un plato > RD$700
db.ordenes.find({
  items: { $elemMatch: { cantidad: { $gte: 2 }, precio_unitario: { $gt: 700 } } }
});