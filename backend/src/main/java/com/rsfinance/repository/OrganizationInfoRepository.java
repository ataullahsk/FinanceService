package com.rsfinance.repository;

import com.rsfinance.model.OrganizationInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationInfoRepository extends JpaRepository<OrganizationInfo, Long> {
    
    default OrganizationInfo getOrganizationInfo() {
        return findById(1L).orElse(null);
    }
    
    default OrganizationInfo saveOrganizationInfo(OrganizationInfo organizationInfo) {
        organizationInfo.setId(1L);
        return save(organizationInfo);
    }
}