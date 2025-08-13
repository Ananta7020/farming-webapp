import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

function ShopDetailsPage() {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [shop, setShop] = useState(null);

  const fetchShopDetails = async () => {
    try {
      const shopRes = await api.get(`/api/shops/${shopId}`); // Get shop info
      setShop(shopRes.data);

      const productsRes = await api.get(`/api/products/shops/${shopId}`); // Get products for shop
      setProducts(productsRes.data);
    } catch (err) {
      alert("❌ Failed to load shop details");
    }
  };

  useEffect(() => {
    fetchShopDetails();
  }, [shopId]);

  return (
    <div className="p-6">
      {shop && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{shop.name}</h2>
          <p className="text-gray-600">{shop.address}</p>
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2">Products</h3>
      {products.length === 0 ? (
        <p className="text-gray-500">No products yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((p) => (
            <li key={p._id} className="border p-4 rounded shadow">
              <p className="font-bold">{p.name}</p>
              <p>₹{p.price}</p>
              <p className="text-sm text-gray-500">{p.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShopDetailsPage;
