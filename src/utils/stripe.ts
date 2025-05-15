// src/utils/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(import.meta.env.PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});
