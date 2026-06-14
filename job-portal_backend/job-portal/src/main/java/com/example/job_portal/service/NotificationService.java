package com.example.job_portal.service;

import com.example.job_portal.model.Notification;
import com.example.job_portal.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository repo;

    public Notification create(Long userId, String message) {
        Notification n = new Notification(userId, message);
        return repo.save(n);
    }

    public List<Notification> getUserNotifications(Long userId) {
        return repo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Notification markAsRead(Long id) {
        Notification n = repo.findById(id).orElseThrow();

        n.setReadStatus(true);

        return repo.save(n);
    }
}