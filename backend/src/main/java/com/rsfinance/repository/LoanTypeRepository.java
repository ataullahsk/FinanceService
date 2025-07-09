package com.rsfinance.repository;

import com.rsfinance.model.LoanType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LoanTypeRepository extends JpaRepository<LoanType, Long> {
    
    List<LoanType> findByIsActiveTrue();
    
    Optional<LoanType> findByNameIgnoreCase(String name);
    
    @Query("SELECT lt FROM LoanType lt WHERE lt.isActive = true ORDER BY lt.name")
    List<LoanType> findActiveLoanTypesOrderByName();
    
    boolean existsByNameIgnoreCase(String name);
}