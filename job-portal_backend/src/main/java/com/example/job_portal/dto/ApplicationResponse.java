package com.example.job_portal.dto;

public class ApplicationResponse {

    private Long Id;
    private String status;
    private String appliedDate;

    private Long jobId;
    private String jobTitle;
    private String company;
    private String location;
    private String salary;

    private String resumeUrl;

    public ApplicationResponse() {
    }

    
    public ApplicationResponse(
            Long applicationId,
            String status,
            String appliedDate,
            Long jobId,
            String jobTitle,
            String company,
            String location,
            String salary,
            String resumeUrl
    ) {
        this.Id = applicationId;
        this.status = status;
        this.appliedDate = appliedDate;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.company = company;
        this.location = location;
        this.salary = salary;
        this.resumeUrl = resumeUrl;
    }

   

    public Long getId() {
        return Id;
    }

    public void setId(Long applicationId) {
        this.Id = applicationId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(String appliedDate) {
        this.appliedDate = appliedDate;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }
}