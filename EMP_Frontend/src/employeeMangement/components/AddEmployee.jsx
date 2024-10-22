
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    phone: '',
    email: '',
    image: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleFileChange = (e) => {
    setEmployee({ ...employee, image: e.target.files[0] });
  };

  const saveEmployee = async (e) => {
    e.preventDefault();

    // Input validation
    if (!employee.name || !employee.phone || !employee.email) {
      toast.error('All fields are required!', {
        position: 'top-center',
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(employee.email)) {
      toast.error('Please enter a valid email address!', {
        position: 'top-center',
      });
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('phone', employee.phone);
    formData.append('email', employee.email);

    if (employee.image) {
      formData.append('imageData', employee.image); // Change to expected property name
      formData.append('imageName', employee.image.name); // Add image name if required
    }

    // API call to save employee
    EmployeeService.saveEmployee(formData)
      .then(() => {
        toast.success('Employee saved successfully!', {
          position: 'top-center',
        });
        navigate('/employeelist');
      })
      .catch((error) => {
        console.error('Error saving employee:', error.response ? error.response.data : error.message);
        toast.error('Error saving employee!', {
          position: 'top-center',
        });
      });
  };

  return (
    <div className="flex justify-center items-center mt-8">

      <div className="max-w-xl bg-slate-800 rounded shadow py-6 px-8 w-full md:w-2/3 lg:w-1/2">

        <div className="text-4xl text-yellow-400 tracking-wider font-bold text-center py-0">
          <p>Add 🧑🏼‍💻 New Employee</p>
        </div>

        <form onSubmit={saveEmployee} className="mx-10 my-2">
          <div className="my-0">
            <label className="text-white">Name:</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              required
              className="w-full py-2 my-4 text-slate-800"
              placeholder="Enter Name"
            />
          </div>
          
          <div className="my-0">
            <label className="text-white">Phone:</label>
            <input
              type="text"
              name="phone"
              value={employee.phone}
              onChange={handleChange}
              required
              className="w-full py-2 my-4 text-slate-800"
              placeholder="Enter Phone"
            />
          </div>
          <div className="my-0">
            <label className="text-white">Email:</label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
              className="w-full py-2 my-4 text-slate-800"
              placeholder="Enter Email"
            />
          </div>

          {/* Image Field */}
          <div className="my-0 flex">
            <label className="text-white py-2">Image:-</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              required
              className="w-full py-2 my-0 mx-4  text-slate-800"
            />
          
          {employee.image && (
            <img
              src={URL.createObjectURL(employee.image)}
              alt="Employee"
              className="mt-0 w-12 h-12 object-cover rounded"
            />
          )}
          </div>

          <div className="flex my-2 space-x-4 md:space-x-8 lg:space-x-12 justify-center">
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-700 py-2 px-6 rounded w-full md:w-auto"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setEmployee({ name: '', phone: '', email: '', image: null })}
              className="bg-blue-400 hover:bg-blue-700 py-2 px-6 rounded w-full md:w-auto"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={() => navigate('/employeelist')}
              className="bg-red-400 hover:bg-red-700 py-2 px-6 rounded w-full md:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default AddEmployee;



