import React from 'react';
import { useNavigate } from 'react-router-dom';

const tips = [
  {
    title: 'Track Your Spending',
    content: 'Always record your daily farming or household expenses to avoid overspending.'
  },
  {
    title: 'Save Before You Spend',
    content: 'Set aside a portion of your profit/salary before spending anything.'
  },
  {
    title: 'Use Quality Seeds',
    content: 'Higher-quality seeds lead to better crop yield and long-term savings.'
  },
  {
    title: 'Plan Crop Rotation',
    content: 'Avoid soil depletion and increase productivity with smart crop planning.'
  },
  {
    title: 'Diversify Income',
    content: 'Don’t rely on just one crop—try poultry, dairy, or agri-tourism.'
  }
];

function Tips() {
  const Navigate = useNavigate();

  function goBack(){
    Navigate('/dashboard');
    return;
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
       <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={()=> goBack()}
        >
           ← Back
        </button>
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">🌿 Smart Tips for Farmers</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {tips.map((tip, index) => (
          <div key={index} className="bg-white border border-green-200 p-4 rounded-xl shadow hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-green-700 mb-2">💡 {tip.title}</h2>
            <p className="text-gray-700">{tip.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tips;
