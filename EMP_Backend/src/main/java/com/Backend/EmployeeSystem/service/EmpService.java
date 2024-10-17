package com.Backend.EmployeeSystem.service;

import com.Backend.EmployeeSystem.entity.Emp;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface EmpService {

    String createEmp(Emp emp, MultipartFile file); // Updated to accept MultipartFile

    List<Emp> getEmp();

    boolean deleteEmp(int id);

    String updateEmp(int id, Emp emp, MultipartFile file); // Updated to accept MultipartFile

    Emp getEmpById(int id);
}

