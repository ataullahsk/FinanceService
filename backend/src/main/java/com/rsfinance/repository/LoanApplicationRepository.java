package com.rsfinance.repository;

import com.rsfinance.model.LoanApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
    
    Optional<LoanApplication> findByApplicationId(String applicationId);
    
    List<LoanApplication> findByStatus(LoanApplication.ApplicationStatus status);
    
    Page<LoanApplication> findByStatus(LoanApplication.ApplicationStatus status, Pageable pageable);
    
    @Query("SELECT la FROM LoanApplication la WHERE " +
           "(:status IS NULL OR la.status = :status) AND " +
           "(:searchTerm IS NULL OR LOWER(la.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(la.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(la.applicationId) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<LoanApplication> findByStatusAndSearchTerm(
        @Param("status") LoanApplication.ApplicationStatus status,
        @Param("searchTerm") String searchTerm,
        Pageable pageable
    );
    
    @Query("SELECT COUNT(la) FROM LoanApplication la WHERE la.status = :status")
    long countByStatus(@Param("status") LoanApplication.ApplicationStatus status);
    
    @Query("SELECT COUNT(la) FROM LoanApplication la WHERE la.createdAt >= :startDate")
    long countApplicationsAfterDate(@Param("startDate") LocalDateTime startDate);
    
    @Query("SELECT la.loanType, COUNT(la) FROM LoanApplication la GROUP BY la.loanType")
    List<Object[]> countApplicationsByLoanType();
    
    List<LoanApplication> findByEmailIgnoreCase(String email);
    
    List<LoanApplication> findByPhoneIgnoreCase(String phone);
    
    @Query("SELECT la FROM LoanApplication la WHERE la.createdAt BETWEEN :startDate AND :endDate")
    List<LoanApplication> findApplicationsBetweenDates(
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );
}