import Link from "next/link";
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="h-full bg-gray-800 text-white flex flex-col items-center px-10 py-4">
      <div className="flex justify-between items-center w-full max-w-sm mb-5">
        <Link className="hover:text-gray-400" href="/">
          Home
        </Link>
        <Link className="hover:text-gray-400" href="/">
          About
        </Link>
        <Link className="hover:text-gray-400" href="/">
          Shop
        </Link>
        <Link className="hover:text-gray-400" href="/">
          Contact
        </Link>
      </div>
      <div className="flex justify-center items-center w-full max-w-xl text-center">
        <FaFacebook className="text-2xl mx-2 hover:text-gray-400" />
        <FaInstagramSquare className="text-2xl mx-2 hover:text-gray-400" />
        <FaTwitter className="text-2xl mx-2 hover:text-gray-400" />
      </div>
      <p className="text-sm text-gray-400 mt-4">&copy; E-commerce App, 2025</p>
    </footer>
  );
};

export default Footer;
