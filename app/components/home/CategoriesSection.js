"use client";
import axiosClient from "@/app/services/axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CategoryCard = ({ category }) => {
  return (
    <Link href={`/category/${category.slug}`} className="">
      <div className="border rounded-xl h-80 relative">
        <div className="relative w-full h-4/5 overflow-hidden rounded-t-xl bg-gray-600">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover object-center top-0 left-0"
          ></Image>
        </div>
        <p className="absolute w-full h-1/5 bottom-0 left-0 bg-zinc-200 text-black px-2 py-2 rounded-b-xl text-center text-xl">
          {category.name}
        </p>
      </div>
    </Link>
  );
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategory = async () => {
    try {
      const res = await axiosClient.get("categories/");
      setCategories(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <section id="shop" className="py-12">
      <h4 className="text-2xl text-center mb-8">Shop by Category</h4>
      <div className="px-8 md:px-12 py-5 md:py-10 flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
