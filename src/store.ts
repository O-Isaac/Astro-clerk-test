import { persistentAtom } from "@nanostores/persistent";

export type CartItem = {
  id: number;
  name: string;
  imageSrc: string;
  quantity: number;
  price: number;
};

export const shoppingCart = persistentAtom<CartItem[]>("cart", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const getTotalItems = (productArr?: CartItem[] | readonly CartItem[]) => {
  const products = productArr ? productArr : shoppingCart.get();
  return products.reduce((total, item) => total + item.quantity, 0);
};

export const getSubtotal = (productArr?: CartItem[] | readonly CartItem[]) => {
  const products = productArr ? productArr : shoppingCart.get();
  return products.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const addToCart = (item: CartItem) => {
  const cart = shoppingCart.get();
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    increaseQuantity(item.id, 1);
  } else {
    shoppingCart.set([...cart, item]);
  }
};

export const deleteFromCart = (itemId: number) => {
  const cart = shoppingCart.get();
  const updatedCart = cart.filter((item) => item.id !== itemId);

  shoppingCart.set(updatedCart);
};

export const clearCart = () => {
  shoppingCart.set([]);
};

export const increaseQuantity = (itemId: number, quantity: number) => {
  const cart = shoppingCart.get();

  const updatedCart = cart.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        quantity: item.quantity + quantity,
      };
    }

    return item;
  });

  shoppingCart.set(updatedCart);
};

export const decreaseQuantity = (itemId: number, quantity: number) => {
  const cart = shoppingCart.get();
  const updatedCart = cart.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        quantity: item.quantity - quantity,
      };
    }

    return item;
  });

  shoppingCart.set(updatedCart);
};

shoppingCart.listen((cart) => {
  const cleanedCart = cart.filter((item) => item.quantity > 0);

  if (cleanedCart.length !== cart.length) {
    shoppingCart.set(cleanedCart);
  }
});
