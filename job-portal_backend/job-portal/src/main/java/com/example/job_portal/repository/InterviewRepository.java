package com.example.job_portal.repository;

import com.example.job_portal.model.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewRepository
        extends JpaRepository<Interview, Long> {

    List<Interview> findByUserId(Long userId);

    List<Interview> findByEmployerId(Long employerId);
}