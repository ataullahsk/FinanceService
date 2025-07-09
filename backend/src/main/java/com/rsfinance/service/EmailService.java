package com.rsfinance.service;

import com.rsfinance.model.LoanApplication;
import com.rsfinance.model.ContactMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    @Value("${app.admin.email:admin@rsfinanceservice.com}")
    private String adminEmail;
    
    @Async
    public void sendApplicationConfirmation(LoanApplication application) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(application.getEmail());
            message.setSubject("Loan Application Received - " + application.getApplicationId());
            
            String emailBody = String.format(
                "Dear %s %s,\n\n" +
                "Thank you for applying for a loan with RS Finance Service.\n\n" +
                "Your application details:\n" +
                "Application ID: %s\n" +
                "Loan Type: %s\n" +
                "Loan Amount: ₹%,d\n" +
                "Status: %s\n\n" +
                "We will review your application and contact you within 24-48 hours.\n\n" +
                "For any queries, please contact us at:\n" +
                "Phone: 8391808557\n" +
                "Email: info@rsfinanceservice.com\n\n" +
                "Best regards,\n" +
                "RS Finance Service Team",
                application.getFirstName(),
                application.getLastName(),
                application.getApplicationId(),
                application.getLoanType(),
                application.getLoanAmount(),
                application.getStatus()
            );
            
            message.setText(emailBody);
            mailSender.send(message);
        } catch (Exception e) {
            // Log error but don't throw exception to avoid breaking the application flow
            System.err.println("Failed to send confirmation email: " + e.getMessage());
        }
    }
    
    @Async
    public void sendNewApplicationNotification(LoanApplication application) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(adminEmail);
            message.setSubject("New Loan Application - " + application.getApplicationId());
            
            String emailBody = String.format(
                "A new loan application has been submitted.\n\n" +
                "Application Details:\n" +
                "Application ID: %s\n" +
                "Applicant: %s %s\n" +
                "Email: %s\n" +
                "Phone: %s\n" +
                "Loan Type: %s\n" +
                "Loan Amount: ₹%,d\n" +
                "Monthly Income: ₹%,d\n" +
                "Employment Type: %s\n\n" +
                "Please review the application in the admin dashboard.\n\n" +
                "RS Finance Service System",
                application.getApplicationId(),
                application.getFirstName(),
                application.getLastName(),
                application.getEmail(),
                application.getPhone(),
                application.getLoanType(),
                application.getLoanAmount(),
                application.getMonthlyIncome(),
                application.getEmploymentType()
            );
            
            message.setText(emailBody);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send admin notification email: " + e.getMessage());
        }
    }
    
    @Async
    public void sendStatusUpdateNotification(LoanApplication application) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(application.getEmail());
            message.setSubject("Loan Application Status Update - " + application.getApplicationId());
            
            String statusMessage = getStatusMessage(application.getStatus());
            
            String emailBody = String.format(
                "Dear %s %s,\n\n" +
                "Your loan application status has been updated.\n\n" +
                "Application ID: %s\n" +
                "New Status: %s\n\n" +
                "%s\n\n" +
                "%s\n\n" +
                "For any queries, please contact us at:\n" +
                "Phone: 8391808557\n" +
                "Email: info@rsfinanceservice.com\n\n" +
                "Best regards,\n" +
                "RS Finance Service Team",
                application.getFirstName(),
                application.getLastName(),
                application.getApplicationId(),
                application.getStatus(),
                statusMessage,
                application.getReviewComments() != null ? "Comments: " + application.getReviewComments() : ""
            );
            
            message.setText(emailBody);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send status update email: " + e.getMessage());
        }
    }
    
    @Async
    public void sendContactMessageConfirmation(ContactMessage contactMessage) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(contactMessage.getEmail());
            message.setSubject("Message Received - RS Finance Service");
            
            String emailBody = String.format(
                "Dear %s,\n\n" +
                "Thank you for contacting RS Finance Service.\n\n" +
                "We have received your message regarding: %s\n\n" +
                "Our team will review your message and get back to you within 24 hours.\n\n" +
                "For urgent matters, please call us at: 8391808557\n\n" +
                "Best regards,\n" +
                "RS Finance Service Team",
                contactMessage.getName(),
                contactMessage.getSubject()
            );
            
            message.setText(emailBody);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send contact confirmation email: " + e.getMessage());
        }
    }
    
    @Async
    public void sendContactMessageNotification(ContactMessage contactMessage) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(adminEmail);
            message.setSubject("New Contact Message - " + contactMessage.getSubject());
            
            String emailBody = String.format(
                "A new contact message has been received.\n\n" +
                "From: %s\n" +
                "Email: %s\n" +
                "Phone: %s\n" +
                "Subject: %s\n\n" +
                "Message:\n%s\n\n" +
                "Please respond to the customer.\n\n" +
                "RS Finance Service System",
                contactMessage.getName(),
                contactMessage.getEmail(),
                contactMessage.getPhone() != null ? contactMessage.getPhone() : "Not provided",
                contactMessage.getSubject(),
                contactMessage.getMessage()
            );
            
            message.setText(emailBody);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send contact notification email: " + e.getMessage());
        }
    }
    
    private String getStatusMessage(LoanApplication.ApplicationStatus status) {
        switch (status) {
            case APPROVED:
                return "Congratulations! Your loan application has been approved. Our team will contact you soon with the next steps.";
            case REJECTED:
                return "We regret to inform you that your loan application has been rejected. Please contact us for more details.";
            case UNDER_REVIEW:
                return "Your application is currently under review. We will update you once the review is complete.";
            default:
                return "Your application status has been updated.";
        }
    }
}