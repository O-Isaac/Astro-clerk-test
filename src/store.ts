import { atom, map } from "nanostores";

export type CartItem = {
  id: string;
  name: string;
  imageSrc: string;
  quantity: number;
  price: number;
};

type CartState = Record<string, CartItem>;

// Store atoms
export const isCartOpen = atom(false);
export const cartItems = map<CartState>({});
