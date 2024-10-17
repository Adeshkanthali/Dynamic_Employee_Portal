package com.Backend.EmployeeSystem.service;

import com.Backend.EmployeeSystem.entity.Emp;
import com.Backend.EmployeeSystem.entity.EmpEntity;
import com.Backend.EmployeeSystem.repo.EmpRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class EmpServiceImpl implements EmpService {

    @Autowired
    EmpRepo empRepo;

    @Override
    public List<Emp> getEmp() {
        List<EmpEntity> empEntities = empRepo.findAll();
        List<Emp> emplist = new ArrayList<>();

        for (EmpEntity empEntity : empEntities) {
            Emp emp = new Emp();
            emp.setId(empEntity.getId());
            emp.setName(empEntity.getName());
            emp.setEmail(empEntity.getEmail());
            emp.setPhone(empEntity.getPhone());
            emp.setImageName(empEntity.getImageName());
            emp.setImageData(empEntity.getImageData());
            emplist.add(emp);
        }

        return emplist;
    }

    @Override
    public Emp getEmpById(int id) {
        EmpEntity empEntity = empRepo.findById(id).orElse(null);
        if (empEntity == null) {
            return null; // Handle employee not found case
        }
        Emp emp = new Emp();
        BeanUtils.copyProperties(empEntity, emp);
        return emp;
    }

    @Override
    public String createEmp(Emp emp, MultipartFile file) {
        EmpEntity empEntity = new EmpEntity();
        BeanUtils.copyProperties(emp, empEntity);

        if (file != null) {
            empEntity.setImageName(file.getOriginalFilename());
            try {
                empEntity.setImageData(file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
                return "Failed to save image.";
            }
        }

        empRepo.save(empEntity);
        return "Employee Saved Successfully...!!";
    }

    @Override
    public boolean deleteEmp(int id) {
        EmpEntity empEntity = empRepo.findById(id).orElse(null);
        if (empEntity != null) {
            empRepo.delete(empEntity);
            return true;
        }
        return false;
    }

    @Override
    public String updateEmp(int id, Emp emp, MultipartFile file) {
        EmpEntity empEntity = empRepo.findById(id).orElse(null);
        if (empEntity == null) {
            return "Employee not found.";
        }

        empEntity.setEmail(emp.getEmail());
        empEntity.setName(emp.getName());
        empEntity.setPhone(emp.getPhone());

        // Update image if provided
        if (file != null && !file.isEmpty()) {
            try {
                empEntity.setImageData(file.getBytes());
                empEntity.setImageName(file.getOriginalFilename());
            } catch (IOException e) {
                e.printStackTrace();
                return "Failed to update image.";
            }
        }

        empRepo.save(empEntity);
        return "Update Successfully...!!";
    }
}

