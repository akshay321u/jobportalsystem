package com.example.job_portal.repository;


import org.springframework.transaction.annotation.Transactional;
import com.example.job_portal.model.Application;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
	
	@Transactional
	void deleteByJobId(Long jobId);
    boolean existsByJobIdAndUserId(Long jobId, Long userId);
    List<Application> findByJobId(Long jobId);
    List<Application> findByUserId(Long userId);
}
