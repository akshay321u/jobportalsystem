package com.example.job_portal.controller;

import com.example.job_portal.model.Job;
import com.example.job_portal.service.JobService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@CrossOrigin("*")
public class JobController {

    @Autowired
    private JobService service;

    // ==========================================
    // GET ALL JOBS
    // ==========================================
    @GetMapping
    public List<Job> getJobs() {
        return service.getAllJobs();
    }

    // ==========================================
    // GET SINGLE JOB BY ID
    // ==========================================
    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {
        return service.getJobById(id);
    }

    // ==========================================
    // ADD NEW JOB
    // ==========================================
    @PostMapping
    public Job addJob(
            @RequestBody Job job,
            Authentication authentication
    ) {
        String currentUserEmail = authentication.getName();
        return service.addJob(job, currentUserEmail);
    }

    // ==========================================
    // DELETE JOB
    // Only the employer who posted the job
    // can delete it
    // ==========================================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(
            @PathVariable Long id,
            Authentication authentication
    ) {
        String currentUserEmail = authentication.getName();

        service.deleteJob(id, currentUserEmail);

        return ResponseEntity.ok("Job deleted successfully");
    }
}