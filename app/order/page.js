"use client";
import { useEffect, useState } from "react";
import axiosClient from "../services/axios";

const OrderPage = () => {
  const [orders, setOrder] = useState([]);

  const fetchOrder = async () => {
    const res = await axiosClient.get("orders/");
    setOrder(res.data);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  console.log(orders);

  return (
    <div className="p-8">
      <h3 className="text-2xl font-semibold text-center">Your Order History</h3>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Order ID
              </th>
              <th scope="col" class="px-6 py-3">
                Details
              </th>
              <th scope="col" class="px-6 py-3">
                Total price
              </th>
              <th scope="col" class="px-6 py-3">
                Created at
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.order_id}
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                >
                  {order.order_id}
                </th>
                <td class="px-6 py-4">
                  {order.items.map((item) => (
                    <p>
                      <spam className="text-md text-gray-900  font-semibold">
                        {item.product_name}
                      </spam>{" "}
                      x {item.quantity}
                    </p>
                  ))}
                </td>
                <td class="px-6 py-4 text-gray-900 font-semibold">
                  ${order.total_price}
                </td>
                <td class="px-6 py-4">{order.created_at}</td>
                <td class="px-6 py-4">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
