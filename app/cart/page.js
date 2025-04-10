"use client";
import { useEffect, useState } from "react";
import axiosClient from "../services/axios";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const [cart, setCart] = useState({});
  const router = useRouter();

  const fetchCart = async () => {
    try {
      const res = await axiosClient.get("carts/");
      setCart(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(cart);

  useEffect(() => {
    fetchCart();
  }, []);

  const saveCart = async () => {
    if (cart && cart.items?.length > 0) {
      const data = cart.items.map((item) => {
        return { product: item.product_id, quantity: item.quantity };
      });
      try {
        await axiosClient.put("carts/", { items: data });
        toast.success("Your cart updated successfully!");
      } catch (err) {
        toast.error("An error has occurred.");
      }
    }
  };

  const placeOrder = async () => {
    if (cart && cart.items?.length > 0) {
      const data = cart.items.map((item) => {
        return { product: item.product_id, quantity: item.quantity };
      });
      try {
        await axiosClient.post("orders/", {
          items: data.filter((item) => item.quantity > 0),
        });
        await axiosClient.put("carts/", {
          items: data.map((item) => {
            return { product: item.product, quantity: 0 };
          }),
        });
        toast.success("Your order has been created successfully!");
        router.push("/order");
      } catch (err) {
        toast.error("An error has occurred.");
      }
    }
  };

  const handleQuantityChange = (index, quantity) => {
    setCart((prev) => {
      const updatedItems = prev.items.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: quantity,
              subtotal: item.product_price * quantity,
            }
          : item
      );
      const updatedTotal = updatedItems.reduce(
        (sum, item) => sum + item.subtotal,
        0
      );
      return { ...prev, items: updatedItems, total_price: updatedTotal };
    });
  };

  return (
    <div className="p-8">
      <h3 className="text-2xl font-semibold text-center">Your Cart</h3>
      <div className="flex flex-col xl:flex-row items-start">
        <div className="w-full xl:w-2/3 p-8">
          {cart?.items?.map((item, index) =>
            item.quantity > 0 ? (
              <div
                key={index}
                id={index}
                className="flex items-center p-4 border-b"
              >
                <div className="flex items-center w-2/5">
                  <img
                    src={process.env.NEXT_PUBLIC_BASE_URL + item.product_image}
                    alt={item.product_name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">
                      {item.product_name}
                    </h4>
                    <p className="text-gray-600">
                      Price: ${item.product_price}
                    </p>
                  </div>
                </div>
                <div className="flex gap-8 items-center w-2/5">
                  <p className="text-lg text-gray-600">Quantity:</p>
                  <div className="flex gap-4 items-center">
                    <button
                      className="border rounded bg-zinc-100 px-4 py-2"
                      onClick={() =>
                        handleQuantityChange(index, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      step={1}
                      value={item.quantity}
                      className="w-16 text-center"
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                    <button
                      className="border rounded bg-zinc-100 px-4 py-2"
                      onClick={() =>
                        handleQuantityChange(index, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="w-1/5">
                  <p className="text-lg font-semibold">
                    Subtotal: ${item.subtotal}
                  </p>
                </div>
                <Trash
                  className="text-red-400 cursor-pointer"
                  onClick={() => handleQuantityChange(index, 0)}
                />
              </div>
            ) : null
          )}
        </div>
        {cart.items?.length > 0 && (
          <div className="w-full xl:w-1/3 bg-zinc-100 p-12">
            <h2 className="text-3xl font-semibold mb-4">
              Total price:{" "}
              <span className="text-green-500">${cart.total_price}</span>
            </h2>
            <button
              className="bg-yellow-300 px-3 py-3 rounded-lg text-lg mr-4"
              onClick={placeOrder}
            >
              Place Order
            </button>
            <button
              className="bg-red-300 px-3 py-3 rounded-lg text-lg"
              onClick={saveCart}
            >
              Save Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
