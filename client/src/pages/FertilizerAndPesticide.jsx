import React from "react";
import { useNavigate } from "react-router-dom";

function FertilizerAndPesticide() {

  const Navigate = useNavigate();
  // Dummy data 
  const suggestions = [
    { crop: "Wheat", fertilizer: "Urea, DAP", pesticide: "Imidacloprid" },
    { crop: "Rice", fertilizer: "Urea, NPK (10-26-26)", pesticide: "Chlorpyrifos" },
    { crop: "Maize", fertilizer: "Ammonium Sulphate", pesticide: "Malathion" },
    { crop: "Soybean", fertilizer: "Potash, Urea", pesticide: "Neem Oil" },
    { crop: "Cotton", fertilizer: "DAP, MOP", pesticide: "Cypermethrin" },
  ];

  function goBack(){
    Navigate('/dashboard');
    return;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
       <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={()=> goBack()}
        >
           ← Back
        </button>
      <h2 className="text-2xl font-bold text-green-800 mb-4">💊 Fertilizer & Pesticide Suggestions</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-100 text-green-800">
            <th className="py-3 px-4 border border-green-200 text-left">Crop</th>
            <th className="py-3 px-4 border border-green-200 text-left">Suggested Fertilizer</th>
            <th className="py-3 px-4 border border-green-200 text-left">Suggested Pesticide</th>
          </tr>
        </thead>
        <tbody>
          {suggestions.map((item) => (
            <tr key={item.crop} className="hover:bg-green-50">
              <td className="py-3 px-4 border border-green-200">{item.crop}</td>
              <td className="py-3 px-4 border border-green-200">{item.fertilizer}</td>
              <td className="py-3 px-4 border border-green-200">{item.pesticide}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-sm text-gray-500 mt-4">
        * Recommendations are for general guidance only. Consult a local agronomist for region-specific advice.
      </p>
    </div>
  );
}

export default FertilizerAndPesticide;
