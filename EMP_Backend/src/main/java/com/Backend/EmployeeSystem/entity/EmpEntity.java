package com.Backend.EmployeeSystem.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "EmpEntity")
public class EmpEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;

    private String phone;

    private String email;

    @Lob // Use @Lob for large objects
    private byte[] imageData; // Assuming this is a byte array for image data

    private String imageName; // If you want to store image name as well
}


