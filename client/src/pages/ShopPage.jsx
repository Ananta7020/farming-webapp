import React, { useState, useEffect } from "react";
import { api } from "../services/api";

function ShopsPage() {
  const [shop, setShop] = useState([]);

  const getShops = async () => {
    try {
      const res = await api.get("/api/shops");
      setShop(res.data);
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.msg || "❌ Failed to load shops.");
    }
  };

  useEffect(() => {
    getShops();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Available Shops 🛒</h2>

      {shop.length === 0 ? (
        <p className="text-gray-500">No shops found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {shop.map((s) => (
            <div
              key={s._id}
              className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-4"
            >
              <h3 className="text-lg font-semibold text-green-700">{s.name}</h3>
              <p className="text-gray-600">📍 {s.address}</p>
              <p className="text-sm text-gray-400 mt-2">
                Owner: {s.ownerId?.name} ({s.ownerId?.email})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShopsPage;
