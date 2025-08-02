import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

function AddProductPage() {
  const { shopId } = useParams(); // get shopId from URL
  console.log(shopId);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await api.post(
        '/api/products/',
        { ...form, shopId },
        {
          headers: { "x-auth-token": token },
        }
      );
      alert("✅ Product added!");
      navigate("/addshop");
    } catch (err) {
      alert(err.response?.data?.msg || "❌ Failed to add product");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold text-green-700 mb-4">➕ Add Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        className="mb-3 w-full p-2 border rounded"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price (₹)"
        className="mb-3 w-full p-2 border rounded"
        value={form.price}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        className="mb-4 w-full p-2 border rounded"
        value={form.description}
        onChange={handleChange}
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}

export default AddProductPage;
