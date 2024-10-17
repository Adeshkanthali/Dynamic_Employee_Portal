import axios from "axios";

const Employee_Base_URL = "http://localhost:8083/";

class EmployeeService {

  // Add Employee
  saveEmployee(formData) {
      return axios.post(`${Employee_Base_URL}AddEmp`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
  }


  // Get All Employee
  getEmployees() {
    return axios.get(Employee_Base_URL + "GetAllEmp");
  }


  // Delete Employee
  deleteEmployeeById(id) {
    return axios.delete(Employee_Base_URL + "DeleteEmp/" + id);
  }



  updateEmployee(employee, id) {
    return axios.put(`${Employee_Base_URL}UpdateEmp/${id}`, employee, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  getEmployeeById(id) {
    return axios.get(`${Employee_Base_URL}GetEmpById/${id}`);
  }

}

export default new EmployeeService();
