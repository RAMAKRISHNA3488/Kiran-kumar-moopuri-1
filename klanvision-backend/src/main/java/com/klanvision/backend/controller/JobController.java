package com.klanvision.backend.controller;

import com.klanvision.backend.model.JobApplication;
import com.klanvision.backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping("/apply")
    public ResponseEntity<JobApplication> apply(@RequestBody JobApplication application) {
        return ResponseEntity.ok(jobService.apply(application));
    }

    @GetMapping("/applications")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<List<JobApplication>> getAllApplications() {
        return ResponseEntity.ok(jobService.getAllApplications());
    }

    @PutMapping("/applications/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<JobApplication> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(jobService.updateStatus(id, status));
    }
}
