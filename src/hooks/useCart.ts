import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { cartItems, isCartOpen, type CartItem } from "@/store";

export function useCart() {
  const $cartItems = useStore(cartItems);
  const $isCartOpen = useStore(isCartOpen);

  useEffect(() => {
    const raw = localStorage.getItem("cartItems");
    if (raw) {
      try {
        cartItems.set(JSON.parse(raw));
      } catch {
        cartItems.set({});
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify($cartItems));
  }, [$cartItems]);

  const addCartItem = (item: Omit<CartItem, "quantity">) => {
    const existing = cartItems.get()[item.id];
    cartItems.setKey(item.id, {
      ...item,
      quantity: existing ? existing.quantity + 1 : 1,
    });
  };

  const removeCartItem = (id: string) => {
    const existing = cartItems.get()[id];
    if (!existing) return;

    if (existing.quantity > 1) {
      cartItems.setKey(id, { ...existing, quantity: existing.quantity - 1 });
    } else {
      cartItems.setKey(id, undefined);
    }
  };

  const removeItemFromCart = (id: string) => {
    const existing = cartItems.get()[id];
    if (!existing) return;

    cartItems.setKey(id, undefined);
  };

  const updateQuantity = (id: string, delta: number) => {
    const existing = cartItems.get()[id];
    if (!existing) return;

    const nextQty = existing.quantity + delta;
    if (nextQty > 0) {
      cartItems.setKey(id, { ...existing, quantity: nextQty });
    } else {
      cartItems.setKey(id, undefined);
    }
  };

  const clearCart = () => {
    cartItems.set({});
  };

  const totalItems = Object.values($cartItems).reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = Object.values($cartItems).reduce((sum, item) => sum + item.quantity * item.price, 0);

  return {
    cartItems: $cartItems,
    isCartOpen: $isCartOpen,
    setCartOpen: isCartOpen.set,
    totalItems,
    subtotal,
    addCartItem,
    removeCartItem,
    updateQuantity,
    clearCart,
    removeItemFromCart,
  };
}
