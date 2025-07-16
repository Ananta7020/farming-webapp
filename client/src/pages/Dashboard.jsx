import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setRole(user.role);
    }
  }, []);

  return (
    <div className="bg-green-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-800">Farming Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/crops')}
          className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">🌾</span>
          <h2 className="text-xl font-medium text-green-800">My Farm</h2>
        </button>

        <button
          onClick={() => navigate('/weather')}
          className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">☁️</span>
          <h2 className="text-xl font-medium text-green-800">Weather</h2>
        </button>

        <button
          onClick={()=> navigate("/marketprice")}
          className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">🏪</span>
          <h1 className="text-xl font-medium text-gray-800">Marketprice</h1>
        </button>

        <button
          onClick={()=> navigate("/fertilizerandpesticide")}
          className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">💊 </span>
          <h1 className="text-xl font-medium text-gray-800">Fertilizer and Pesticide</h1>
        </button>

        <button
          onClick={()=> navigate("/expence")}
          className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">💸 </span>
          <h1 className="text-xl font-medium text-gray-800">Expense Tracker</h1>
        </button>

        <button
          onClick={()=> navigate("/tips")}
          className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">💡 </span>
          <h1 className="text-xl font-medium text-gray-800">Tips</h1>
        </button>

        {/* ✅ Show Add Shop button only for shopkeeper */}
        {role === 'shopkeeper' && (
          <button
            onClick={() => navigate("/addshop")}
            className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
          >
            <span className="text-5xl mb-2">🏬</span>
            <h1 className="text-xl font-medium text-gray-800">Add Shop</h1>
          </button>
        )}

      </div>
    </div>
  );
}

export default Dashboard;
