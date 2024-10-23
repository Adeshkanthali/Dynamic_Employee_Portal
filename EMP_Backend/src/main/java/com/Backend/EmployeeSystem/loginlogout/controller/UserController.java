package com.Backend.EmployeeSystem.loginlogout.controller;


import com.Backend.EmployeeSystem.loginlogout.Repo.UserRepository;
import com.Backend.EmployeeSystem.loginlogout.dto.ForgotPasswordRequest;
import com.Backend.EmployeeSystem.loginlogout.dto.ForgotPasswordResponse;
import com.Backend.EmployeeSystem.loginlogout.entity.User;
import com.Backend.EmployeeSystem.loginlogout.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User with this email already exists");
        }

        // Validate password and confirm password
        if (!user.getPassword().equals(user.getConfirmPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password and confirm password do not match");
        }

        User newUser = new User();
        newUser.setName(user.getName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());

        userRepository.save(newUser);
        return ResponseEntity.ok("User registered successfully");
    }


    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ForgotPasswordResponse> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        ForgotPasswordResponse response = userService.initiatePasswordReset(request);
        return ResponseEntity.ok(response);
    }

}