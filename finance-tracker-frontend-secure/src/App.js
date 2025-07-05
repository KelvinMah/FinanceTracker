import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ description: '', amount: '', category: '', date: '' });
  const [auth, setAuth] = useState({ username: '', password: '' });
  const [registered, setRegistered] = useState(false);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('/api/transactions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchTransactions();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAuthChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      description: form.description,
      amount: parseFloat(form.amount),
      date: form.date,
      category: { name: form.category },
    };
    try {
      await axios.post('/api/transactions', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ description: '', amount: '', category: '', date: '' });
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  const login = async () => {
    try {
      const res = await axios.post('/api/auth/login', auth);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch (err) {
      alert('Login failed');
    }
  };

  const register = async () => {
    try {
      await axios.post('/api/auth/register', auth);
      setRegistered(true);
    } catch (err) {
      alert('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setTransactions([]);
  };

  if (!token) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{registered ? 'Login' : 'Register'}</h2>
        <input name="username" onChange={handleAuthChange} placeholder="Username" className="border p-2 w-full mb-2" />
        <input name="password" type="password" onChange={handleAuthChange} placeholder="Password" className="border p-2 w-full mb-2" />
        <button onClick={registered ? login : register} className="bg-blue-500 text-white px-4 py-2 mr-2">
          {registered ? 'Login' : 'Register'}
        </button>
        {!registered && <button onClick={() => setRegistered(true)} className="text-blue-700 underline">Already registered?</button>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>
        <button onClick={logout} className="text-red-600">Logout</button>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full mb-2" required />
        <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="Amount" className="border p-2 w-full mb-2" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-2 w-full mb-2" required />
        <input name="date" type="date" value={form.date} onChange={handleChange} className="border p-2 w-full mb-2" required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Transaction</button>
      </form>

      <div className="bg-white rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Description</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Category</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="p-2">{tx.description}</td>
                <td className="p-2">${tx.amount.toFixed(2)}</td>
                <td className="p-2">{tx.category.name}</td>
                <td className="p-2">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}