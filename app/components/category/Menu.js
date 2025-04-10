"use client";
import axiosClient from "@/app/services/axios";
import { useState, useEffect } from "react";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategory = async () => {
    const res = await axiosClient.get("categories/");
    setCategories(res.data.results);
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div className="hidden md:w-1/4 md:flex flex-col items-start justify-between px-8 rounded-xl bg-white">
      <h4 className="text-xl font-semibold py-2 mb-6 w-full border-b-2 border-gray-300">
        Category
      </h4>
      {categories.map((category) => (
        <a
          key={category.id}
          href={`/category/${category.slug}`}
          className="text-gray-700 hover:text-green-900 hover:font-semibold transition duration-300 mb-4 border-b border-dashed border-gray-300 w-full"
        >
          {category.name}
        </a>
      ))}
    </div>
  );
};

export default Menu;
