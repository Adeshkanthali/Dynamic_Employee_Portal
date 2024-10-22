import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import EmployeeList from './employeeMangement/components/EmployeeList';
import Navbar from './employeeMangement/components/Navbar';
import AddEmployee from './employeeMangement/components/AddEmployee';
import UpdateEmployee from './employeeMangement/components/UpdateEmployee';
import Login from './employeeMangement/components/Login';
import Register from './employeeMangement/components/Register';
import ForgotPassword from './employeeMangement/components/ForgotPassword';

// import Formm from './RegistrationForm/Formm';
import './input.css';


function App() {

    const [showRegister, setShowRegister] = useState(false);

    // Employee Management Project

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false'); // Clear local storage on logout
    };


    return (
        <>
            {/* Login LogOut Project */}


            <BrowserRouter>

                {isLoggedIn && <Navbar handleLogout={handleLogout} />} {/* Pass handleLogout to Navbar */}

                <Routes>
                    <Route index element={<Login onLogin={handleLogin} />} />
                    <Route path="/" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgetpassword" element={<ForgotPassword />} />
                    <Route path="/employeelist" element={<EmployeeList />} />
                    <Route path="/addEmployee" element={<AddEmployee />} />
                    <Route path="/editEmployee/:id" element={<UpdateEmployee />} />
                </Routes>

            </BrowserRouter>

        </>
    );
}

export default App;
