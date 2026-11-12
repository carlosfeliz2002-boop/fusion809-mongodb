// ==========================================
// MÓDULO 3: CREACIÓN E INSERCIÓN (30 Documentos) + CRUD
// ==========================================
use('Fusion809_DB');

db.platos.drop();
db.clientes.drop();
db.ordenes.drop();

// 1. Inserción de 10 documentos en la colección 'platos'
db.platos.insertMany([
  { _id: "PLT-01", nombre: "Mofongo Nikkei Roll", categoria: "Fusión Asiática-Criolla", precio: 650, costo: 240, disponible: true, ingredientes: ["plátano verde", "chicharrón", "salmón fresco", "salsa anguila", "aguacate"], etiquetas: ["estrella", "mariscos"], calorias: 580 },
  { _id: "PLT-02", nombre: "Ceviche Taino", categoria: "Entradas", precio: 580, costo: 210, disponible: true, ingredientes: ["mero", "leche de tigre de chinola", "cilantro", "cebolla roja", "batata crujiente"], etiquetas: ["sin gluten", "fresco", "mariscos"], calorias: 320 },
  { _id: "PLT-03", nombre: "Bao Buns de Chivo Liniero", categoria: "Entradas", precio: 520, costo: 190, disponible: true, ingredientes: ["pan bao", "chivo guisado al orégano", "encurtido de cebolla", "mayonesa de ajo negro"], etiquetas: ["picante", "carnes"], calorias: 490 },
  { _id: "PLT-04", nombre: "Risotto de Chenchén y Ossobuco", categoria: "Platos Fuertes", precio: 980, costo: 410, disponible: true, ingredientes: ["maíz craqueado", "leche de coco", "ossobuco braseado", "queso parmesano"], etiquetas: ["estrella", "carnes"], calorias: 850 },
  { _id: "PLT-05", nombre: "Tacos de Pescado Boca Chica", categoria: "Fusión Mexicana-Criolla", precio: 550, costo: 185, disponible: true, ingredientes: ["tortilla de maíz", "filete de dorado frito", "pico de gallo de mango", "crema de aguacate"], etiquetas: ["mariscos"], calorias: 460 },
  { _id: "PLT-06", nombre: "Ramen Sancocho 809", categoria: "Fusión Asiática-Criolla", precio: 790, costo: 295, disponible: true, ingredientes: ["caldo de 3 carnes", "fideos ramen", "panceta de cerdo", "huevo marinado", "auyama", "plátano"], etiquetas: ["estrella", "carnes", "caliente"], calorias: 740 },
  { _id: "PLT-07", nombre: "Gyoza de Yuca y Longaniza", categoria: "Entradas", precio: 450, costo: 140, disponible: true, ingredientes: ["masa gyoza", "puré de yuca", "longaniza artesanal", "salsa ponzu de naranja agria"], etiquetas: ["carnes", "compartir"], calorias: 410 },
  { _id: "PLT-08", nombre: "Paella del Malecón", categoria: "Platos Fuertes", precio: 1150, costo: 490, disponible: true, ingredientes: ["arroz bomba", "camarones", "calamares", "longaniza", "plátano maduro", "azafrán"], etiquetas: ["mariscos", "compartir", "sin gluten"], calorias: 920 },
  { _id: "PLT-09", nombre: "Cheesecake de Habichuelas con Dulce", categoria: "Postres", precio: 420, costo: 130, disponible: true, ingredientes: ["queso crema", "reducción de habichuelas", "galleta de canela", "batata", "pasas"], etiquetas: ["postre", "vegetariano", "estrella"], calorias: 610 },
  { _id: "PLT-10", nombre: "Sangría Tropical Mamajuana", categoria: "Bebidas", precio: 380, costo: 110, disponible: false, ingredientes: ["vino tinto", "reducción de mamajuana", "chinola", "piña", "canela"], etiquetas: ["bebida", "alcohol", "sin gluten"], calorias: 240 }
]);

// 2. Inserción de 10 documentos en la colección 'clientes'
db.clientes.insertMany([
  { _id: "CLI-01", nombre: "Valeria Méndez", telefono: "809-555-0101", email: "vmendez@correo.do", sector: "Piantini", puntos_fidelidad: 450, alergias: ["maní"], vip: true },
  { _id: "CLI-02", nombre: "Carlos Rodríguez", telefono: "829-555-0102", email: "crodriguez@correo.do", sector: "Naco", puntos_fidelidad: 120, alergias: [], vip: false },
  { _id: "CLI-03", nombre: "Sofía Almonte", telefono: "849-555-0103", email: "salmonte@correo.do", sector: "Bella Vista", puntos_fidelidad: 680, alergias: ["lactosa", "mariscos"], vip: true },
  { _id: "CLI-04", nombre: "Diego Fernández", telefono: "809-555-0104", email: "dfernandez@correo.do", sector: "Gazcue", puntos_fidelidad: 80, alergias: [], vip: false },
  { _id: "CLI-05", nombre: "Laura Báez", telefono: "829-555-0105", email: "lbaez@correo.do", sector: "Piantini", puntos_fidelidad: 510, alergias: ["gluten"], vip: true },
  { _id: "CLI-06", nombre: "Marcos Guzmán", telefono: "809-555-0106", email: "mguzman@correo.do", sector: "Arroyo Hondo", puntos_fidelidad: 210, alergias: [], vip: false },
  { _id: "CLI-07", nombre: "Elena Tavárez", telefono: "849-555-0107", email: "etavarez@correo.do", sector: "Evaristo Morales", puntos_fidelidad: 340, alergias: ["mariscos"], vip: false },
  { _id: "CLI-08", nombre: "Gabriel Santos", telefono: "809-555-0108", email: "gsantos@correo.do", sector: "Naco", puntos_fidelidad: 920, alergias: [], vip: true },
  { _id: "CLI-09", nombre: "Patricia Mejía", telefono: "829-555-0109", email: "pmejia@correo.do", sector: "Mirador Sur", puntos_fidelidad: 150, alergias: ["soya"], vip: false },
  { _id: "CLI-10", nombre: "Andrés Peguero", telefono: "809-555-0110", email: "apeguero@correo.do", sector: "Piantini", puntos_fidelidad: 40, alergias: [], vip: false }
]);

// 3. Inserción de 10 documentos en la colección 'ordenes'
db.ordenes.insertMany([
  { _id: "ORD-1001", cliente_id: "CLI-01", fecha: ISODate("2026-10-01T19:30:00Z"), canal: "Salón", metodo_pago: "Tarjeta", estado: "Entregado", items: [{ plato_id: "PLT-01", nombre: "Mofongo Nikkei Roll", categoria: "Fusión Asiática-Criolla", cantidad: 2, precio_unitario: 650 }, { plato_id: "PLT-09", nombre: "Cheesecake de Habichuelas con Dulce", categoria: "Postres", cantidad: 1, precio_unitario: 420 }], total: 1720 },
  { _id: "ORD-1002", cliente_id: "CLI-02", fecha: ISODate("2026-10-02T13:15:00Z"), canal: "Delivery", metodo_pago: "Efectivo", estado: "Entregado", items: [{ plato_id: "PLT-06", nombre: "Ramen Sancocho 809", categoria: "Fusión Asiática-Criolla", cantidad: 1, precio_unitario: 790 }], total: 790 },
  { _id: "ORD-1003", cliente_id: "CLI-03", fecha: ISODate("2026-10-02T20:45:00Z"), canal: "Salón", metodo_pago: "Tarjeta", estado: "Entregado", items: [{ plato_id: "PLT-04", nombre: "Risotto de Chenchén y Ossobuco", categoria: "Platos Fuertes", cantidad: 2, precio_unitario: 980 }, { plato_id: "PLT-03", nombre: "Bao Buns de Chivo Liniero", categoria: "Entradas", cantidad: 1, precio_unitario: 520 }], total: 2480 },
  { _id: "ORD-1004", cliente_id: "CLI-05", fecha: ISODate("2026-10-03T14:00:00Z"), canal: "Delivery", metodo_pago: "Tarjeta", estado: "Entregado", items: [{ plato_id: "PLT-02", nombre: "Ceviche Taino", categoria: "Entradas", cantidad: 2, precio_unitario: 580 }, { plato_id: "PLT-08", nombre: "Paella del Malecón", categoria: "Platos Fuertes", cantidad: 1, precio_unitario: 1150 }], total: 2310 },
  { _id: "ORD-1005", cliente_id: "CLI-08", fecha: ISODate("2026-10-04T21:10:00Z"), canal: "Salón", metodo_pago: "Tarjeta", estado: "Entregado", items: [{ plato_id: "PLT-08", nombre: "Paella del Malecón", categoria: "Platos Fuertes", cantidad: 2, precio_unitario: 1150 }, { plato_id: "PLT-01", nombre: "Mofongo Nikkei Roll", categoria: "Fusión Asiática-Criolla", cantidad: 2, precio_unitario: 650 }], total: 3600 },
  { _id: "ORD-1006", cliente_id: "CLI-04", fecha: ISODate("2026-10-05T12:30:00Z"), canal: "Pickup", metodo_pago: "Transferencia", estado: "Entregado", items: [{ plato_id: "PLT-05", nombre: "Tacos de Pescado Boca Chica", categoria: "Fusión Mexicana-Criolla", cantidad: 2, precio_unitario: 550 }], total: 1100 },
  { _id: "ORD-1007", cliente_id: "CLI-01", fecha: ISODate("2026-10-06T19:00:00Z"), canal: "Delivery", metodo_pago: "Tarjeta", estado: "Entregado", items: [{ plato_id: "PLT-06", nombre: "Ramen Sancocho 809", categoria: "Fusión Asiática-Criolla", cantidad: 2, precio_unitario: 790 }, { plato_id: "PLT-07", nombre: "Gyoza de Yuca y Longaniza", categoria: "Entradas", cantidad: 1, precio_unitario: 450 }], total: 2030 },
  { _id: "ORD-1008", cliente_id: "CLI-06", fecha: ISODate("2026-10-07T15:20:00Z"), canal: "Salón", metodo_pago: "Efectivo", estado: "Entregado", items: [{ plato_id: "PLT-03", nombre: "Bao Buns de Chivo Liniero", categoria: "Entradas", cantidad: 2, precio_unitario: 520 }, { plato_id: "PLT-09", nombre: "Cheesecake de Habichuelas con Dulce", categoria: "Postres", cantidad: 2, precio_unitario: 420 }], total: 1880 },
  { _id: "ORD-1009", cliente_id: "CLI-09", fecha: ISODate("2026-10-08T20:00:00Z"), canal: "Delivery", metodo_pago: "Tarjeta", estado: "En Preparación", items: [{ plato_id: "PLT-01", nombre: "Mofongo Nikkei Roll", categoria: "Fusión Asiática-Criolla", cantidad: 1, precio_unitario: 650 }, { plato_id: "PLT-02", nombre: "Ceviche Taino", categoria: "Entradas", cantidad: 1, precio_unitario: 580 }], total: 1230 },
  { _id: "ORD-1010", cliente_id: "CLI-10", fecha: ISODate("2026-10-09T18:10:00Z"), canal: "Pickup", metodo_pago: "Efectivo", estado: "Cancelado", items: [{ plato_id: "PLT-07", nombre: "Gyoza de Yuca y Longaniza", categoria: "Entradas", cantidad: 1, precio_unitario: 450 }], total: 450 }
]);

// OPERACIONES CRUD ADICIONALES
// READ: Clientes VIP de Piantini
db.clientes.find({ sector: "Piantini", vip: true });

// UPDATE: Activar Sangría Tropical Mamajuana y subir precio a 400
db.platos.updateOne({ _id: "PLT-10" }, { $set: { disponible: true, precio: 400 } });

// DELETE: Eliminar orden cancelada ORD-1010
db.ordenes.deleteOne({ _id: "ORD-1010", estado: "Cancelado" });