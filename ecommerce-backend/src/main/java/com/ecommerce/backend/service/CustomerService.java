package com.ecommerce.backend.service;

import com.ecommerce.backend.model.*;
import com.ecommerce.backend.repository.CustomerRepository;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    private final CustomerRepository customerRepo;
    private final UserRepository userRepo;

    public CustomerService(CustomerRepository customerRepo, UserRepository userRepo) {
        this.customerRepo = customerRepo;
        this.userRepo = userRepo;
    }

    // ✅ AUTO CREATE CUSTOMER IF NOT EXISTS
    public Customer getProfileByEmail(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));

        if (user.getUserRole() != Role.CUSTOMER) {
            throw new RuntimeException("User is not CUSTOMER");
        }

        // 🔹 If already linked → return
        if (user.getCustomer() != null) {
            return user.getCustomer();
        }

        // 🔹 Create & MAP properly
        Customer customer = new Customer();
        customer.setFirstName(user.getFirstName());
        customer.setLastName(user.getLastName());
      
        customer.setMobileNo(user.getMobileNo());
        customer.setStreet(user.getStreet());
        customer.setCity(user.getCity());
        customer.setPincode(user.getPincode());

        // 🔥 VERY IMPORTANT
        customer.setUser(user);
        user.setCustomer(customer);

        // save user (cascade saves customer)
        userRepo.save(user);

        return customer;
    }

    public Customer updateProfile(Customer updated) {

        if (updated.getUser() == null || updated.getUser().getEmail() == null) {
            throw new RuntimeException("User email is required to update profile");
        }

        // 🔹 Fetch user by email
        User user = userRepo.findByEmail(updated.getUser().getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔹 Fetch existing customer linked to this user
        Customer existing = user.getCustomer();
        if (existing == null) {
            throw new RuntimeException("Customer profile not found");
        }

        // 🔹 Update Customer fields
        existing.setFirstName(updated.getFirstName());
        existing.setLastName(updated.getLastName());
        existing.setMobileNo(updated.getMobileNo());
        existing.setStreet(updated.getStreet());
        existing.setCity(updated.getCity());
        existing.setPincode(updated.getPincode());

        // 🔹 ALSO update User table for fields stored in User
        user.setFirstName(updated.getFirstName());
        user.setLastName(updated.getLastName());
        user.setMobileNo(updated.getMobileNo());
        user.setStreet(updated.getStreet());
        user.setCity(updated.getCity());
        user.setPincode(updated.getPincode());

        // 🔹 Save User (cascade saves Customer too)
        userRepo.save(user);

        return existing; // return updated Customer
    }


}
