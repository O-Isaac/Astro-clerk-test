// src/utils/stripe.ts
import type { ValidRedirectStatus } from "astro";
import type { Productos } from "astro:db";
import Stripe from "stripe";

type LineItems = Stripe.Checkout.SessionCreateParams.LineItem[];
type Redirect = (path: string, status?: ValidRedirectStatus) => Response

export const stripe = new Stripe(import.meta.env.PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

/**
 * Creates a checkout session
 * @param line_items Line items for the session
 * @param metadata Metadata for the session
 * @returns Checkout session
 */
export const createSession = (line_items: LineItems, metadata: Stripe.MetadataParam) => stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  shipping_address_collection: {
    allowed_countries: ["US", "CA", "MX", "ES"], // Agrega los países permitidos aquí
  },
  line_items,
  mode: "payment",
  success_url: `http://localhost:4321/checkout/{CHECKOUT_SESSION_ID}`,
  cancel_url: `http://localhost:4321/checkout`,
  metadata,
  invoice_creation: {
    enabled: true,
    invoice_data: {
    },
  },
  locale: "es"
})

/**
 * Creates a line item for a product
 * @param product Product from database
 * @param quantity Quantity of the product
 * @returns Line Item for Stripe
 */
export const createLineItem = (product: typeof Productos.$inferSelect, quantity: number) => {
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


/**
 * Gets the session data from Stripe
 * @param sessionId Session ID
 * @param redirect Redirect function
 * @returns Session data
 */
export const getSessionData = async (sessionId: string, userId: string, redirect: Redirect) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.metadata) {
      if (session.metadata.userId !== userId) {
        return redirect("/", 302);
      }
    }

    return { session };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error)
      if (!error.message.includes("No such checkout.session")) {
        console.log(error.message);
      }
    }
    
    return redirect("/", 302);
  }
}

/**
 * Formats the shipping address
 * @param shipping Collected information shipping details
 * @returns Formatted shipping address
 */
export const formatShipping = (shipping: Stripe.Checkout.Session.CollectedInformation.ShippingDetails | null | undefined) => {
  if (!shipping) {
    return "";
  }

  return `${shipping.name} ${shipping.address?.line1}, ${shipping.address?.city}, ${shipping.address?.state}, ${shipping.address?.postal_code}`;
}