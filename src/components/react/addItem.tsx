import { useCart } from "@/hooks/useCart";
import { Fragment } from "react";

const items = [
  {
    id: 1,
    image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    title: "Bolso Retro",
    price: 90,
    color: "Salmón",
  },
  {
    id: 2,
    image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    title: "Bolso Mediano",
    price: 32,
    color: "Azul",
  },
];

const AddToCart: React.FC = () => {
  const { addCartItem } = useCart();

  function addToCart(e: any, item: (typeof items)[0]) {
    e.preventDefault();

    console.log("Adding to cart", item);

    addCartItem({
      id: item.id.toString(),
      name: item.title,
      imageSrc: item.image,
      price: item.price,
    });
  }

  return (
    <Fragment>
      <section className="flex flex-col items-center justify-center gap-5">
        {items.map((item) => {
          return (
            <button key={item.id} onClick={(e) => addToCart(e, item)} className="px-4 py-2 cursor-pointer rounded bg-blue-800 text-white">
              Add {item.title}
            </button>
          );
        })}
      </section>
    </Fragment>
  );
};

export default AddToCart;
