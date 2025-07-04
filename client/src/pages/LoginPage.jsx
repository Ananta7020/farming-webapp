import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate(); //  import and use navigate

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token); // store token
      // alert('Welcome, ' + res.data.user.name);      // optional
      navigate('/dashboard');                       // navigate to dashboard
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-green-700">🔐 Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input w-full"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input w-full"
          value={form.password}
          onChange={handleChange}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
