package com.example.job_portal.model;

public class AuthResponse {

    private Long id;
    private String token;
    private String role;
    private String name;
    private String email;
    private String phone;
    private String bio;
    private String skills;
    private String linkedin;
    private String github;
    private String resumeUrl;
    private String profileImageUrl;

    // Full constructor
    public AuthResponse(
            Long id,
            String token,
            String role,
            String name,
            String email,
            String phone,
            String bio,
            String skills,
            String linkedin,
            String github,
            String resumeUrl,
            String profileImageUrl
    ) {
        this.id = id;
        this.token = token;
        this.role = role;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.bio = bio;
        this.skills = skills;
        this.linkedin = linkedin;
        this.github = github;
        this.resumeUrl = resumeUrl;
        this.profileImageUrl = profileImageUrl;
    }

    // Constructor used in AuthController
    public AuthResponse(User user, String token) {
        this.id = user.getId();
        this.token = token;
        this.role = user.getRole();
        this.name = user.getName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.bio = user.getBio();
        this.skills = user.getSkills();
        this.linkedin = user.getLinkedin();
        this.github = user.getGithub();
        this.resumeUrl = user.getResumeUrl();
        this.profileImageUrl = user.getProfileImageUrl();
    }

    // =====================
    // Getters
    // =====================

    public Long getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getBio() {
        return bio;
    }

    public String getSkills() {
        return skills;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public String getGithub() {
        return github;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    // =====================
    // Setters
    // =====================

    public void setId(Long id) {
        this.id = id;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public void setGithub(String github) {
        this.github = github;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }
}