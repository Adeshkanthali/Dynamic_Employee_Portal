import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8083/signin', { email, password });
      setSuccess(response.data);
      onLogin(); // Call the onLogin function to update the login status
      navigate('/employeelist');
    } catch (error) {
      if (error.response) {
        // setError(error.response.data);
        toast.error("Invalid email or password", { position: 'top-center' })
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-700">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>

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

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link to="/forgetpassword" className="text-sm text-blue-600 hover:underline">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          >
            Sign In
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account? 
          <Link to="/register" className="ml-2 text-blue-600 hover:underline">Sign Up</Link>
        </p>

      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
