package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.Role;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class DeliveryPersonController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/delivery-persons")
    public List<User> getDeliveryPersons() {
        // Fetch all users with role DELIVERY_PERSON
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getUserRole() == Role.DELIVERY_PERSON)
                .collect(Collectors.toList());
    }
}
