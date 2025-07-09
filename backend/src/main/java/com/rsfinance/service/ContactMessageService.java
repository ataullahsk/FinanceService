package com.rsfinance.service;

import com.rsfinance.model.ContactMessage;
import com.rsfinance.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ContactMessageService {
    
    @Autowired
    private ContactMessageRepository contactMessageRepository;
    
    @Autowired
    private EmailService emailService;
    
    public ContactMessage saveContactMessage(ContactMessage contactMessage) {
        ContactMessage savedMessage = contactMessageRepository.save(contactMessage);
        
        // Send confirmation email to sender
        emailService.sendContactMessageConfirmation(savedMessage);
        
        // Send notification email to admin
        emailService.sendContactMessageNotification(savedMessage);
        
        return savedMessage;
    }
    
    public Page<ContactMessage> getAllMessages(Pageable pageable) {
        return contactMessageRepository.findAll(pageable);
    }
    
    public Page<ContactMessage> getMessagesByReadStatus(Boolean isRead, Pageable pageable) {
        return contactMessageRepository.findByIsRead(isRead, pageable);
    }
    
    public Optional<ContactMessage> getMessageById(Long id) {
        return contactMessageRepository.findById(id);
    }
    
    public List<ContactMessage> getUnreadMessages() {
        return contactMessageRepository.findByIsReadFalse();
    }
    
    public long getUnreadMessageCount() {
        return contactMessageRepository.countUnreadMessages();
    }
    
    public ContactMessage markAsRead(Long id) {
        return contactMessageRepository.findById(id)
            .map(message -> {
                message.setIsRead(true);
                return contactMessageRepository.save(message);
            })
            .orElseThrow(() -> new RuntimeException("Message not found with id: " + id));
    }
    
    public ContactMessage markAsUnread(Long id) {
        return contactMessageRepository.findById(id)
            .map(message -> {
                message.setIsRead(false);
                return contactMessageRepository.save(message);
            })
            .orElseThrow(() -> new RuntimeException("Message not found with id: " + id));
    }
    
    public void deleteMessage(Long id) {
        contactMessageRepository.deleteById(id);
    }
    
    public List<ContactMessage> searchMessagesBySubject(String subject) {
        return contactMessageRepository.findBySubjectContainingIgnoreCase(subject);
    }
}