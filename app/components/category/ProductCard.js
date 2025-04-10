import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.slug}`} className="">
      <div className="border rounded-xl h-80 relative">
        <div className="relative w-full h-4/5 overflow-hidden rounded-t-xl bg-gray-600">
          <Image
            src={
              product.image.includes("http")
                ? product.image
                : `http://localhost:9000${product.image}`
            }
            alt={product.name}
            fill
            className="object-contain object-center top-0 left-0"
          />
        </div>
        <div className="absolute w-full h-1/5 bottom-0 left-0 bg-zinc-200 text-black px-2 py-2 rounded-b-xl text-center text-xl">
          <p>{product.name}</p>
          <p className="text-lg">$ {product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
