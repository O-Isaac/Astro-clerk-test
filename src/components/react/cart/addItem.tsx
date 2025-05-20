import { addToCart } from "@/store";
import { toast } from "sonner"


interface AddToCartProps {
    id: number;
    imageSrc: string;
    name: string;
    price: number;
    quantity: number;
    className?: string;
}


const AddToCart: React.FC<AddToCartProps> = ({ id, imageSrc, name, price, quantity, className }) => {
  const handlerAddToCart = () => {
    toast.success(`${name} agregado al carrito`)
    addToCart({ id, imageSrc, name, price, quantity });
  }

  return (
    <button onClick={handlerAddToCart} className={className}>Add to cart</button>
  );
};

export default AddToCart;
