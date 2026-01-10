package com.ecommerce.backend.service;

import org.springframework.stereotype.Service;

import com.ecommerce.backend.dto.LoginRequest;
import com.ecommerce.backend.model.Customer;
import com.ecommerce.backend.model.Role;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    

    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // 🔹 If role is CUSTOMER → create customer
        if (user.getUserRole() == Role.CUSTOMER) {

            Customer customer = new Customer();

            customer.setFirstName(user.getFirstName());
            customer.setLastName(user.getLastName());
            customer.setMobileNo(user.getMobileNo());
            customer.setStreet(user.getStreet());
            customer.setCity(user.getCity());
            customer.setPincode(user.getPincode());

            // 🔥 VERY IMPORTANT (BIDIRECTIONAL LINK)
            customer.setUser(user);
            user.setCustomer(customer);
        }
        return userRepository.save(user);
    }
    
    public User authenticate(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        if (!user.getUserRole().name().equals(request.getUserRole())) {
            throw new RuntimeException("Invalid role");
        }

        return user;
    }
}
