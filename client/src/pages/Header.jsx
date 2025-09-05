import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const token = localStorage.getItem("token");

  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await api.get("/api/cart/my", {
        headers: { "x-auth-token": token },
      });
      setCartCount(res.data?.products?.length || 0);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer">
          <Link to="/dashboard">🌿 FarmAssist</Link>
        </div>

        {/* Links */}
        <div className="flex space-x-6 text-sm sm:text-base items-center">
          <Link
            to="/dashboard"
            className="hover:text-green-200 transition text-lg"
          >
            Dashboard
          </Link>

          {role === "user" && (
            <Link
              to="/shops"
              className="hover:text-green-200 transition text-lg"
            >
              Shops
            </Link>
          )}

          <Link to="/about" className="hover:text-green-200 transition text-lg">
            About
          </Link>

          <Link
            to="/profile"
            className="hover:text-green-200 transition text-lg"
          >
            Profile
          </Link>

          {/* Cart only for normal user */}
          {role === "user" && (
            <Link to="/cart" className="relative hover:text-green-200 transition text-lg">
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 rounded-full px-2 text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
