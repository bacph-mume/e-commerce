"use client"
import axiosClient from '@/app/services/axios'
import { useAuth } from '@/context/authContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'


const LoginPage = () => {
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token){
            router.push("/")
        }
    }
    , [])
    const {login} = useAuth()


    const onSubmit = async (data) => {
        try {
          const res = await axiosClient.post("api/token/", data);
          localStorage.setItem("token", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);
          login(res.data.access, res.data.refresh);
        } catch (err) {
            console.log(err);
          setError("Invalid credentials");
        }
      };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              {...register("username")}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {error && <p className="text-center text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <p className="text-center">
            Don't have account,{" "}
            <Link className="text-blue-500 cursor-pointer" href="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage