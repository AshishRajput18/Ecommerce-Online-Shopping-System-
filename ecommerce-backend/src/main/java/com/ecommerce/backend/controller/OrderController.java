package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.DeliveryStatus;
import com.ecommerce.backend.dto.DeliveryStatusRequest;
import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestParam String email) {
        return ResponseEntity.ok(orderService.placeOrder(email));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable String email) {
        return ResponseEntity.ok(orderService.getOrdersByUser(email));
    }

    @GetMapping("/delivery/{email}")
    public ResponseEntity<List<Order>> getOrdersForDeliveryPerson(@PathVariable String email) {
        return ResponseEntity.ok(orderService.getOrdersForDeliveryPerson(email));
    }

    @PutMapping("/{id}/assign-delivery/{email}")
    public ResponseEntity<Order> assignDelivery(
            @PathVariable Long id,
            @PathVariable String email) {

        return ResponseEntity.ok(orderService.assignDeliveryPerson(id, email));
    }
    /* GET ORDER BY ID */
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }


    @PutMapping("/{id}/delivery-status")
    public ResponseEntity<Order> updateDeliveryStatus(
            @PathVariable Long id,
            @RequestParam String email,   // use @RequestParam for query param
            @RequestBody DeliveryStatusRequest request) {

        DeliveryStatus status = DeliveryStatus.valueOf(request.getStatus().toUpperCase());

        return ResponseEntity.ok(orderService.updateDeliveryStatus(id, email, status));
    }

}
