import './App.css';

import EmployeeList from './employeeMangement/components/EmployeeList';
import Navbar from './employeeMangement/components/Navbar';
import AddEmployee from './employeeMangement/components/AddEmployee';
import UpdateEmployee from './employeeMangement/components/UpdateEmployee';
import './input.css';

import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';


function App() {
    return (
        <>
            {/* Employee Mangement Project */}

            <BrowserRouter>

                <Navbar />

                <Routes>
                    <Route index element={<EmployeeList />} />
                    <Route path="/" element={<EmployeeList />} />
                    <Route path="/addEmployee" element={<AddEmployee />} />
                    <Route path="/editEmployee/:id" element={<UpdateEmployee />} />
                </Routes>

            </BrowserRouter>

        </>
    );
}

export default App;
