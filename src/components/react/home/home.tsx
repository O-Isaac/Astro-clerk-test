import { HeroParallax } from "./hero-parallax";

interface Productos {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria: string;
}

interface Props {
    products: Productos[];
}

const Home: React.FC<Props> = ({ products }) => {
    const productos = products.map(p => {
        return {
            title: p.nombre,
            link: `/product/${p.id}`,
            thumbnail: p.imagen,
        }
    })
    return (
        <section className="-mt-90">
            <HeroParallax products={productos} />   
        </section>
    )
}

export default Home;