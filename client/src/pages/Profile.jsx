import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"


function ProfilePage() {
  const navigate = useNavigate();

  const [user,setUser] = useState();
  const token = localStorage.getItem("token")
  
  // Retrieve user from localStorage
 
 useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('/api/user', {
      headers: { "x-auth-token": token }
    })
    .then(res => setUser(res.data))
    .catch(err => {
      console.error(err);
      navigate('/'); // token might be expired or invalid
    });
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    return;
  };
  




  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-green-200">
      <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">👤 Profile</h1>

      {user ? (
        <>
          <div className="mb-4">
            <p className="text-gray-600 font-semibold">Name:</p>
            <p className="text-lg text-gray-950">{user.name}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 font-semibold">Email:</p>
            <p className="text-lg text-gray-950">{user.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
          >
            🚪 Logout
          </button>
        </>
      ) : (
        <p className="text-red-500">No user information found. Please log in again.</p>
      )}
    </div>
  );
}

export default ProfilePage;
