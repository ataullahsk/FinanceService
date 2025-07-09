package com.rsfinance.controller;

import com.rsfinance.model.ContactMessage;
import com.rsfinance.model.LoanApplication;
import com.rsfinance.model.LoanType;
import com.rsfinance.model.OrganizationInfo;
import com.rsfinance.service.ContactMessageService;
import com.rsfinance.service.LoanApplicationService;
import com.rsfinance.service.LoanTypeService;
import com.rsfinance.service.OrganizationInfoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "*")
public class PublicController {
    
    @Autowired
    private LoanTypeService loanTypeService;
    
    @Autowired
    private LoanApplicationService loanApplicationService;
    
    @Autowired
    private OrganizationInfoService organizationInfoService;
    
    @Autowired
    private ContactMessageService contactMessageService;
    
    // Loan Types endpoints
    @GetMapping("/loan-types")
    public ResponseEntity<List<LoanType>> getActiveLoanTypes() {
        List<LoanType> loanTypes = loanTypeService.getActiveLoanTypes();
        return ResponseEntity.ok(loanTypes);
    }
    
    @GetMapping("/loan-types/{id}")
    public ResponseEntity<LoanType> getLoanTypeById(@PathVariable Long id) {
        Optional<LoanType> loanType = loanTypeService.getLoanTypeById(id);
        return loanType.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    // Loan Application endpoints
    @PostMapping("/applications")
    public ResponseEntity<LoanApplication> submitApplication(@Valid @RequestBody LoanApplication application) {
        try {
            LoanApplication savedApplication = loanApplicationService.submitApplication(application);
            return ResponseEntity.ok(savedApplication);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/applications/{applicationId}")
    public ResponseEntity<LoanApplication> getApplicationStatus(@PathVariable String applicationId) {
        Optional<LoanApplication> application = loanApplicationService.getApplicationByApplicationId(applicationId);
        return application.map(app -> {
            // Return limited information for security
            LoanApplication publicApp = new LoanApplication();
            publicApp.setApplicationId(app.getApplicationId());
            publicApp.setStatus(app.getStatus());
            publicApp.setCreatedAt(app.getCreatedAt());
            publicApp.setUpdatedAt(app.getUpdatedAt());
            publicApp.setLoanType(app.getLoanType());
            publicApp.setLoanAmount(app.getLoanAmount());
            return ResponseEntity.ok(publicApp);
        }).orElse(ResponseEntity.notFound().build());
    }
    
    // Organization Info endpoint
    @GetMapping("/organization")
    public ResponseEntity<OrganizationInfo> getOrganizationInfo() {
        OrganizationInfo info = organizationInfoService.getOrganizationInfo();
        return ResponseEntity.ok(info);
    }
    
    // Contact Message endpoint
    @PostMapping("/contact")
    public ResponseEntity<ContactMessage> submitContactMessage(@Valid @RequestBody ContactMessage contactMessage) {
        try {
            ContactMessage savedMessage = contactMessageService.saveContactMessage(contactMessage);
            return ResponseEntity.ok(savedMessage);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Health check endpoint
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("RS Finance Service API is running");
    }
}