package com.example.job_portal.controller;

import com.example.job_portal.model.Interview;
import com.example.job_portal.service.InterviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/interviews")
@CrossOrigin("*")
public class InterviewController {

    @Autowired
    private InterviewService service;

    @PostMapping
    public Interview scheduleInterview(
            @RequestBody Interview interview
    ) {
        return service.scheduleInterview(interview);
    }

    @GetMapping("/user/{userId}")
    public List<Interview> getUserInterviews(
            @PathVariable Long userId
    ) {
        return service.getUserInterviews(userId);
    }

    @GetMapping("/employer/{employerId}")
    public List<Interview> getEmployerInterviews(
            @PathVariable Long employerId
    ) {
        return service.getEmployerInterviews(employerId);
    }
}