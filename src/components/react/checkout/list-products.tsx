import StripeIcon from "@/icons/react/stripe";
import { decreaseQuantity, getSubtotal, increaseQuantity, shoppingCart } from "@/store";
import { error, info } from "@/utils/logger";
import { useStore } from "@nanostores/react";
import { useState } from "react";

export const ListProducts = () => {
  const [disabled, setDisabled] = useState(false);
  const cart = useStore(shoppingCart);
  const subtotal = getSubtotal(cart);

  /**
   * Es necesario llama la ruta /api/create/checkout
   * para crear la session de payment y luego redirigir a la session de
   * compra
   */
  const createPaymentSession = async () => {
    info("Obteniendo enlace de pago.");
    setDisabled(true);

    try {
      const body = Object.fromEntries(cart.map((product) => [product.id, product.quantity]));
      const request = await fetch("/api/create/checkout", {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (request.ok) {
        const { url } = await request.json();
        window.location.href = url;
      }
    } catch (err) {
      if (err instanceof Error) {
        error(err.message);
      }
    } finally {
      setDisabled(false);
    }
  };

  return (
    <section className="container mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-gray-200">
          <thead>
            <tr className="">
              <th className="p-4">#</th>
              <th className="p-4">Imagen</th>
              <th className="p-4">Nombre</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Cantidad</th>
              <th colSpan={2} className="p-4">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index} className="">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">
                  <img src={item.imageSrc} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                </td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.price.toFixed(2)}€</td>
                <td className="p-4">{item.quantity}</td>
                <td className="p-4">{(item.price * item.quantity).toFixed(2)}€</td>
                <td className="p-4">
                  <button
                    onClick={() => increaseQuantity(item.id, 1)}
                    className="text-3xl mr-4 hover:opacity-80 cursor-pointer aspect-square size-10 text-center"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decreaseQuantity(item.id, 1)}
                    className="text-3xl hover:opacity-80 cursor-pointer aspect-square size-10 text-center"
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-xl font-semibold">
              <td
                className="border-t-2 group border-indigo-500 bg-indigo-800 hover:bg-indigo-900 disabled:bg-indigo-900 rounded-bl-2xl"
                colSpan={4}
              >
                <button
                  disabled={disabled}
                  onClick={createPaymentSession}
                  className="flex group items-center justify-center gap-2 w-full text-white text-xl font-semibold py-4 rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden "
                >
                  <StripeIcon />
                  Proceder al Pago
                </button>
              </td>
              <td colSpan={3} className="text-center bg-amber-900 rounded-br-2xl border-t-2 border-amber-500">
                Subtotal {subtotal.toFixed(2)}€
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default ListProducts;
