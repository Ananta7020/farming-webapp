import React, { useState } from "react";
import CropPage from "./CropPages";
import WeatherPage from "./WeatherPage";
import MarketPrice from "./MarketPrice";
import FertilizerAndPesticide from "./FertilizerAndPesticide";
import ExpenseTracker from "./ExpenseTracker";
import Tips from "./Tips";

function Dashboard() {
  const [currentView, setCurrentView] = useState(null);

  // Back to dashboard list
  if (currentView === "weather") {
    return (
      <div className="p-4">
        <button
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => setCurrentView(null)}
        >
          ← Back
        </button>
        <WeatherPage />
      </div>
    );
  }

  if (currentView === "myfarm") {
    return (
      <div className="p-4">
        <button
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => setCurrentView(null)}
        >
          ← Back
        </button>
        <CropPage />
      </div>
    );
  }

  if(currentView==="marketprice"){
    return(
      <div className="p-4">
        <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={()=> setCurrentView(null)}
        >
           ← Back
        </button>
        <MarketPrice/>
      </div>
    )
  }

  if(currentView==="ferandpest"){
    return(
      <div className="p-4">
        <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={()=> setCurrentView(null)}
        >
           ← Back
        </button>
        <FertilizerAndPesticide/>
      </div>
    )
  }

  if(currentView==="expencetracker"){
    return(
      <div className="p-4">
        <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={()=> setCurrentView(null)}
        >
           ← Back
        </button>
        <ExpenseTracker/>
      </div>
    )
  }
  
  if(currentView==="tips"){
    return(
      <div className="p-4">
        <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={()=> setCurrentView(null)}
        >
           ← Back
        </button>
        <Tips/>
      </div>
    )
  }
  
  // Default dashboard menu view
  return (
    <div className="bg-green-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-800">Farming Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentView("myfarm")}
          className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">🌾</span>
          <h2 className="text-xl font-medium text-green-800">My Farm</h2>
        </button>

        <button
          onClick={() => setCurrentView("weather")}
          className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">☁️</span>
          <h2 className="text-xl font-medium text-green-800">Weather</h2>
        </button>

        <button
        onClick={()=> setCurrentView("marketprice")}
        className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">🏪</span>
          <h1 className="text-xl font-medium text-gray-800">Marketprice</h1>
        </button>

        <button
        onClick={()=> setCurrentView("ferandpest")}
        className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">💊 </span>
          <h1 className="text-xl font-medium text-gray-800">Fertilizer and Pesticide</h1>
        </button>
       
        <button
        onClick={()=> setCurrentView("expencetracker")}
        className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">💸 </span>
          <h1 className="text-xl font-medium text-gray-800">Expence Tracker</h1>
        </button>
        
        <button
        onClick={()=> setCurrentView("tips")}
        className="bg-white border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col items-center"
        >
          <span className="text-5xl mb-2">💡 </span>
          <h1 className="text-xl font-medium text-gray-800">Tips</h1>
        </button>
      
      </div>
    </div>
  );
}

export default Dashboard;
