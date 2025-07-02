import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ description: '', amount: '', category: '', date: '' });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await axios.get('/api/transactions');
    setTransactions(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      description: form.description,
      amount: parseFloat(form.amount),
      date: form.date,
      category: { name: form.category },
    };
    await axios.post('/api/transactions', payload);
    setForm({ description: '', amount: '', category: '', date: '' });
    fetchTransactions();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Tracker</h1>

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