package com.rsfinance.service;

import com.rsfinance.model.LoanType;
import com.rsfinance.repository.LoanTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LoanTypeService {
    
    @Autowired
    private LoanTypeRepository loanTypeRepository;
    
    public List<LoanType> getAllLoanTypes() {
        return loanTypeRepository.findAll();
    }
    
    public List<LoanType> getActiveLoanTypes() {
        return loanTypeRepository.findActiveLoanTypesOrderByName();
    }
    
    public Optional<LoanType> getLoanTypeById(Long id) {
        return loanTypeRepository.findById(id);
    }
    
    public Optional<LoanType> getLoanTypeByName(String name) {
        return loanTypeRepository.findByNameIgnoreCase(name);
    }
    
    public LoanType saveLoanType(LoanType loanType) {
        return loanTypeRepository.save(loanType);
    }
    
    public LoanType updateLoanType(Long id, LoanType loanTypeDetails) {
        return loanTypeRepository.findById(id)
            .map(loanType -> {
                loanType.setName(loanTypeDetails.getName());
                loanType.setDescription(loanTypeDetails.getDescription());
                loanType.setInterestRate(loanTypeDetails.getInterestRate());
                loanType.setMaxAmount(loanTypeDetails.getMaxAmount());
                loanType.setMinTenure(loanTypeDetails.getMinTenure());
                loanType.setMaxTenure(loanTypeDetails.getMaxTenure());
                loanType.setProcessingFee(loanTypeDetails.getProcessingFee());
                loanType.setIsActive(loanTypeDetails.getIsActive());
                return loanTypeRepository.save(loanType);
            })
            .orElseThrow(() -> new RuntimeException("Loan type not found with id: " + id));
    }
    
    public void deleteLoanType(Long id) {
        loanTypeRepository.deleteById(id);
    }
    
    public void toggleLoanTypeStatus(Long id) {
        loanTypeRepository.findById(id)
            .ifPresent(loanType -> {
                loanType.setIsActive(!loanType.getIsActive());
                loanTypeRepository.save(loanType);
            });
    }
    
    public boolean existsByName(String name) {
        return loanTypeRepository.existsByNameIgnoreCase(name);
    }
}