import { defineDb, column, defineTable } from "astro:db";

const Usuarios = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    nombre: column.text(),
    profilePicture: column.text(),
    email: column.text(),
  },
});

const Direcciones = defineTable({
  columns: {
    id: column.number({ primaryKey: true, unique: true }),
    userId: column.text({ references: () => Usuarios.columns.id }),
    calle: column.text(),
    numero: column.text(),
    provincia: column.text(),
    codigoPostal: column.text(),
    pais: column.text(),
    telefono: column.text(),
    alias: column.text(),
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

// https://astro.build/db/config
export default defineDb({
  tables: { Usuarios, Direcciones, Productos, Categorias },
});
