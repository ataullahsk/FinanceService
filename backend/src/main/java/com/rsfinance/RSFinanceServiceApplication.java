package com.rsfinance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class RSFinanceServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(RSFinanceServiceApplication.class, args);
    }
}