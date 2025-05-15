// src/pages/api/create-checkout-session.ts

import { stripe } from "@/utils/stripe";
import type { APIRoute } from "astro";
import { db, Productos, inArray, eq } from "astro:db";

const transformToLine = (product: typeof Productos.$inferSelect, quantity: number) => {

  return {
    price_data: {
      currency: "eur",
      product_data: {
        name: product.nombre,
        images: [product.imagen], // URL pública de la imagen
      },
      unit_amount: Math.floor(100 * product.precio),
    },
    quantity,
  };
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const products = await request.json();
    const productEntries = Object.entries(products);
    const productData = await db
      .select()
      .from(Productos)
      .where(inArray(Productos.id, productEntries.map(([id]) => Number(id))))
      .all();
  
    const productsLine = productEntries.map(([id, quantity]) => {
      const product = productData.find(p => p.id === +id);
  
      if (!product) {
        throw new Error("Product not found");
      }
      
      return transformToLine(product, quantity as number);
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "MX", "ES"], // Agrega los países permitidos aquí
      },
      line_items: productsLine,
      mode: "payment",
      success_url: `http://localhost:4321/checkout/{CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:4321/checkout`,
      invoice_creation: {
        enabled: true,
        invoice_data: {
          
        } 
      }
    });

    // Devuelve la URL para redirigir al usuario a Stripe Checkout
    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify({ error: "Unknown error" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
};
