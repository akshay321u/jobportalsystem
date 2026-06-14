package com.example.job_portal.controller;

import com.example.job_portal.model.User;
import com.example.job_portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class ResumeController {

    @Autowired
    private UserRepository repo;

    @PostMapping("/resume/{userId}")
    public ResponseEntity<String> uploadResume(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            Path uploadPath = Paths.get("uploads/");
            Files.createDirectories(uploadPath);

            Path filePath = uploadPath.resolve(fileName);
            Files.write(filePath, file.getBytes());

            User user = repo.findById(userId).orElseThrow();
            user.setResumeUrl(fileName);

            repo.save(user);

            return ResponseEntity.ok("Resume uploaded");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Upload failed");
        }
    }
}