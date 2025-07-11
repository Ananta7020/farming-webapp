import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const Navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      alert(res.data.msg);
      Navigate("/");
    } catch (err) {
      alert(err.response.data.msg || 'Signup failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-green-700">📝 Signup</h2>
      <input type="text" name="name" placeholder="Name" className="mb-3 input" value={form.name} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" className="mb-3 input" value={form.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" className="mb-3 input" value={form.password} onChange={handleChange} />
      <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded w-full">Sign Up</button>
    </div>
  );
}
export default SignupPage;
