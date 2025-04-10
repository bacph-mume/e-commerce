"use client";
import axiosClient from "@/app/services/axios";
import { useAuth } from "@/context/authContext";
import { History } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImCart } from "react-icons/im";
import { toast } from "react-toastify";

const AuthLink = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      const refresh_token = localStorage.getItem("refresh");
      const res = await axiosClient.post("users/logout/", {
        refresh: refresh_token,
      });
      toast.success(res.data.message);
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Link href="/order">
            <History className="w-6 h-6 text-black" />
          </Link>
          <Link href="/cart">
            <ImCart className="w-6 h-6 text-black" />
          </Link>
          <button
            className="border bg-zinc-500 p-2 rounded-lg text-white hover:bg-blue-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/signup">
            <button>Sign Up</button>
          </Link>
          <Link href="/login">
            <button className="px-3 py-2 ml-4 rounded-md cursor-pointer bg-green-500 text-white">
              Log In
            </button>
          </Link>
        </>
      )}
    </>
  );
};

export default AuthLink;
