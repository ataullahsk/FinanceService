package com.rsfinance.service;

import com.rsfinance.model.OrganizationInfo;
import com.rsfinance.repository.OrganizationInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrganizationInfoService {
    
    @Autowired
    private OrganizationInfoRepository organizationInfoRepository;
    
    public OrganizationInfo getOrganizationInfo() {
        OrganizationInfo info = organizationInfoRepository.getOrganizationInfo();
        if (info == null) {
            // Create default organization info if not exists
            info = createDefaultOrganizationInfo();
            info = organizationInfoRepository.saveOrganizationInfo(info);
        }
        return info;
    }
    
    public OrganizationInfo updateOrganizationInfo(OrganizationInfo organizationInfo) {
        return organizationInfoRepository.saveOrganizationInfo(organizationInfo);
    }
    
    private OrganizationInfo createDefaultOrganizationInfo() {
        OrganizationInfo info = new OrganizationInfo();
        info.setName("RS FINANCE SERVICE");
        info.setAddress("Nutunhat, Near Indian Oil Petrol Pump, West Bengal");
        info.setPhone("8391808557");
        info.setEmail("info@rsfinanceservice.com");
        info.setDescription("RS Finance Service is a trusted financial services provider offering comprehensive loan solutions for individuals and businesses. With years of experience in the industry, we are committed to helping our customers achieve their financial goals through personalized service and competitive rates.");
        info.setEstablishedYear("2019");
        info.setLicenseNumber("NBFC-MFI-2019-001");
        info.setWebsite("www.rsfinanceservice.com");
        return info;
    }
}