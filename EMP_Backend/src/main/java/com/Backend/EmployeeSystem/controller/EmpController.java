package com.Backend.EmployeeSystem.controller;

import com.Backend.EmployeeSystem.entity.Emp;
import com.Backend.EmployeeSystem.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(allowedHeaders = {"Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"},
        methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class EmpController {

    @Autowired
    EmpService empService;

    @GetMapping("GetAllEmp")
    public ResponseEntity<List<Emp>> GetAllEmp() {
        List<Emp> employees = empService.getEmp();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("GetEmpById/{id}")
    public ResponseEntity<Emp> GetEmpById(@PathVariable int id) {
        Emp employee = empService.getEmpById(id);
        return employee != null
                ? new ResponseEntity<>(employee, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("AddEmp")
    public ResponseEntity<String> AddEmp(
            @RequestParam("name") String name,
            @RequestParam("phone") String phone,
            @RequestParam("email") String email,
            @RequestParam(value = "imageData", required = false) MultipartFile imageData) {

        Emp emp = new Emp();
        emp.setName(name);
        emp.setPhone(phone);
        emp.setEmail(email);

        if (imageData != null && !imageData.isEmpty()) {
            try {
                emp.setImageData(imageData.getBytes());
                emp.setImageName(imageData.getOriginalFilename());
            } catch (Exception e) {
                return new ResponseEntity<>("Error processing image", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<>(empService.createEmp(emp, imageData), HttpStatus.CREATED);
    }

    @DeleteMapping("DeleteEmp/{id}")
    public ResponseEntity<String> DeleteEmp(@PathVariable int id) {
        if (empService.deleteEmp(id)) {
            return new ResponseEntity<>("Delete Successfully...!!", HttpStatus.OK);
        }
        return new ResponseEntity<>("NOT FOUND", HttpStatus.NOT_FOUND);
    }

    // Updated to return the modified employee object instead of just a message
    @PutMapping("UpdateEmp/{id}")
    public ResponseEntity<Emp> UpdateEmp(
            @PathVariable int id,
            @RequestParam("name") String name,
            @RequestParam("phone") String phone,
            @RequestParam("email") String email,
            @RequestParam(value = "imageData", required = false) MultipartFile imageData) {

        Emp emp = empService.getEmpById(id);
        if (emp == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        emp.setName(name);
        emp.setPhone(phone);
        emp.setEmail(email);

        if (imageData != null && !imageData.isEmpty()) {
            try {
                emp.setImageData(imageData.getBytes());
                emp.setImageName(imageData.getOriginalFilename());
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        // Return the updated employee object
        empService.updateEmp(id, emp, imageData);
        return new ResponseEntity<>(emp, HttpStatus.OK);
    }
}
