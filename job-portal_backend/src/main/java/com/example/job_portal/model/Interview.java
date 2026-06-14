package com.example.job_portal.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long applicationId;

    private Long employerId;

    private Long userId;

    private String jobTitle;

    private LocalDate interviewDate;

    private LocalTime interviewTime;

    private String meetingLink;

    private String status = "SCHEDULED";

    // GETTERS & SETTERS

    public Long getId() {
        return id;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

    public Long getEmployerId() {
        return employerId;
    }

    public void setEmployerId(Long employerId) {
        this.employerId = employerId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public LocalDate getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(LocalDate interviewDate) {
        this.interviewDate = interviewDate;
    }

    public LocalTime getInterviewTime() {
        return interviewTime;
    }

    public void setInterviewTime(LocalTime interviewTime) {
        this.interviewTime = interviewTime;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}