"use client";

import ProductCard from "@/app/components/category/ProductCard";
import axiosClient from "@/app/services/axios";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductDetailPage = ({ params }) => {
  const { slug } = use(params);

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    const res = await axiosClient.get(`products/${slug}`);
    setProduct(res.data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const addToCart = async () => {
    try {
      await axiosClient.post("carts/add/", { product: product.id, quantity });
      toast.success("This product has been added to your cart");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className="w-full md:w-3/4">
      <div className="px-8 md:px-12 py-5 md:py-10 flex justify-center items-start">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={600}
          className="rounded-xl object-cover object-center w-1/2"
        />
        <div className="flex flex-col justify-start items-start w-1/2 px-12">
          <h3 className="text-center font-bold text-xl">{product.name}</h3>
          <p className="text-gray-700 text-lg mt-2">{product.description}</p>
          <p className="text-gray-700 text-lg mt-2">Price: ${product.price}</p>
          <div className="flex gap-4 items-center mt-4">
            <button
              className="border rounded bg-zinc-200 px-4 py-2"
              onClick={() => setQuantity(Math.max(0, quantity - 1))}
            >
              -
            </button>
            <input
              type="number"
              step={1}
              min={0}
              value={quantity}
              className="w-16 text-center py-2"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <button
              className="border rounded bg-zinc-200 px-4 py-2"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
            <button
              className="bg-green-500 text-white px-2 py-2 rounded-md"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {product.relative_products?.length > 0 && (
        <div className="px-8 md:px-12 py-5 md:py-10 flex flex-col items-start">
          <h3 className="text-2xl font-semibold">Relative Product</h3>
          <div className="px-2 md:px-4 py-5 flex justify-center items-center w-full">
            <div className="grid grid-cols-2 md:grid-cols-4  gap-5 w-full">
              {product.relative_products?.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
