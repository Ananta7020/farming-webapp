import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

function ExpenseTracker() {
  const token = localStorage.getItem("token");
 console.log(token)
 const navigate = useNavigate()
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({
    category: "",
    amount: "",
    date: "",
  });

  const getExpenses = async () => {
    try {
      const res = await api.get("/api/expence", {
        headers: { "x-auth-token": token },
      });
      setExpenses(res.data);
    } catch {
      alert("Failed to load expenses");
    }
  };

  const addExpense = async () => {
    if (
      newExpense.category.trim() === "" ||
      newExpense.amount.trim() === "" ||
      newExpense.date.trim() === ""
    )
      return;
    try {
      await api.post("/api/expence", newExpense, {
        headers: { "x-auth-token": token },
      });
      setNewExpense({ category: "", amount: "", date: "" });
      getExpenses();
    } catch {
      alert("Error adding expense");
    }
  };

  const saveEdit = async (id) => {
    try {
      const res = await api.put(`/expence/${id}`, editedExpense, {
        headers: { "x-auth-token": token },
      });
      setExpenses((prev) =>
        prev.map((exp) => (exp._id === id ? res.data : exp))
      );
      setEditingId(null);
    } catch {
      alert("Error updating expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expence/${id}`, {
        headers: { "x-auth-token": token },
      });
      setExpenses((prev) => prev.filter((exp) => exp._id !== id));
    } catch {
      alert("Error deleting expense");
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const totalExpenses = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  function goBack(){
    navigate('/dashboard');
    return;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
       <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={()=> goBack()}
        >
           ← Back
        </button>
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        💸 Expense Tracker
      </h2>

      {/* Add new expense */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Category"
          value={newExpense.category}
          onChange={(e) =>
            setNewExpense({ ...newExpense, category: e.target.value })
          }
        />
        <input
          className="border p-2 flex-1 rounded"
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({ ...newExpense, amount: e.target.value })
          }
        />
        <input
          className="border p-2 flex-1 rounded"
          type="date"
          value={newExpense.date}
          onChange={(e) =>
            setNewExpense({ ...newExpense, date: e.target.value })
          }
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={addExpense}
        >
          ➕ Add
        </button>
      </div>

      {/* Expense list */}
      <table className="w-full border-collapse mb-4">
        <thead>
          <tr className="bg-green-100 text-green-800">
            <th className="py-3 px-4 border border-green-200 text-left">Date</th>
            <th className="py-3 px-4 border border-green-200 text-left">
              Category
            </th>
            <th className="py-3 px-4 border border-green-200 text-left">
              Amount (₹)
            </th>
            <th className="py-3 px-4 border border-green-200 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center text-gray-500 py-4 border border-green-200"
              >
                No expenses found. Start by adding a new expense!
              </td>
            </tr>
          ) : (
            expenses.map((exp) => (
              <tr key={exp._id} className="hover:bg-green-50">
                {editingId === exp._id ? (
                  <>
                    <td className="py-2 px-4 border border-green-200">
                      <input
                        className="w-full border p-1 rounded"
                        type="date"
                        value={editedExpense.date}
                        onChange={(e) =>
                          setEditedExpense({
                            ...editedExpense,
                            date: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="py-2 px-4 border border-green-200">
                      <input
                        className="w-full border p-1 rounded"
                        value={editedExpense.category}
                        onChange={(e) =>
                          setEditedExpense({
                            ...editedExpense,
                            category: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="py-2 px-4 border border-green-200">
                      <input
                        className="w-full border p-1 rounded"
                        type="number"
                        value={editedExpense.amount}
                        onChange={(e) =>
                          setEditedExpense({
                            ...editedExpense,
                            amount: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="py-2 px-4 border border-green-200 flex gap-2">
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded"
                        onClick={() => saveEdit(exp._id)}
                      >
                        💾 Save
                      </button>
                      <button
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                        onClick={() => setEditingId(null)}
                      >
                        ❌ Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-2 px-4 border border-green-200">
                      {exp.date.split("T")[0]}
                    </td>
                    <td className="py-2 px-4 border border-green-200">
                      {exp.category}
                    </td>
                    <td className="py-2 px-4 border border-green-200">
                      ₹{exp.amount}
                    </td>
                    <td className="py-2 px-4 border border-green-200 flex gap-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() => {
                          setEditingId(exp._id);
                          setEditedExpense({
                            category: exp.category,
                            amount: exp.amount,
                            date: exp.date.split("T")[0],
                          });
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => deleteExpense(exp._id)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      <div className="text-right text-xl font-semibold text-green-900">
        Total: ₹{totalExpenses}
      </div>
    </div>
  );
}

export default ExpenseTracker;
