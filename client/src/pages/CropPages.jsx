import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

function CropPage() {
  const [crops, setCrops] = useState([]);
  const [name, setName] = useState("");

  const getCrops = async () => {
    const res = await api.get('/crops');
    setCrops(res.data);
  };

  const addCrop = async () => {
    if (name.trim() === "") return;
    await api.post('/crops', { name, plantedDate: new Date() });
    setName('');
    getCrops();
  };

  useEffect(() => {
    getCrops();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">🌾 My Crops</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter crop name..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
          onClick={addCrop}
        >
          ➕ Add
        </button>
      </div>

      <div className="grid gap-4">
        {crops.map(crop => (
          <div
            key={crop._id}
            className="bg-white border border-green-200 rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-medium text-gray-800">{crop.name}</h3>
            <p className="text-sm text-gray-500">
              Planted on: {new Date(crop.plantedDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CropPage;
