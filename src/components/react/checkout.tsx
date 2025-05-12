"use client";

import { Drawer } from "vaul";
import { useCart } from "@/hooks/useCart";
import CartIcon from "@/icons/react/cart";

interface CartItemProps {
  image: string;
  title: string;
  price: number;
  color: string;
  quantity: number;
  id: string;
}

const CartItem: React.FC<CartItemProps> = ({ image, title, price, color, quantity, id }) => {
  const { updateQuantity, removeItemFromCart } = useCart();

  return (
    <li className="flex py-6">
      <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img src={image} alt={title} width={96} height={96} className="size-full object-cover" />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="/">{title}</a>
            </h3>
            <p className="ml-4">{price.toFixed(2)}€</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{color}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm mt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => updateQuantity(id, -1)}
              className="px-2 py-1 bg-blue-500 rounded hover:bg-blue-600 cursor-pointer"
            >
              −
            </button>
            <span className="text-gray-900">{quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(id, 1)}
              className="px-2 py-1 bg-blue-500 rounded hover:bg-blue-600 cursor-pointer"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeItemFromCart(id)}
            className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500"
          >
            Quitar
          </button>
        </div>
      </div>
    </li>
  );
};

const Checkout: React.FC = () => {
  const { cartItems, subtotal, setCartOpen } = useCart();

  const totalQuantity = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);

  return (
    <Drawer.Root defaultOpen={false} direction="right">
      <Drawer.Trigger className="hover:opacity-90 hover:cursor-pointer p-2 ">
        <div className="flex items-center justify-center relative">
          <CartIcon />
          {totalQuantity > 0 && <span className="text-xs font-bold text-white bg-red-500 rounded-full px-2 py-1">{totalQuantity}</span>}
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col rounded-l-[10px] mt-24 min-h-dvh fixed bottom-0 right-0 outline-none z-50 w-full max-w-md shadow-xl">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <Drawer.Title className="text-lg font-medium text-gray-900">Carrito de compras</Drawer.Title>
              <Drawer.Close asChild>
                <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" aria-label="Cerrar panel">
                  <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </Drawer.Close>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {Object.values(cartItems).map((item) => (
                    <CartItem
                      id={item.id}
                      key={item.id}
                      image={item.imageSrc}
                      title={item.name}
                      price={item.price}
                      color={"Azul"}
                      quantity={item.quantity}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{subtotal.toFixed(2)}€</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">El envío y los impuestos se calculan al finalizar la compra.</p>
            <div className="mt-6">
              <a
                href="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
              >
                Finalizar compra
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                o{" "}
                <Drawer.Close asChild>
                  <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Seguir comprando <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Drawer.Close>
              </p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default Checkout;
