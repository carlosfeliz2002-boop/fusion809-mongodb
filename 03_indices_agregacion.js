// ==========================================
// MÓDULO 6: ÍNDICES Y RENDIMIENTO (explain)
// ==========================================
use('Fusion809_DB');

// 1. Antes del índice (mostrará COLLSCAN y totalDocsExamined: 9)
db.ordenes.find({ canal: "Delivery", total: { $gte: 1000 } }).explain("executionStats");

// 2. Crear índice compuesto siguiendo la regla ESR (Equality: canal, Range: total)
db.ordenes.createIndex({ canal: 1, total: -1 }, { name: "idx_canal_total" });

// 3. Después del índice (mostrará IXSCAN y totalDocsExamined: 3)
db.ordenes.find({ canal: "Delivery", total: { $gte: 1000 } }).explain("executionStats");

// ==========================================
// MÓDULO 7: AGGREGATION FRAMEWORK (4 Etapas)
// ==========================================
db.ordenes.aggregate([
  { $match: { estado: { $in: ["Entregado", "En Preparación"] } } },
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.categoria",
      unidades_vendidas: { $sum: "$items.cantidad" },
      ingresos_totales_RD: { $sum: { $multiply: ["$items.cantidad", "$items.precio_unitario"] } },
      platos_distintos: { $addToSet: "$items.nombre" }
    }
  },
  { $sort: { ingresos_totales_RD: -1 } }
]);