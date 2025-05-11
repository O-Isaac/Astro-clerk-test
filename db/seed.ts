import { column, db, defineTable, Productos } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  db.insert(Productos).values([
    {
      categoria: "Suplementos",
      nombre: "Mutant Madness 30 Serv.",
      imagen: "https://www.pontemasfuerte.com/media/products/8130/mutant-madness-1741253934.webp",
      precio: 21.25,
      descripcion:
        "Mutant Madness de Mutant es un asombroso pre-entreno elaborado con L-citrulina, L-arginina, beta-alanina (Carnosyn®), taurina, L-tirosina y 500 mg de una combinación de fuentes de cafeína.",
    },
  ]);
}
