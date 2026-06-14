package com.example.job_portal.controller;

import com.example.job_portal.model.User;
import com.example.job_portal.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository repo;

    @GetMapping("/profile")
    public User getProfile(@RequestParam String email) {
        return repo.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

  
    @PutMapping("/profile")
    public User updateProfile(@RequestBody User updatedUser) {

        User existingUser = repo.findById(updatedUser.getId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        existingUser.setName(updatedUser.getName());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setSkills(updatedUser.getSkills());
        existingUser.setBio(updatedUser.getBio());
        existingUser.setLinkedin(updatedUser.getLinkedin());
        existingUser.setGithub(updatedUser.getGithub());

        return repo.save(existingUser);
    }


    @PostMapping("/profile-image")
    public User uploadProfileImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam Long userId
    ) throws IOException {

        User user = repo.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

       
        String uploadDir = System.getProperty("user.dir")
                + File.separator + "uploads";

        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        
        String originalName = file.getOriginalFilename();
        String extension = "";

        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(
                    originalName.lastIndexOf(".")
            );
        }

        String fileName = UUID.randomUUID() + extension;

        // Save file
        File destination = new File(uploadDir, fileName);
        file.transferTo(destination);

        // Save URL in database
        user.setProfileImageUrl("/uploads/" + fileName);

        return repo.save(user);
    }

   
    @PostMapping("/resume")
    public User uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam Long userId
    ) throws IOException {

        User user = repo.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Create uploads directory
        String uploadDir = System.getProperty("user.dir")
                + File.separator + "uploads";

        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        
        String originalName = file.getOriginalFilename();
        String extension = "";

        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(
                    originalName.lastIndexOf(".")
            );
        }

        String fileName = UUID.randomUUID() + extension;

        
        File destination = new File(uploadDir, fileName);
        file.transferTo(destination);

       
        user.setResumeUrl("/uploads/" + fileName);

        return repo.save(user);
    }
}