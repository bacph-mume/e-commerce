import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import AuthLink from "./AuthLink";

const Navbar = () => {
  return (
    <nav className="px-4 md:px-12 py-4 md:py-6 bg-white text-black">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold hidden md:inline-block">
          E-commerce
        </Link>
        <div className="relative max-w-[300px] md:w-[400px]">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="h-[36px] pl-10 border border-black/[0.7] rounded-lg text-sm w-full py-2 px-3 focus:outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-4">
          <AuthLink />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
