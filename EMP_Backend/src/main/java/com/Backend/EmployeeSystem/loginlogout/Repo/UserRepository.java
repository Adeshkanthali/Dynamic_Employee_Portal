package com.Backend.EmployeeSystem.loginlogout.Repo;

import com.Backend.EmployeeSystem.loginlogout.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
