// src/pages/api/create-checkout-session.ts

import { getProductosConCantidad } from "@/utils/database";
import { createLineItem, createSession } from "@/utils/stripe";
import type { APIRoute } from "astro";

const sendJson = (data: Record<string, number | string | undefined>) => {
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { userId } = locals.auth();
    
    const products = await request.json() as Record<string, number>;
    const productEntries = Object
      .entries(products)
      .map(([id, quantity]) => ([+id, quantity])) as Array<[number, number]>;

    const productsLine = await getProductosConCantidad(productEntries);
    const lineItems = productsLine.map(product => createLineItem(product, product.cantidad));

    const session = await createSession(lineItems, {
      userId: userId,
      products: JSON.stringify(productEntries.map(([id, quantity]) => ([+id, quantity])))
    });

    // Devuelve la URL para redirigir al usuario a Stripe Checkout
    return sendJson({ url: session.url! });
  } catch (err: unknown) {
    console.log(err)
    return sendJson({ url: "/checkout" });
  }
};
