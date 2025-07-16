import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

function AddShopPage() {
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", address: "" });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchMyShop = async () => {
    try {
      const res = await api.get("/api/shops/myshop", {
        headers: { "x-auth-token": token },
      });
      setShop(res.data);
      fetchProducts(res.data._id); // get products
    } catch (err) {
      setShop(null);
    }
  };

  const fetchProducts = async (shopId) => {
    try {
      const res = await api.get(`/api/products/shop/${shopId}`);
      setProducts(res.data);
    } catch {
      alert("❌ Failed to fetch products");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await api.post("/api/shops", form, {
        headers: { "x-auth-token": token },
      });
      alert("✅ Shop added successfully");
      fetchMyShop();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to add shop");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("❌ Failed to delete product");
    }
  };

  useEffect(() => {
    fetchMyShop();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold text-green-700 mb-4">🏪 My Shop</h2>

      {/* SHOP VIEW */}
      {shop ? (
        <>
          <div className="mb-4">
            <p className="text-lg font-semibold text-green-800">
              {shop.name}
            </p>
            <p className="text-gray-600">{shop.address}</p>
          </div>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded mb-6"
            onClick={() => navigate("/addproduct")}
          >
            ➕ Add Product
          </button>

          <h3 className="text-lg font-semibold mb-2">📦 Your Products</h3>
          {products.length === 0 ? (
            <p className="text-gray-500">No products added yet.</p>
          ) : (
            <ul className="space-y-4">
              {products.map((product) => (
                <li
                  key={product._id}
                  className="border p-4 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      ₹{product.price} — {product.description}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    🗑 Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <input
            type="text"
            name="name"
            placeholder="Shop Name"
            className="mb-3 w-full p-2 border rounded"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Shop Address"
            className="mb-4 w-full p-2 border rounded"
            value={form.address}
            onChange={handleChange}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            ➕ Add Shop
          </button>
        </>
      )}
    </div>
  );
}

export default AddShopPage;
