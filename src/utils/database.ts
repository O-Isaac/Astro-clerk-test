import { db, Categorias } from "astro:db";

export const getCategorias = async () => {
  return await db.select().from(Categorias);
};
