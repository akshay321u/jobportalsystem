package com.example.job_portal.service;

import com.example.job_portal.model.Application;

import com.example.job_portal.dto.ApplicationResponse;
import com.example.job_portal.model.Job;
import com.example.job_portal.model.Notification;
import com.example.job_portal.model.User;
import com.example.job_portal.repository.ApplicationRepository;
import com.example.job_portal.repository.JobRepository;
import com.example.job_portal.repository.NotificationRepository;
import com.example.job_portal.repository.UserRepository;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository repo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JobRepository jobRepo;
    
    @Autowired
    private NotificationRepository notificationRepo;
   
    public Application apply(Application application) {

        
        if (repo.existsByJobIdAndUserId(
                application.getJobId(),
                application.getUserId())) {
            throw new RuntimeException("You have already applied to this job.");
        }

       
        User user = userRepo.findById(application.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

      
        if (application.getResumeUrl() == null ||
            application.getResumeUrl().isBlank()) {
            application.setResumeUrl(user.getResumeUrl());
        }

        
        if (application.getStatus() == null ||
            application.getStatus().isBlank()) {
            application.setStatus("APPLIED");
        }
        application.setAppliedDate(LocalDateTime.now());
        
        
        Job job = jobRepo.findById(application.getJobId()).orElse(null);

        if (job != null) {

        	Notification notification = new Notification(
        		    job.getEmployerId(),
        		    user.getName() + " applied for " + job.getTitle()
        		);

        		System.out.println("CREATING NOTIFICATION...");

        		notificationRepo.save(notification);
        }
        return repo.save(application);
    }

    
    public List<Application> getApplicants(Long jobId, String currentUserEmail) {

    
        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        
        User currentUser = userRepo.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

       

        if (!job.getEmployerId().equals(currentUser.getId())) {
            throw new AccessDeniedException(
                    "You are not allowed to view applicants for this job.");
        }

       
        List<Application> applications = repo.findByJobId(jobId);

        
        for (Application app : applications) {
            User applicant = userRepo.findById(app.getUserId()).orElse(null);

            if (applicant != null) {
                app.setApplicantName(applicant.getName());
                app.setApplicantEmail(applicant.getEmail());
                app.setApplicantPhone(applicant.getPhone());
            }
        }

        return applications;
    }


public List<ApplicationResponse> getUserApplications(Long userId) {

    List<Application> applications = repo.findByUserId(userId);

    return applications.stream().map(app -> {

        Job job = jobRepo.findById(app.getJobId()).orElse(null);

        return new ApplicationResponse(
                app.getId(),
                app.getStatus(),
                app.getAppliedDate() != null
                ? app.getAppliedDate()
                    .format(java.time.format.DateTimeFormatter.ofPattern("dd MMM yyyy"))
                : "N/A",

                app.getJobId(),

                job != null ? job.getTitle() : "Unknown Job",
                job != null ? job.getCompany() : "Unknown Company",
                job != null ? job.getLocation() : "Not specified",
                		job != null ? String.valueOf(job.getSalary()) : "Not disclosed",

                app.getResumeUrl()
        );

    }).toList();
}

   
    public List<Application> getAllApplications() {
        return repo.findAll();
    }
 // UPDATE APPLICATION STATUS
    public Application updateStatus(Long applicationId, String status, String currentUserEmail) {

        // Find application by ID
        Application app = repo.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        // Verify that the logged-in employer owns the job
        Job job = jobRepo.findById(app.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        User employer = userRepo.findById(job.getEmployerId())
                .orElseThrow(() -> new RuntimeException("Employer not found"));

        if (!employer.getEmail().equals(currentUserEmail)) {
            throw new RuntimeException("Access denied");
        }

        // Validate allowed statuses
        String normalizedStatus = status.toUpperCase();

        if (!normalizedStatus.equals("ACCEPTED")
                && !normalizedStatus.equals("REJECTED")
                && !normalizedStatus.equals("APPLIED")) {
            throw new RuntimeException("Invalid status");
        }

        // Update and save
        app.setStatus(normalizedStatus);
        Application updatedApp = repo.save(app);
        User applicant = userRepo.findById(app.getUserId())
                .orElse(null);

        if (applicant != null) {

            Notification notification = new Notification(
                    applicant.getId(),
                    "Your application for '" +
                    job.getTitle() +
                    "' was " +
                    normalizedStatus
            );
            notificationRepo.save(notification);

            System.out.println(
                    "APPLICANT NOTIFICATION CREATED"
            );
        }

        return repo.save(app);
    }
	
}