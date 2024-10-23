package com.Backend.EmployeeSystem.loginlogout.services;


import com.Backend.EmployeeSystem.loginlogout.Repo.UserRepository;
import com.Backend.EmployeeSystem.loginlogout.dto.ForgotPasswordRequest;
import com.Backend.EmployeeSystem.loginlogout.dto.ForgotPasswordResponse;
import com.Backend.EmployeeSystem.loginlogout.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final JavaMailSender javaMailSender;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, JavaMailSender javaMailSender) {
        this.userRepository = userRepository;
        this.javaMailSender = javaMailSender;
    }

    @Override
    public ForgotPasswordResponse initiatePasswordReset(ForgotPasswordRequest request) {
        String email = request.getEmail();

        // Check if the provided email exists in the database
        User user = userRepository.findByEmail(email);
        if (user == null) {
            ForgotPasswordResponse response = new ForgotPasswordResponse();
            response.setMessage("Email not found. Please provide a valid email.");
            return response;
        }
        sendPasswordResetEmail(user);

        ForgotPasswordResponse response = new ForgotPasswordResponse();
        response.setMessage("A password reset has been initiated. Please check your email inbox or spam folder for further instructions.");
        return response;
    }

    private void sendPasswordResetEmail(User user) {
        String from = "kanthaliadesh@gmail.com";
        String to = user.getEmail();

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(from);
        message.setTo(to);
        message.setSubject("Forgot Password Reset");
        message.setText("Hi " + user.getName() +"," + "\n\n" + "Forgot Your Password? \n\n" + "We received a request to reset the password for your account.");
        javaMailSender.send(message);
    }
}
