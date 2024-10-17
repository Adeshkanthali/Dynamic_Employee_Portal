package com.Backend.EmployeeSystem.entity;

import lombok.Data;

@Data
public class Emp {
    private int id;
    private String name;
    private String phone;
    private String email;
    private String imageName; // Assuming this is also in Emp
    private byte[] imageData; // Add this line if it doesn't exist
}


