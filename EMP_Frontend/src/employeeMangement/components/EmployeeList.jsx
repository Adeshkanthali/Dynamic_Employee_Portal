


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import { ToastContainer, toast } from 'react-toastify';

function EmployeeList() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await EmployeeService.getEmployees();
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.log("Error fetching employees:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteEmployee = async (e, id) => {
    e.preventDefault();
    try {
      await EmployeeService.deleteEmployeeById(id);
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
      setFilteredEmployees((prev) => prev.filter((employee) => employee.id !== id));
      toast.success("Employee Deleted successfully!", { position: 'top-center' });
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Error deleting employee!", { position: 'top-center' });
    }
  };

  const editEmployee = (e, id) => {
    e.preventDefault();
    navigate(`/editEmployee/${id}`);
  };

  // Function to update the specific employee row in place after editing
  const updateEmployeeInPlace = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
    setFilteredEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      setFilteredEmployees(
        employees.filter((employee) =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, employees]);

  const getImageUrl = (imageData) => {
    if (!imageData) return null;
    return `data:image/jpeg;base64,${imageData}`;
  };

  return (
    <div className="container mx-auto my-8 px-4">
      
      <h1 className="text-center text-red-700" style={{ fontSize: '20px' }}>
        <b>🧑🏼‍💻 Employee List 🧑🏼‍💻</b>
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex space-x-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name"
            className="border border-black text-black rounded p-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-black shadow">
          <thead className="bg-slate-600">
            <tr>
              <th className="px-4 py-2 uppercase tracking-wide text-center border border-black">Image</th>
              <th className="px-4 py-2 uppercase tracking-wide text-center border border-black">Name</th>
              <th className="px-4 py-2 uppercase tracking-wide text-center border border-black">Email</th>
              <th className="px-4 py-2 uppercase tracking-wide text-center border border-black">Phone</th>
              <th className="px-4 py-2 uppercase tracking-wide text-center border border-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-white hover:text-black">
                <td className="border border-black flex justify-center h-full py-2">
                  {employee.imageData ? (
                    <img
                      src={getImageUrl(employee.imageData)}
                      alt="Employee"
                      className="w-16 h-16 object-cover rounded-full border border-black"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </td>
                <td className="text-center px-4 py-2 whitespace-nowrap border border-black">{employee.name}</td>
                <td className="text-center px-4 py-2 whitespace-nowrap border border-black">{employee.email}</td>
                <td className="text-center px-4 py-2 whitespace-nowrap border border-black">{employee.phone}</td>
                <td className="text-center px-4 py-2 border border-black">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={(e) => editEmployee(e, employee.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    onClick={(e) => deleteEmployee(e, employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && <div className="text-center">Loading...</div>}
      </div>

      <ToastContainer />
    </div>
  );
}

export default EmployeeList;



