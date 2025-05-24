import { defineDb, column, defineTable } from "astro:db";

const Usuarios = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    nombre: column.text(),
    profilePicture: column.text(),
    email: column.text(),
  },
});

const Categorias = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    nombre: column.text(),
    descripcion: column.text(),
    imagen: column.text(),
  },
});

const Productos = defineTable({
  columns: {
    id: column.number({ primaryKey: true, unique: true }),
    nombre: column.text(),
    descripcion: column.text(),
    precio: column.number(),
    imagen: column.text(),
    categoria: column.text({ references: () => Categorias.columns.id }),
  },
});

const Pedidos = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    userId: column.text({ references: () => Usuarios.columns.id }),
    direccion: column.json(),
    sessionId: column.text(),
    paymentId: column.text(),
    estado: column.text(), // Pagado, Enviado, Entregado
    total: column.number(),
    createdAt: column.date({ default: new Date() }),
    updatedAt: column.date({ default: new Date() }),
  }
})

const Lineas = defineTable({
  columns: {
    pedidoId: column.text({ references: () => Pedidos.columns.id }),
    productoId: column.number({ references: () => Productos.columns.id }),
    cantidad: column.number(),
    precio: column.number(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { Usuarios, Productos, Lineas, Categorias, Pedidos },
});
