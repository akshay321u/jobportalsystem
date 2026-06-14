package com.example.job_portal.service;

import com.example.job_portal.model.*;
import com.example.job_portal.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.job_portal.service.EmailService;

import java.util.List;

@Service
public class InterviewService {

    @Autowired
    private InterviewRepository interviewRepo;

    @Autowired
    private NotificationRepository notificationRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private EmailService emailService;

    public Interview scheduleInterview(Interview interview) {
    	System.out.println("========== INTERVIEW ==========");
    	System.out.println("User ID: " + interview.getUserId());
    	System.out.println("Employer ID: " + interview.getEmployerId());

        Interview saved = interviewRepo.save(interview);

        User applicant = userRepo
                .findById(interview.getUserId())
                .orElse(null);
        
        System.out.println("Applicant: " + applicant);
        if (applicant != null) {
        	System.out.println("Applicant: " + applicant);

            
            Notification notification =
                    new Notification(
                            applicant.getId(),
                            "Interview scheduled for " +
                            interview.getJobTitle() +
                            " on " +
                            interview.getInterviewDate()
                    );

            notificationRepo.save(notification);

            
            emailService.sendEmail(
                    applicant.getEmail(),
                    "Interview Scheduled",
                    "Interview scheduled for "
                    + interview.getJobTitle()
                    + "\nDate: "
                    + interview.getInterviewDate()
                    + "\nTime: "
                    + interview.getInterviewTime()
                    + "\nMeeting Link: "
                    + interview.getMeetingLink()
            );
        }

        return saved;
    }

    public List<Interview> getUserInterviews(Long userId) {
        return interviewRepo.findByUserId(userId);
    }

    public List<Interview> getEmployerInterviews(Long employerId) {
        return interviewRepo.findByEmployerId(employerId);
    }
}