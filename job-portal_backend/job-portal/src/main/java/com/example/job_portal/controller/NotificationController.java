package com.example.job_portal.controller;

import com.example.job_portal.model.Notification;
import com.example.job_portal.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin
public class NotificationController {

    @Autowired
    private NotificationService service;

    @GetMapping("/{userId}")
    public List<Notification> getUserNotifications(
            @PathVariable Long userId
    ) {
        return service.getUserNotifications(userId);
    }

    @PutMapping("/read/{id}")
    public Notification markAsRead(
            @PathVariable Long id
    ) {
        return service.markAsRead(id);
    }
}