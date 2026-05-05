package com.klanvision.backend.repository;

import com.klanvision.backend.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByEmail(String email);
    List<JobApplication> findByPosition(String position);
    List<JobApplication> findByStatus(String status);
}
