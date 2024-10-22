import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8083/signup', {
        name,
        email,
        password,
        confirmPassword,
      });
      // setSuccess(response.data); // e.g. "User registered successfully"
      toast.success("User registered successfully!", { position: 'top-center' });
    } catch (error) {
      if (error.response) {
        setError(error.response.data); // Handle errors like "User with this email already exists"
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required 
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          >
            Register
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account? 
          <Link to="/" className="ml-2 text-blue-600 hover:underline">Sign In</Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
