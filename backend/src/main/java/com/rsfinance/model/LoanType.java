package com.rsfinance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;

@Entity
@Table(name = "loan_types")
public class LoanType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Loan type name is required")
    @Column(nullable = false, unique = true)
    private String name;

    @NotBlank(message = "Description is required")
    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Interest rate is required")
    @Positive(message = "Interest rate must be positive")
    @Column(name = "interest_rate")
    private Double interestRate;

    @NotNull(message = "Maximum amount is required")
    @Positive(message = "Maximum amount must be positive")
    @Column(name = "max_amount")
    private Long maxAmount;

    @NotNull(message = "Minimum tenure is required")
    @Positive(message = "Minimum tenure must be positive")
    @Column(name = "min_tenure")
    private Integer minTenure;

    @NotNull(message = "Maximum tenure is required")
    @Positive(message = "Maximum tenure must be positive")
    @Column(name = "max_tenure")
    private Integer maxTenure;

    @NotNull(message = "Processing fee is required")
    @Column(name = "processing_fee")
    private Double processingFee;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructors
    public LoanType() {}

    public LoanType(String name, String description, Double interestRate, Long maxAmount, 
                   Integer minTenure, Integer maxTenure, Double processingFee) {
        this.name = name;
        this.description = description;
        this.interestRate = interestRate;
        this.maxAmount = maxAmount;
        this.minTenure = minTenure;
        this.maxTenure = maxTenure;
        this.processingFee = processingFee;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getInterestRate() { return interestRate; }
    public void setInterestRate(Double interestRate) { this.interestRate = interestRate; }

    public Long getMaxAmount() { return maxAmount; }
    public void setMaxAmount(Long maxAmount) { this.maxAmount = maxAmount; }

    public Integer getMinTenure() { return minTenure; }
    public void setMinTenure(Integer minTenure) { this.minTenure = minTenure; }

    public Integer getMaxTenure() { return maxTenure; }
    public void setMaxTenure(Integer maxTenure) { this.maxTenure = maxTenure; }

    public Double getProcessingFee() { return processingFee; }
    public void setProcessingFee(Double processingFee) { this.processingFee = processingFee; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}