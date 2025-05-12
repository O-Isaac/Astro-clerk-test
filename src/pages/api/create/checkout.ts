// src/pages/api/create-checkout-session.ts

import { stripe } from "@/utils/stripe";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "MX", "ES"], // Agrega los países permitidos aquí
      },
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "T-shirt",
              images: ["https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"], // URL pública de la imagen
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:4321/check/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:4321/checkout`,
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
