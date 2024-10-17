package com.Backend.EmployeeSystem.repo;

import com.Backend.EmployeeSystem.entity.EmpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpRepo extends JpaRepository<EmpEntity,Integer> {

}
