package com.rsfinance.repository;

import com.rsfinance.model.ContactMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    
    List<ContactMessage> findByIsReadFalse();
    
    Page<ContactMessage> findByIsRead(Boolean isRead, Pageable pageable);
    
    @Query("SELECT COUNT(cm) FROM ContactMessage cm WHERE cm.isRead = false")
    long countUnreadMessages();
    
    List<ContactMessage> findBySubjectContainingIgnoreCase(String subject);
}