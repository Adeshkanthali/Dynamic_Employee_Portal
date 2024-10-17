import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateEmployee() {

  const { id } = useParams(); // Extract 'id' from URL params

  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    image: '', // Image property
  });

  const [selectedFile, setSelectedFile] = useState(null); // Store the selected file
  
  const navigate = useNavigate();

  // Fetch employee data and set state
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        if (!id) {
          console.error("Error: Employee ID is undefined");
          return;
        }
        const response = await EmployeeService.getEmployeeById(id);
        const { imageData, name, phone, email } = response.data;
        setEmployee({
          id: id,
          name: name,
          phone: phone,
          email: email,
          image: imageData ? `data:image/jpeg;base64,${imageData}` : '',
        });
      } catch (error) {
        console.log("Error fetching employee:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  // Handle input change for text fields
  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Store the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployee({ ...employee, image: reader.result }); // Display image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Update employee data
  const updateEmployee = (e) => {
    e.preventDefault();

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

    if (!id) {
      console.error("Error: Employee ID is undefined");
      toast.error('Error: Employee ID is missing!', {
        position: 'top-center',
      });
      return;
    }

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('phone', employee.phone);
    formData.append('email', employee.email);

    if (selectedFile) {
      formData.append('imageData', selectedFile); // Append image if selected
    }

    EmployeeService.updateEmployee(formData, id)  // Pass FormData to the update function
      .then(() => {
        toast.success('Employee updated successfully!', {
          position: 'top-center',
        });
        navigate('/');
      })
      .catch(() => {
        toast.error('Error updating employee!', {
          position: 'top-center',
        });
      });
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="max-w-xl bg-slate-800 rounded shadow py-6 px-8 w-full md:w-2/3 lg:w-1/2">
        <div className="text-4xl text-yellow-400 tracking-wider font-bold text-center py-0">
          <p>Update 🧑🏼‍💻 Employee</p>
        </div>

        <div className="mx-10 my-2">
          <input
            type="text"
            name="name"
            value={employee.name}
            required
            onChange={handleChange}
            className="w-full py-2 my-3 text-slate-800"
            placeholder="Enter Name"
          />

          <input
            type="number"
            name="phone"
            value={employee.phone}
            required
            onChange={handleChange}
            className="w-full py-2 my-3 text-slate-800"
            placeholder="Enter Phone"
          />

          <input
            type="email"
            name="email"
            value={employee.email}
            required
            onChange={handleChange}
            className="w-full py-2 my-3 text-slate-800"
            placeholder="Enter Email"
          />

          {/* Image Upload Input */}
          <div className="my-0 flex">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full py-2 my-0 text-slate-800"
            />

            {employee.image && (
              <img src={employee.image} alt="Employee" className="mt-0 w-12 h-12 object-cover rounded" />
            )}
          </div>

        </div>

        <div className="flex my-4 space-x-4 md:space-x-8 lg:space-x-12 justify-center">
          <button
            onClick={updateEmployee}
            className="bg-green-400 hover:bg-green-700 py-2 px-6 rounded w-full md:w-auto"
          >
            Update
          </button>

          <button
            onClick={() => navigate('/')}
            className="bg-red-400 hover:bg-red-700 py-2 px-6 rounded w-full md:w-auto"
          >
            Cancel
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default UpdateEmployee;

