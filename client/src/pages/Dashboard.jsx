import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // Default dashboard menu view
  return (
    <div className="bg-green-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-800">
        Farming Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link
          to="/crops"
          className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">🌾</span>
          <h2 className="text-xl font-medium text-green-800">My Farm</h2>
        </Link>

        <Link
          to="/weather"
          className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">☁️</span>
          <h2 className="text-xl font-medium text-green-800">Weather</h2>
        </Link>

        <Link
          to="/marketprice"
          className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">🏪</span>
          <h1 className="text-xl font-medium text-gray-800">Marketprice</h1>
        </Link>

        <Link
          to="/fertilizerandpesticide"
          className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">💊 </span>
          <h1 className="text-xl font-medium text-gray-800">
            Fertilizer and Pesticide
          </h1>
        </Link>

        <Link
          to="/expence"
          className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">💸 </span>
          <h1 className="text-xl font-medium text-gray-800">Expence Tracker</h1>
        </Link>

        <Link
          to="/tips"
          className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">💡 </span>
          <h1 className="text-xl font-medium text-gray-800">Tips</h1>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
