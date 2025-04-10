"use client";
import axiosClient from "@/app/services/axios";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SignupPage = () => {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await axiosClient.post("users/signup/", data);
      console.log(res);
      toast.success(res.data.message);
      router.push("/login");
    } catch (err) {
      console.log(err);
      setErrors(err.response.data);
    }
  };

  const credentials = [
    { label: "Username", name: "username", type: "text", required: true },
    { label: "Password", name: "password1", type: "password", required: true },
    {
      label: "Confirm Password",
      name: "password2",
      type: "password",
      required: true,
    },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "First Name", name: "first_name", type: "text", required: true },
    { label: "Last Name", name: "last_name", type: "text", required: true },
    { label: "Phone", name: "phone", type: "number", required: true },
    { label: "Address", name: "address", type: "text", required: false },
    { label: "City", name: "city", type: "text", required: false },
    { label: "State", name: "state", type: "text", required: false },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-1/3 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {credentials.map((field, i) => (
            <div key={i}>
              <div className="flex gap-6 items-center">
                <label className="block w-1/3 text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  {...register(field.name)}
                  className="border rounded px-3 py-2 w-2/3"
                  required={field.required}
                />
              </div>
              {errors[field.name] && (
                <p className="text-red-500 text-sm text-right mt-1">
                  {errors[field.name][0]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className=" bg-blue-500 text-white p-2 mx-52 rounded hover:bg-blue-600"
          >
            Sign up
          </button>
          <p className="text-center">
            Already have account,{" "}
            <Link className="text-blue-500 cursor-pointer" href="/login">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
