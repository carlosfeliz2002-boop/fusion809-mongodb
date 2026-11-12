# 🍽️ Fusión 809 — Diseño y Administración de Base de Datos NoSQL con MongoDB

**Autor:** Enmanuel Durán Cruz  
**Matrícula:** 10157086  
**Carrera:** Técnico Superior en Desarrollo Web y Aplicaciones  
**Institución:** Pontificia Universidad Católica Madre y Maestra (PUCMM) — Campus Santo Domingo  

---

## 📌 1. Descripción del Negocio y Justificación Técnica (Módulos 1 y 2)
**Fusión 809** es un restaurante de alta cocina ubicado en Santo Domingo que fusiona la gastronomía dominicana con técnicas japonesas, peruanas y mediterráneas.

### ¿Por qué MongoDB en lugar de SQL?
1. **Esquema Polimórfico y Flexible:** Los platos del menú y perfiles de clientes poseen atributos dinámicos (etiquetas dietéticas, alérgenos variables, ingredientes) que no requieren tablas intermedias rígidas.
2. **Localidad de Datos y Velocidad de Lectura:** En la operación del punto de venta (POS) y pantalla de cocina, embeber el detalle de los platos consumidos dentro del documento de la orden permite lecturas atómicas en una sola consulta sin costosos `JOINs`.
3. **Escalabilidad Horizontal:** Preparado para crecer mediante *Sharding* ante la apertura de nuevas sucursales y alto volumen de pedidos por *delivery*.

---

## 🗂️ 2. Estructura de Colecciones y Modelado de Datos (Módulo 5)
La base de datos `Fusion809_DB` consta de tres colecciones principales:
* **`platos` (10 documentos):** Catálogo gastronómico con precios, costos, calorías, arreglos de ingredientes y etiquetas.
* **`clientes` (10 documentos):** Perfiles de comensales, sector en Santo Domingo, alergias y puntos de fidelidad.
* **`ordenes` (10 documentos insertados / 9 activos tras depuración CRUD):** Modelo híbrido transaccional:
  * **Referencing (`cliente_id`):** Apunta a la colección `clientes` para evitar duplicidad de datos personales y anomalías de actualización.
  * **Embedding (`items`):** Incrusta el arreglo de platos comprados con su `precio_unitario` histórico para asegurar lecturas ultrarrápidas e inmutabilidad contable en las facturas.

---

## 🚀 3. Scripts del Proyecto (Módulos 3, 4, 6 y 7)
En la carpeta [`/scripts`](./scripts) se encuentran los archivos ejecutables:
1. **`01_setup_crud.js`**: Creación de la base de datos, inserción de los 30 documentos iniciales y demostración de operaciones `find`, `updateOne` y `deleteOne`.
2. **`02_consultas_avanzadas.js`**: Cinco consultas de negocio aplicando `$gte`, `$lte`, `$and`, `$or`, proyecciones, ordenamiento (`.sort()`) y operadores de arreglos (`$all`, `$elemMatch`).
3. **`03_indices_agregacion.js`**:
   * Creación del índice compuesto `{ canal: 1, total: -1 }` siguiendo la regla ESR y auditoría de rendimiento con `explain("executionStats")` (pasando de `COLLSCAN` con 9 documentos examinados a `IXSCAN` con solo 3 documentos examinados).
   * Pipeline de agregación de 4 etapas (`$match`, `$unwind`, `$group`, `$sort`) para el reporte gerencial de ingresos y unidades vendidas por categoría gastronómica.

---

## 🌐 4. Arquitectura de Alta Disponibilidad y Sharding (Módulo 8)
* **Replica Set (Alta Disponibilidad):** Configuración de 3 nodos (`1 Primary` + `2 Secondaries`). El nodo primario procesa las escrituras del POS en tiempo real, mientras que un nodo secundario atiende los reportes analíticos pesados (`readPreference: "secondaryPreferred"`). Si el primario falla, ocurre un *failover* automático en menos de 10 segundos.
* **Sharding (Escalabilidad para millones de registros):** Particionamiento sobre la colección `ordenes` utilizando la Shard Key `{ cliente_id: "hashed" }` para distribuir las escrituras de manera uniforme entre los *Shards* y evitar cuellos de botella (*hotspots*) en horas pico.

```text
                   [ App POS Salón / App Delivery / Dashboard ]
                                        │
                        ┌───────────────┴───────────────┐
                        ▼                               ▼
                 [ mongos Router 1 ]             [ mongos Router 2 ]
                        │                               │
                        ├───────────────┬───────────────┘
                        │               │
                        ▼               └──► [ Config Server Replica Set ]
                        │                      (Metadatos de particiones)
        ┌───────────────┴───────────────────────────────┐
        ▼                                               ▼
┌───────────────────────────────────────┐       ┌───────────────────────────────────────┐
│ SHARD 1 (Replica Set A)               │       │ SHARD 2 (Replica Set B)               │
│ Hash: cliente_id (Rango A - M)        │       │ Hash: cliente_id (Rango N - Z)        │
│  [PRIMARY] ──► [SECONDARY 1 & 2]      │       │  [PRIMARY] ──► [SECONDARY 1 & 2]      │
└───────────────────────────────────────┘       └───────────────────────────────────────┘
