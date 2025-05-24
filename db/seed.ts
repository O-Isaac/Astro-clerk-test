import { db, Categorias, Productos } from "astro:db";

export default async function seed() {
  // SEED DE CATEGORÍAS
  const categorias = [
    {
      id: "cat_proteinas",
      nombre: "Proteínas",
      descripcion: "Suplementos proteicos para el desarrollo muscular y recuperación post-entrenamiento",
      imagen: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "cat_creatina",
      nombre: "Creatina",
      descripcion: "Suplementos de creatina para aumentar el rendimiento y la fuerza muscular",
      imagen: "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "cat_preentreno",
      nombre: "Pre-entrenos",
      descripcion: "Productos para maximizar la energía y el rendimiento antes del entrenamiento",
      imagen: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "cat_aminoacidos",
      nombre: "Aminoácidos",
      descripcion: "BCAAs y EAAs para favorecer la recuperación y reducir el catabolismo muscular",
      imagen: "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "cat_vitaminas",
      nombre: "Vitaminas y Minerales",
      descripcion: "Complementos nutricionales para fortalecer el sistema inmunológico y mejorar la salud general",
      imagen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "cat_perdidapeso",
      nombre: "Pérdida de Peso",
      descripcion: "Quemadores de grasa y productos para acelerar el metabolismo",
      imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "cat_ropaaccesorios",
      nombre: "Ropa y Accesorios",
      descripcion: "Ropa y accesorios para el entrenamiento y la salud",
      imagen: "https://images.unsplash.com/photo-1601679249486-3e2a903f23ee?q=80&w=600&auto=format&fit=crop",
    },
  ];

  // SEED DE PRODUCTOS
  const productos = [
    // Proteínas
    {
      id: 1,
      nombre: "Whey Protein Premium",
      descripcion: "Proteína de suero de leche de alta calidad con 25g de proteína por servicio. Ideal para después del entrenamiento.",
      precio: 29.99,
      imagen:
        "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/DesignerWhey_908g_DarkCookies_CreamFlavor_dunkel-bG7LJQ3b.jpg?v=1741937571&width=1018",
      categoria: "cat_proteinas",
    },
    {
      id: 2,
      nombre: "Proteína Vegana",
      descripcion: "Mezcla de proteínas vegetales con guisante, arroz y cáñamo. 22g de proteína por servicio, sin lactosa.",
      precio: 34.95,
      imagen:
        "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/IsoClear_908g_Blackberry_dunkel_1-ar4Cvug1.jpg?v=1741940835&width=1018",
      categoria: "cat_proteinas",
    },
    {
      id: 3,
      nombre: "Caseína Nocturna",
      descripcion: "Proteína de absorción lenta ideal para tomar antes de dormir. Favorece la recuperación muscular durante la noche.",
      precio: 32.5,
      imagen:
        "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/Recharge_1000g_Dose_GreenAppleFlavor_dunkel-0lqfYdjO.jpg?v=1741949291&width=1018",
      categoria: "cat_proteinas",
    },

    // Creatina
    {
      id: 4,
      nombre: "Creatina Monohidrato Micronizada",
      descripcion: "5g de creatina pura por servicio. Aumenta la fuerza y potencia muscular. Envase de 300g.",
      precio: 19.99,
      imagen: "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/Creatine_Creapure_250g-Cz0GIr_S.jpg?v=1747059397&width=1018",
      categoria: "cat_creatina",
    },
    {
      id: 5,
      nombre: "Creatina HCL",
      descripcion: "Fórmula de clorhidrato más soluble y sin retención de líquidos. Envase de 120 cápsulas.",
      precio: 24.95,
      imagen:
        "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/UltrapureCreatine_500g_Beutel_Front-uRBco6S3.jpg?v=1741936330&width=1018",
      categoria: "cat_creatina",
    },

    // Pre-entrenos
    {
      id: 6,
      nombre: "Pre-Workout Explosivo",
      descripcion: "Fórmula con cafeína, beta-alanina y citrulina para máxima energía y bombeo muscular.",
      precio: 39.95,
      imagen:
        "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/CrankPumpPro_450g_StrawberryKiwiFlavor-vcLxMxcY.jpg?v=1744723124&width=1018",
      categoria: "cat_preentreno",
    },
    {
      id: 7,
      nombre: "Pre-Workout Sin Estimulantes",
      descripcion: "Potenciador de entrenamientos sin cafeína. Ideal para sesiones nocturnas o personas sensibles a los estimulantes.",
      precio: 34.5,
      imagen: "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/Crank_Ultimate_360g_OrangeSoda-bR5G4VkB.jpg?v=1743769026&width=1018",
      categoria: "cat_preentreno",
    },
    {
      id: 17,
      nombre: "Crank - Pre-Entrenamiento",
      descripcion:
        "Potenciador pre-entrenamiento con citrulina, cafeína, aminoácidos seleccionados y extractos de plantas, para tu experiencia de entrenamiento perfecta.",
      precio: 34.5,
      imagen:
        "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/Crank_380g_SourPowerFlavor_dunkel-33JXBS7V.jpg?v=1744615051&width=1018",
      categoria: "cat_preentreno",
    },
    {
      id: 18,
      nombre: "Crank Ultimate - Pre-Entrenamiento Máximo",
      descripcion:
        "3-en-1 pre-entrenamiento de refuerzo para la unidad final, el enfoque y la bomba - en la Battle Edition co-desarrollado y aprobado por Leonidas Arkona.",
      precio: 34.5,
      imagen: "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/Crank_Ultimate_360g_OrangeSoda-bR5G4VkB.jpg?v=1743769026&width=1018",
      categoria: "cat_preentreno",
    },
    {
      id: 19,
      nombre: "Perfect Pre",
      descripcion: "Potenciador de entrenamientos sin cafeína. Ideal para sesiones nocturnas o personas sensibles a los estimulantes.",
      precio: 34.5,
      imagen:
        "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/EnduranceLine_PerfectPre_720g_MildCactusFruitFlavor_dunkel-28YLsoDM.jpg?v=1742998676&width=1018",
      categoria: "cat_preentreno",
    },
    // Aminoácidos
    {
      id: 8,
      nombre: "BCAA 2:1:1",
      descripcion: "Mezcla de aminoácidos de cadena ramificada para tomar durante el entrenamiento. Previene el catabolismo muscular.",
      precio: 24.99,
      imagen:
        "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/EliteAminos_680g_BlueRaspberryFlavor-YCVo3tEL.jpg?v=1744894000&width=1018",
      categoria: "cat_aminoacidos",
    },
    {
      id: 9,
      nombre: "EAA Complete",
      descripcion: "Todos los aminoácidos esenciales en proporción óptima. Sabor limón. 30 servicios.",
      precio: 29.5,
      imagen:
        "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/AMINOS_400g_FreshCherryTeaFlavor-f633OQsb.jpg?v=1741937203&width=1018",
      categoria: "cat_aminoacidos",
    },
    {
      id: 10,
      nombre: "Glutamina Pura",
      descripcion: "5g de L-Glutamina por servicio. Mejora la recuperación y fortalece el sistema inmunológico.",
      precio: 22.75,
      imagen:
        "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/UltrapureL_Glutamin_500g_Beutel_NeutralFlavor_Front-p1yfftmy.jpg?v=1741936978&width=1018",
      categoria: "cat_aminoacidos",
    },

    // Vitaminas y Minerales
    {
      id: 11,
      nombre: "Multivitamínico Deportista",
      descripcion: "Fórmula completa de vitaminas y minerales adaptada a las necesidades de deportistas. 90 cápsulas.",
      precio: 18.95,
      imagen: "https://www.farma13.com/images/1631026.jpg",
      categoria: "cat_vitaminas",
    },
    {
      id: 12,
      nombre: "Vitamina D3 + K2",
      descripcion: "Combinación sinérgica para mejorar la absorción de calcio y la salud ósea. 60 cápsulas blandas.",
      precio: 15.5,
      imagen: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now00369/y/110.jpg",
      categoria: "cat_vitaminas",
    },
    {
      id: 13,
      nombre: "Magnesio Quelado",
      descripcion: "Magnesio de alta biodisponibilidad. Reduce calambres y mejora la recuperación muscular.",
      precio: 14.99,
      imagen: "https://www.solgar.es/media/catalog/product/cache/841564aa151c7256e353391159214053/1/2/12550133.jpg",
      categoria: "cat_vitaminas",
    },

    // Pérdida de Peso
    {
      id: 15,
      nombre: "CLA 1000mg",
      descripcion: "Ácido linoleico conjugado para favorecer la reducción de grasa corporal. 90 perlas.",
      precio: 21.5,
      imagen:
        "https://www.myprotein.es/images?url=https://static.thcdn.com/productimg/original/10530408-1854860399191184.jpg&format=webp&auto=avif&crop=1100,1200,smart",
      categoria: "cat_perdidapeso",
    },
    {
      id: 16,
      nombre: "Batido Sustitutivo",
      descripcion: "Batido completo y saciante para sustituir comidas. Rico en proteínas y bajo en calorías.",
      precio: 27.99,
      imagen:
        "https://images.ctfassets.net/z5siblnwi90s/5IffQtyd3r9GC8jfeAMW9N/ffe7e27a7c80fae4950e977d51db56f5/01-Front_Shot.jpg?fm=webp&w=1200&q=35",
      categoria: "cat_perdidapeso",
    },

    // Ropa accesorios
    {
      id: 20,
      nombre: "Calcetines para Atleta",
      imagen: "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/ESN_Socken_2024x2024_shop-Q_uFRWMK_1dc3e233-c9f9-4bf3-ad80-ae0407bdf1fd.jpg?v=1747221312&width=2024",
      precio: 7.90,
      categoria: "cat_ropaaccesorios",
      descripcion: "Calcetines deportivos diseñados para ofrecer comodidad y transpirabilidad durante entrenamientos intensos."
    },
    {
      id: 21,
      nombre: "Toalla de gimnasia",
      imagen: "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/ESN_handtuch_knick_v1_2024x2024_shop-BVGXNp8j_d08ed3f5-fcbd-4025-b85c-418e2892d2f2.jpg?v=1738741571&width=2024",
      precio: 14.90,
      categoria: "cat_ropaaccesorios",
      descripcion: "Toalla absorbente ideal para sesiones de entrenamiento, fabricada con materiales suaves y de secado rápido."
    },
    {
      id: 22,
      nombre: "Shaker",
      imagen: "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/StandardShaker_Black_2024x2024_shop-W1UrqMmK_99d1e518-de7d-42f8-b444-947d97d3c27b.jpg?v=1724997685&width=2024",
      precio: 4.90,
      categoria: "cat_ropaaccesorios",
      descripcion: "Shaker práctico para mezclar tus batidos de proteínas y suplementos de forma eficiente y sin grumos."
    },
    {
      id: 23,
      nombre: "Shaker Get Your Proteins",
      imagen: "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/Shaker_Black_GetYourProteins_Men_2024x2024_shop.jpg?v=1733848848&width=2024",
      precio: 4.90,
      categoria: "cat_ropaaccesorios",
      descripcion: "Shaker con diseño motivador 'Get Your Proteins', perfecto para tus mezclas antes o después del entrenamiento."
    },
    {
      id: 24,
      nombre: "Performance Bottle",
      imagen: "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/PerformanceBottle_750ml_2024x2024_shop_86e18828-b15e-4a41-b21c-26b8c42afc25.jpg?v=1710756304&width=2024",
      precio: 22.90,
      categoria: "cat_ropaaccesorios",
      descripcion: "Botella de alto rendimiento de 750 ml, resistente y con diseño ergonómico para mantenerte hidratado en el gimnasio."
    },
    {
      id: 25,
      nombre: "Backpack Army Style",
      imagen: "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/backpack2_2024x2024_shop-f844FbKB_df21c28f-78f1-4a26-8b8d-4fbf65a0b90d.jpg?v=1724253381&width=2024",
      precio: 119.90,
      categoria: "cat_ropaaccesorios",
      descripcion: "Mochila de estilo militar con amplio espacio de almacenamiento y durabilidad extrema para llevar tu equipo deportivo."
    },
    {
      id: 26,
      nombre: "Smartshake Reforce Stainless Steel",
      imagen: "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/Smartshake_Steel_2024x2024_shop_d33d1554-b7c3-444e-b6e5-a5c3025412b9.jpg?v=1710940566&width=2024",
      precio: 19.90,
      categoria: "cat_ropaaccesorios",
      descripcion: "Shaker de acero inoxidable con aislamiento térmico, ideal para mantener la temperatura de tus bebidas durante horas."
    },
    {
      id: 27,
      nombre: "Smartshake",
      imagen: "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/Smartshake_2024x2024_shop_ce0ccd92-5057-49d6-899c-edd055bb1eac.jpg?v=1710940571&width=2024",
      precio: 12.90,
      categoria: "cat_ropaaccesorios",
      descripcion: "Shaker versátil con compartimentos para suplementos y polvos, diseñado para facilitar tu nutrición en movimiento."
    },
    {
      id: 28,
      nombre: "Botella deportiva",
      imagen: "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/SportsBottle_2024x2024_shop_38b0e157-6f83-49a4-9048-11b4eb4f2b7b.jpg?v=1710940572&width=2024",
      precio: 4.90,
      categoria: "cat_ropaaccesorios",
      descripcion: "Botella ligera y ergonómica, perfecta para llevar al gimnasio o a actividades al aire libre."
    },
    {
      id: 29,
      nombre: "Botella Premium de Acero",
      imagen: "https://cdn.shopify.com/s/files/1/0845/1358/7515/files/ESN_Premium_Steel_Bottle_2024x2024_shop-zzo95SuI_c9745017-fdca-449d-bf63-9f7f2fc4e8b2.jpg?v=1747221066&width=2024",
      precio: 19.90,
      categoria: "cat_ropaaccesorios",
      descripcion: "Botella de acero premium, elegante y duradera, ideal para mantener bebidas frías o calientes por más tiempo."
    }
  ];
   

  // Seed de direcciones para los usuarios
  await db.insert(Categorias).values(categorias).catch(console.error);
  await db.insert(Productos).values(productos).catch(console.error);
}
