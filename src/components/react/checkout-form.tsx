import { useId, useState } from "react";

import { useIsClient } from "@/hooks/useIsClient";
import StripeIcon from "@/icons/react/stripe";
import type { CartItem } from "@/store";

const CheckoutForm: React.FC = () => {
  const { cartItems, subtotal, updateQuantity, removeItemFromCart } = useCart();
  const items = Object.values(cartItems);
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <section className="relative w-full min-h-dvh border-t border-green-500/30 overflow-hidden">
      <BlurBackground />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-6xl font-bold text-center mb-8">Resumen del Pedido</h2>
        {items.length === 0 ? (
          <EmptyCartMessage />
        ) : (
          <CartItemsList items={items} updateQuantity={updateQuantity} removeItemFromCart={removeItemFromCart} subtotal={subtotal} />
        )}
        <StripeNotice />
      </div>
    </section>
  );
};

const BlurBackground = () => (
  <div className="absolute left-1/2 -translate-x-1/2 w-full aspect-square rounded-full bg-green-900/20 blur-[200px] -z-10" />
);

const EmptyCartMessage = () => <p className="text-2xl text-center font-light text-gray-300">Tu carrito está vacío.</p>;

interface CartItemsProps {
  items: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeItemFromCart: (id: string) => void;
  subtotal: number;
}

const CartItemsList: React.FC<CartItemsProps> = ({ items, updateQuantity, removeItemFromCart, subtotal }) => {
  const id = useId();

  return (
    <div className="grid gap-8 max-w-4xl mx-auto">
      {items.map((item) => (
        <CartItem key={item.id + id} item={item} updateQuantity={updateQuantity} removeItemFromCart={removeItemFromCart} />
      ))}
      <TotalAmount subtotal={subtotal} />
      <ProceedToPaymentButton />
    </div>
  );
};
interface CartItemProps {
  item: CartItem;
  updateQuantity: (id: string, delta: number) => void;
  removeItemFromCart: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeItemFromCart }) => (
  <div className="flex items-center justify-between p-4 border border-white/10 rounded-xl bg-white/5 backdrop-blur gap-4">
    {item.imageSrc && <img src={item.imageSrc} alt={item.name} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />}
    <div className="flex-1">
      <h3 className="text-2xl font-semibold">{item.name}</h3>
      <p className="text-gray-400 text-sm">Testing</p>
      <div className="mt-2 flex items-center gap-3">
        <button className="px-2 py-1 rounded bg-white/10 hover:bg-white/20" onClick={() => updateQuantity(item.id, -1)}>
          −
        </button>
        <span className="min-w-[2rem] text-center">{item.quantity}</span>
        <button className="px-2 py-1 rounded bg-white/10 hover:bg-white/20" onClick={() => updateQuantity(item.id, 1)}>
          +
        </button>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xl font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
      <button className="text-red-400 text-sm mt-1 hover:underline" onClick={() => removeItemFromCart(item.id)}>
        Quitar
      </button>
    </div>
  </div>
);

const TotalAmount = ({ subtotal }: { subtotal: number }) => (
  <div className="text-right text-3xl font-bold text-white mt-4">Total: ${subtotal.toFixed(2)}</div>
);

const ProceedToPaymentButton = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/create/checkout");

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error al iniciar el checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleCheckout}
      className="flex items-center justify-center gap-2 w-full mt-8 bg-stripe-blue-600 text-white text-xl font-semibold py-4 rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden bg-indigo-800 hover:bg-indigo-900 disabled:bg-indigo-900"
    >
      <StripeIcon />
      Proceder al Pago
    </button>
  );
};

const StripeNotice = () => (
  <p className="text-center text-gray-400 text-lg mt-4">
    Todos los datos de envío y facturación serán procesados de manera segura a través de Stripe.
  </p>
);

export default CheckoutForm;
