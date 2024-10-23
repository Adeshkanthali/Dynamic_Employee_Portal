package com.Backend.EmployeeSystem.loginlogout.services;

import com.Backend.EmployeeSystem.loginlogout.dto.ForgotPasswordRequest;
import com.Backend.EmployeeSystem.loginlogout.dto.ForgotPasswordResponse;

public interface UserService {

    public ForgotPasswordResponse initiatePasswordReset(ForgotPasswordRequest request);



}
