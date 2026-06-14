package com.example.job_portal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long jobId;

    private Long userId;

    private String resumeUrl;
    private LocalDateTime appliedDate;

    @Column(columnDefinition = "TEXT")
    private String coverLetter;

    private String status = "APPLIED";
    
    @Transient
    private String applicantName;

    @Transient
    private String applicantEmail;

    @Transient
    private String applicantPhone;

    public Long getId() {
        return id;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public String getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setApplicantEmail(String applicantEmail) {
        this.applicantEmail = applicantEmail;
    }

    public void setApplicantPhone(String applicantPhone) {
        this.applicantPhone = applicantPhone;
    }

    public void setApplicantName(String applicantName) {
        this.applicantName = applicantName;
    }

	public LocalDateTime getAppliedDate() {
		return appliedDate;
	}

	public void setAppliedDate(LocalDateTime appliedDate) {
		this.appliedDate = appliedDate;
	}
}