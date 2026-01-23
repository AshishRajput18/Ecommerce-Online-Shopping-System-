package com.ecommerce.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.model.Customer;
import com.ecommerce.backend.service.CustomerService;

@RestController
@RequestMapping("/api/customer")
// @CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    // ✅ FIXED: PathVariable instead of RequestParam
    @GetMapping("/profile/{email}")
    public Customer getProfile(@PathVariable String email) {
        return service.getProfileByEmail(email);
    }

    @PutMapping("/update-profile")
    public Customer updateProfile(@RequestBody Customer customer) {
        return service.updateProfile(customer);
    }
}
