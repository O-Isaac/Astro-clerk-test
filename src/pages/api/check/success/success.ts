// src/pages/api/create-checkout-session.ts

import { stripe } from "@/utils/stripe";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  try {
    // Extrae los parámetros de la URL de la request
    const url = new URL(request.url);
    const sessionId = url.searchParams.get("session_id");

    if (sessionId) {
      // Recupera la sesión de Stripe usando el session_id
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      // Aquí puedes manejar la respuesta y enviar la dirección de envío u otros detalles
      const shippingDetails = session.custom_text.shipping_address;

      // Responde con la información o procesa lo que necesitas
      return new Response(
        JSON.stringify({
          message: "Session retrieved successfully",
          shippingDetails,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new Response(JSON.stringify({ error: "session_id is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
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
