import React from "react";

function MarketPrice() {
  // Dummy data 
  const prices = [
    { crop: "Wheat", price: "₹2,500/quintal" },
    { crop: "Rice", price: "₹1,800/quintal" },
    { crop: "Maize", price: "₹1,600/quintal" },
    { crop: "Soybean", price: "₹4,200/quintal" },
    { crop: "Cotton", price: "₹6,500/quintal" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
      <h2 className="text-2xl font-bold text-green-800 mb-4">📊 Market Prices</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-100 text-green-800">
            <th className="py-3 px-4 border border-green-200 text-left">Crop</th>
            <th className="py-3 px-4 border border-green-200 text-left">Current Price</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((item) => (
            <tr key={item.crop} className="hover:bg-green-50">
              <td className="py-3 px-4 border border-green-200">{item.crop}</td>
              <td className="py-3 px-4 border border-green-200">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-sm text-gray-500 mt-4">
        * Prices are indicative and may change daily.
      </p>
    </div>
  );
}

export default MarketPrice;
