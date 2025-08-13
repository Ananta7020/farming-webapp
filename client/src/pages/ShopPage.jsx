import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

function ShopsPage() {
  const [shop, setShop] = useState([]);
  const [role, setRole] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // ✅ create navigate

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setRole(user.role);
    }
  }, []);

  const getShops = async () => {
    try {
      const res = await api.get("/api/shops");
      setShop(res.data);
      console.log("All shops:", res.data);
    } catch (err) {
      alert(err.response?.data?.msg || "❌ Failed to load shops.");
    }
  };

  const getMyShop = async () => {
    try {
      const res = await api.get("/api/shops/myshop", {
        headers: { "x-auth-token": token },
      });
      setShop([res.data]); // Wrap in array so `.map()` works
      console.log("My shop:", res.data);
    } catch (err) {
      alert(err.response?.data?.msg || "❌ Failed to load my shop.");
    }
  };

  useEffect(() => {
    if (role === "shopkeeper") {
      getMyShop();
    } else {
      getShops();
    }
  }, [role]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        {role === "shopkeeper" ? "My Shop 🏪" : "Available Shops 🛒"}
      </h2>

      {shop.length === 0 ? (
        <p className="text-gray-500">No shops found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {shop.map((s) => (
            <div
              key={s._id}
              className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer"
              onClick={() => navigate(`/shops/${s._id}`)} // ✅ go to details page
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
