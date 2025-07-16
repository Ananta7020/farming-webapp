import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      alert(res.data.msg);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-green-700">📝 Signup</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="mb-3 w-full border p-2 rounded"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="mb-3 w-full border p-2 rounded"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="mb-3 w-full border p-2 rounded"
        value={form.password}
        onChange={handleChange}
      />

      <select
        name="role"
        className="mb-4 w-full border p-2 rounded"
        value={form.role}
        onChange={handleChange}
      >
        <option value="user">User</option>
        <option value="shopkeeper">Shopkeeper</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Sign Up
      </button>
    </div>
  );
}

export default SignupPage;
