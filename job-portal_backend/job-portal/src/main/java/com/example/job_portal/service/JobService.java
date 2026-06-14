package com.example.job_portal.service;

import com.example.job_portal.model.Job;
import com.example.job_portal.model.User;
import com.example.job_portal.repository.ApplicationRepository;
import com.example.job_portal.repository.JobRepository;
import com.example.job_portal.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository repo;

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ApplicationRepository applicationRepo;

    public List<Job> getAllJobs() {
        return repo.findAll();
    }

    // ADD JOB AND SAVE THE LOGGED-IN EMPLOYER ID
    public Job addJob(Job job, String currentUserEmail) {

        // Find logged-in employer by email from JWT token
        User employer = userRepo.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Save employer ID in jobs table
        job.setEmployerId(employer.getId());

        // Save job
        return repo.save(job);
    }

    public void deleteJob(Long jobId, String currentUserEmail) {

        Job job = repo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        User employer = userRepo.findById(job.getEmployerId())
                .orElseThrow(() -> new RuntimeException("Employer not found"));

        // Ensure only the job owner can delete
        if (!employer.getEmail().equals(currentUserEmail)) {
            throw new RuntimeException("Access denied");
        }

        // Delete applications for this job
        applicationRepo.deleteByJobId(jobId);

        // Delete the job
        repo.delete(job);
    }

   
    public Job getJobById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }
}