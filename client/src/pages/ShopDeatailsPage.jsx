import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

function ShopDetailsPage() {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [shop, setShop] = useState(null);

  const fetchShopDetails = async () => {
    try {
      const shopRes = await api.get(`/api/shops/${shopId}`);
      setShop(shopRes.data);

      const productsRes = await api.get(`/api/products/shop/${shopId}`);
      setProducts(productsRes.data);
    } catch (err) {
      alert("❌ Failed to load shop details");
    }
  };

  const handleBuy = async (product) => {
    alert(`✅ You bought ${product.name} for ₹${product.price}`);
  };

  const handleAddToCart = async (product) => {
    try {
      // Retrieve token from secure storage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("❌ Please log in to add items to cart");
        return;
      }
      await api.post(
        "/api/cart/add",
        { productId: product._id },
        { headers: { "x-auth-token": token } }
      );
      alert(`✅ ${product.name} added to cart`);
    } catch (err) {
      alert(err.response?.data?.msg || "❌ Failed to add to cart");
    }
  };

  useEffect(() => {
    fetchShopDetails();
  }, [shopId]);

  return (
    <div className="p-6">
      {shop && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{shop.name}</h2>
          <p className="text-gray-600">{shop.address}</p>
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2">Products</h3>
      {products.length === 0 ? (
        <p className="text-gray-500">No products yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((p) => (
            <li
              key={p._id}
              className="border p-3 rounded shadow text-center flex flex-col justify-between"
            >
              <p className="font-bold text-sm">{p.name}</p>
              <p className="text-sm">₹{p.price}</p>
              <p className="text-xs text-gray-500 truncate">{p.description}</p>
              <button
                onClick={() => handleBuy(p)}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded text-sm"
              >
                🛒 Buy
              </button>
              <button
                onClick={() => handleAddToCart(p)}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-sm ml-2"
              >
                ➕ Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShopDetailsPage;
