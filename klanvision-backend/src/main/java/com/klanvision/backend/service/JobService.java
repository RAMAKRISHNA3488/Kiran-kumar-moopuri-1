package com.klanvision.backend.service;

import com.klanvision.backend.model.JobApplication;
import com.klanvision.backend.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    public JobApplication apply(JobApplication application) {
        return jobApplicationRepository.save(application);
    }

    public List<JobApplication> getAllApplications() {
        return jobApplicationRepository.findAll();
    }

    public List<JobApplication> getApplicationsByStatus(String status) {
        return jobApplicationRepository.findByStatus(status);
    }

    public JobApplication updateStatus(Long id, String status) {
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus(status);
        return jobApplicationRepository.save(application);
    }
}
