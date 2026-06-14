package com.example.job_portal.controller;

import com.example.job_portal.dto.ApplicationResponse;

import com.example.job_portal.model.Application;
import com.example.job_portal.service.ApplicationService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/applications")
@CrossOrigin("*")
public class ApplicationController {

    @Autowired
    private ApplicationService service;

    
    @PostMapping
    public ResponseEntity<Application> applyJob(
            @RequestBody Application application
    ) {
        Application savedApplication = service.apply(application);
        return ResponseEntity.ok(savedApplication);
    }

    
    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getApplicants(
            @PathVariable Long jobId,
            Authentication authentication
    ) {
        String currentUserEmail = authentication.getName();

        List<Application> applications =
                service.getApplicants(jobId, currentUserEmail);

        return ResponseEntity.ok(applications);
    }

    
    @PutMapping("/{applicationId}/status")
    public ResponseEntity<Application> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam String status,
            Authentication authentication
    ) {
        String currentUserEmail = authentication.getName();

        Application updatedApplication =
                service.updateStatus(
                        applicationId,
                        status,
                        currentUserEmail
                );

        return ResponseEntity.ok(updatedApplication);
    }

    
    @GetMapping("/user/{userId}")
    public List<ApplicationResponse> getUserApplications(
            @PathVariable Long userId
    ) {
        return service.getUserApplications(userId);
    }
    
    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        return ResponseEntity.ok(service.getAllApplications());
    }
}