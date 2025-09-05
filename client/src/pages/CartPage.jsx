import React, { useEffect, useState } from "react";
import { api } from "../services/api";

function CartPage() {
  const [cart, setCart] = useState({ products: [] });
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await api.get("/api/cart/my", {
        headers: { "x-auth-token": token },
      });
      setCart(res.data);
    } catch (error) {
      alert("field to fetch cart");
    }
  };

  const handleRemove = async () => {
    try {
      await api.delete(`/api/cart/remove/${id}`, {
        headers: { "x-auth-token": token },
      });
      fetchCart();
    } catch (error) {
      alert("feild to remove item");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🛒 My Cart</h2>
      {cart.products.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.products.map((item) => (
            <li
              key={item.productId._id}
              className="border p-3 rounded flex justify-between"
            >
              <div>
                <p>{item.productId.name}</p>
                <p>
                  ₹{item.productId.price} × {item.quantity}
                </p>
              </div>
              <button
                onClick={() => handleRemove(item.productId._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* {cart.products.length > 0 && (
        <button
          onClick={handleCheckout}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded"
        >
          ✅ Checkout
        </button>
      )} */}
    </div>
  );
}

export default CartPage;