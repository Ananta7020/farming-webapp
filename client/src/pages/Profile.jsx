import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();

  // Retrieve user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md border border-green-200">
      <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">👤 Profile</h1>

      {user ? (
        <>
          <div className="mb-4">
            <p className="text-gray-600 font-semibold">Name:</p>
            <p className="text-lg">{user.name}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 font-semibold">Email:</p>
            <p className="text-lg">{user.email}</p>
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
