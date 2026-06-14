package com.example.job_portal.repository;



import com.example.job_portal.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {}
