package com.rsfinance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "organization_info")
public class OrganizationInfo {
    @Id
    private Long id = 1L; // Singleton entry

    @NotBlank(message = "Organization name is required")
    @Column(name = "name", nullable = false)
    private String name;

    @NotBlank(message = "Address is required")
    @Column(columnDefinition = "TEXT")
    private String address;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "established_year")
    private String establishedYear;

    @Column(name = "license_number")
    private String licenseNumber;

    private String website;

    @Column(name = "logo_path")
    private String logoPath;

    // Business Hours
    @Column(name = "monday_hours")
    private String mondayHours = "9:00 AM - 6:00 PM";

    @Column(name = "tuesday_hours")
    private String tuesdayHours = "9:00 AM - 6:00 PM";

    @Column(name = "wednesday_hours")
    private String wednesdayHours = "9:00 AM - 6:00 PM";

    @Column(name = "thursday_hours")
    private String thursdayHours = "9:00 AM - 6:00 PM";

    @Column(name = "friday_hours")
    private String fridayHours = "9:00 AM - 6:00 PM";

    @Column(name = "saturday_hours")
    private String saturdayHours = "9:00 AM - 2:00 PM";

    @Column(name = "sunday_hours")
    private String sundayHours = "Closed";

    // Social Media
    @Column(name = "facebook_url")
    private String facebookUrl;

    @Column(name = "twitter_url")
    private String twitterUrl;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(name = "instagram_url")
    private String instagramUrl;

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
    public OrganizationInfo() {}

    public OrganizationInfo(String name, String address, String phone, String email, String description) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getEstablishedYear() { return establishedYear; }
    public void setEstablishedYear(String establishedYear) { this.establishedYear = establishedYear; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getLogoPath() { return logoPath; }
    public void setLogoPath(String logoPath) { this.logoPath = logoPath; }

    public String getMondayHours() { return mondayHours; }
    public void setMondayHours(String mondayHours) { this.mondayHours = mondayHours; }

    public String getTuesdayHours() { return tuesdayHours; }
    public void setTuesdayHours(String tuesdayHours) { this.tuesdayHours = tuesdayHours; }

    public String getWednesdayHours() { return wednesdayHours; }
    public void setWednesdayHours(String wednesdayHours) { this.wednesdayHours = wednesdayHours; }

    public String getThursdayHours() { return thursdayHours; }
    public void setThursdayHours(String thursdayHours) { this.thursdayHours = thursdayHours; }

    public String getFridayHours() { return fridayHours; }
    public void setFridayHours(String fridayHours) { this.fridayHours = fridayHours; }

    public String getSaturdayHours() { return saturdayHours; }
    public void setSaturdayHours(String saturdayHours) { this.saturdayHours = saturdayHours; }

    public String getSundayHours() { return sundayHours; }
    public void setSundayHours(String sundayHours) { this.sundayHours = sundayHours; }

    public String getFacebookUrl() { return facebookUrl; }
    public void setFacebookUrl(String facebookUrl) { this.facebookUrl = facebookUrl; }

    public String getTwitterUrl() { return twitterUrl; }
    public void setTwitterUrl(String twitterUrl) { this.twitterUrl = twitterUrl; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getInstagramUrl() { return instagramUrl; }
    public void setInstagramUrl(String instagramUrl) { this.instagramUrl = instagramUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}