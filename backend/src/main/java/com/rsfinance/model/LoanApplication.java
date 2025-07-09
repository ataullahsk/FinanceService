package com.rsfinance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "loan_applications")
public class LoanApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is required")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(nullable = false)
    private String email;

    @NotBlank(message = "Phone is required")
    @Column(nullable = false)
    private String phone;

    @NotNull(message = "Date of birth is required")
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    private String gender;

    @Column(name = "marital_status")
    private String maritalStatus;

    @Column(name = "father_name")
    private String fatherName;

    @Column(name = "mother_name")
    private String motherName;

    // Address Information
    @NotBlank(message = "Current address is required")
    @Column(name = "current_address", columnDefinition = "TEXT")
    private String currentAddress;

    @Column(name = "permanent_address", columnDefinition = "TEXT")
    private String permanentAddress;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    private String pincode;

    @Column(name = "residence_type")
    private String residenceType;

    @Column(name = "years_at_current_address")
    private Integer yearsAtCurrentAddress;

    // Employment Information
    @NotBlank(message = "Employment type is required")
    @Column(name = "employment_type")
    private String employmentType;

    @Column(name = "company_name")
    private String companyName;

    private String designation;

    @Column(name = "work_experience")
    private Integer workExperience;

    @NotNull(message = "Monthly income is required")
    @Positive(message = "Monthly income must be positive")
    @Column(name = "monthly_income")
    private Long monthlyIncome;

    @Column(name = "additional_income")
    private Long additionalIncome;

    @Column(name = "official_email")
    private String officialEmail;

    @Column(name = "office_address", columnDefinition = "TEXT")
    private String officeAddress;

    // Loan Details
    @NotBlank(message = "Loan type is required")
    @Column(name = "loan_type")
    private String loanType;

    @NotNull(message = "Loan amount is required")
    @Positive(message = "Loan amount must be positive")
    @Column(name = "loan_amount")
    private Long loanAmount;

    @NotBlank(message = "Loan purpose is required")
    @Column(name = "loan_purpose", columnDefinition = "TEXT")
    private String loanPurpose;

    @NotNull(message = "Preferred tenure is required")
    @Column(name = "preferred_tenure")
    private Integer preferredTenure;

    @Column(name = "existing_loans", columnDefinition = "TEXT")
    private String existingLoans;

    @Column(name = "bank_account")
    private String bankAccount;

    @Column(name = "ifsc_code")
    private String ifscCode;

    // Application Status
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ApplicationStatus status = ApplicationStatus.PENDING;

    @Column(name = "application_id", unique = true)
    private String applicationId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;

    @Column(name = "reviewed_by")
    private String reviewedBy;

    @Column(name = "review_comments", columnDefinition = "TEXT")
    private String reviewComments;

    public enum ApplicationStatus {
        PENDING, UNDER_REVIEW, APPROVED, REJECTED
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (applicationId == null) {
            applicationId = "RSF" + System.currentTimeMillis();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructors
    public LoanApplication() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getMaritalStatus() { return maritalStatus; }
    public void setMaritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; }

    public String getFatherName() { return fatherName; }
    public void setFatherName(String fatherName) { this.fatherName = fatherName; }

    public String getMotherName() { return motherName; }
    public void setMotherName(String motherName) { this.motherName = motherName; }

    public String getCurrentAddress() { return currentAddress; }
    public void setCurrentAddress(String currentAddress) { this.currentAddress = currentAddress; }

    public String getPermanentAddress() { return permanentAddress; }
    public void setPermanentAddress(String permanentAddress) { this.permanentAddress = permanentAddress; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public String getResidenceType() { return residenceType; }
    public void setResidenceType(String residenceType) { this.residenceType = residenceType; }

    public Integer getYearsAtCurrentAddress() { return yearsAtCurrentAddress; }
    public void setYearsAtCurrentAddress(Integer yearsAtCurrentAddress) { this.yearsAtCurrentAddress = yearsAtCurrentAddress; }

    public String getEmploymentType() { return employmentType; }
    public void setEmploymentType(String employmentType) { this.employmentType = employmentType; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public Integer getWorkExperience() { return workExperience; }
    public void setWorkExperience(Integer workExperience) { this.workExperience = workExperience; }

    public Long getMonthlyIncome() { return monthlyIncome; }
    public void setMonthlyIncome(Long monthlyIncome) { this.monthlyIncome = monthlyIncome; }

    public Long getAdditionalIncome() { return additionalIncome; }
    public void setAdditionalIncome(Long additionalIncome) { this.additionalIncome = additionalIncome; }

    public String getOfficialEmail() { return officialEmail; }
    public void setOfficialEmail(String officialEmail) { this.officialEmail = officialEmail; }

    public String getOfficeAddress() { return officeAddress; }
    public void setOfficeAddress(String officeAddress) { this.officeAddress = officeAddress; }

    public String getLoanType() { return loanType; }
    public void setLoanType(String loanType) { this.loanType = loanType; }

    public Long getLoanAmount() { return loanAmount; }
    public void setLoanAmount(Long loanAmount) { this.loanAmount = loanAmount; }

    public String getLoanPurpose() { return loanPurpose; }
    public void setLoanPurpose(String loanPurpose) { this.loanPurpose = loanPurpose; }

    public Integer getPreferredTenure() { return preferredTenure; }
    public void setPreferredTenure(Integer preferredTenure) { this.preferredTenure = preferredTenure; }

    public String getExistingLoans() { return existingLoans; }
    public void setExistingLoans(String existingLoans) { this.existingLoans = existingLoans; }

    public String getBankAccount() { return bankAccount; }
    public void setBankAccount(String bankAccount) { this.bankAccount = bankAccount; }

    public String getIfscCode() { return ifscCode; }
    public void setIfscCode(String ifscCode) { this.ifscCode = ifscCode; }

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }

    public String getApplicationId() { return applicationId; }
    public void setApplicationId(String applicationId) { this.applicationId = applicationId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(LocalDateTime reviewedAt) { this.reviewedAt = reviewedAt; }

    public String getReviewedBy() { return reviewedBy; }
    public void setReviewedBy(String reviewedBy) { this.reviewedBy = reviewedBy; }

    public String getReviewComments() { return reviewComments; }
    public void setReviewComments(String reviewComments) { this.reviewComments = reviewComments; }
}