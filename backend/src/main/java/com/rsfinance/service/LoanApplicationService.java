package com.rsfinance.service;

import com.rsfinance.model.LoanApplication;
import com.rsfinance.repository.LoanApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LoanApplicationService {
    
    @Autowired
    private LoanApplicationRepository loanApplicationRepository;
    
    @Autowired
    private EmailService emailService;
    
    public LoanApplication submitApplication(LoanApplication application) {
        LoanApplication savedApplication = loanApplicationRepository.save(application);
        
        // Send confirmation email to applicant
        emailService.sendApplicationConfirmation(savedApplication);
        
        // Send notification email to admin
        emailService.sendNewApplicationNotification(savedApplication);
        
        return savedApplication;
    }
    
    public Page<LoanApplication> getAllApplications(Pageable pageable) {
        return loanApplicationRepository.findAll(pageable);
    }
    
    public Page<LoanApplication> getApplicationsByStatus(LoanApplication.ApplicationStatus status, Pageable pageable) {
        return loanApplicationRepository.findByStatus(status, pageable);
    }
    
    public Page<LoanApplication> searchApplications(LoanApplication.ApplicationStatus status, String searchTerm, Pageable pageable) {
        return loanApplicationRepository.findByStatusAndSearchTerm(status, searchTerm, pageable);
    }
    
    public Optional<LoanApplication> getApplicationById(Long id) {
        return loanApplicationRepository.findById(id);
    }
    
    public Optional<LoanApplication> getApplicationByApplicationId(String applicationId) {
        return loanApplicationRepository.findByApplicationId(applicationId);
    }
    
    public LoanApplication updateApplicationStatus(Long id, LoanApplication.ApplicationStatus status, String reviewedBy, String comments) {
        return loanApplicationRepository.findById(id)
            .map(application -> {
                application.setStatus(status);
                application.setReviewedBy(reviewedBy);
                application.setReviewComments(comments);
                application.setReviewedAt(LocalDateTime.now());
                
                LoanApplication updatedApplication = loanApplicationRepository.save(application);
                
                // Send status update email to applicant
                emailService.sendStatusUpdateNotification(updatedApplication);
                
                return updatedApplication;
            })
            .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));
    }
    
    public long getApplicationCountByStatus(LoanApplication.ApplicationStatus status) {
        return loanApplicationRepository.countByStatus(status);
    }
    
    public long getTodayApplicationsCount() {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        return loanApplicationRepository.countApplicationsAfterDate(startOfDay);
    }
    
    public long getThisWeekApplicationsCount() {
        LocalDateTime startOfWeek = LocalDateTime.now().minusDays(7);
        return loanApplicationRepository.countApplicationsAfterDate(startOfWeek);
    }
    
    public long getThisMonthApplicationsCount() {
        LocalDateTime startOfMonth = LocalDateTime.now().minusDays(30);
        return loanApplicationRepository.countApplicationsAfterDate(startOfMonth);
    }
    
    public List<Object[]> getApplicationCountsByLoanType() {
        return loanApplicationRepository.countApplicationsByLoanType();
    }
    
    public List<LoanApplication> getApplicationsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return loanApplicationRepository.findApplicationsBetweenDates(startDate, endDate);
    }
    
    public void deleteApplication(Long id) {
        loanApplicationRepository.deleteById(id);
    }
}