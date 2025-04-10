"use client";

import ProductCard from "@/app/components/category/ProductCard";
import axiosClient from "@/app/services/axios";
import { use, useEffect, useState } from "react";

const CategoryPage = ({ params }) => {
  const { slug } = use(params);

  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    const res = await axiosClient.get(`products/category/${slug}`);

    setProducts(res.data.results);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="w-3/4">
      <h3 className="text-center font-bold text-xl">{slug.toUpperCase()}</h3>
      {products.length === 0 && (
        <div className="px-8 md:px-12 py-5 md:py-10">No product found</div>
      )}
      <div className="px-8 md:px-12 py-5 md:py-10 flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
