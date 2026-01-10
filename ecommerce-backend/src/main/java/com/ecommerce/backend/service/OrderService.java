package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.DeliveryStatus;
import com.ecommerce.backend.model.*;
import com.ecommerce.backend.repository.CartRepository;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    /* ================= PLACE ORDER ================= */
    public Order placeOrder(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        List<Cart> carts = cartRepository.findByUser(user);
        if (carts.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PENDING);
        order.setItems(new ArrayList<>());

        double total = 0;
        for (Cart cart : carts) {
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(cart.getProduct());
            item.setQuantity(cart.getQuantity());
            item.setPrice(cart.getProduct().getPrice());

            order.getItems().add(item);
            total += item.getPrice() * item.getQuantity();
        }

        order.setTotalAmount(total);
        Order savedOrder = orderRepository.save(order);
        cartRepository.deleteAll(carts);

        return savedOrder;
    }

    /* ================= ADMIN ================= */
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    /* ================= USER ================= */
    public List<Order> getOrdersByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return orderRepository.findByUser(user);
    }

    /* ================= DELIVERY PERSON ORDERS ================= */
    public List<Order> getOrdersForDeliveryPerson(String email) {
        User deliveryPerson = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Delivery person not found"));

        if (deliveryPerson.getUserRole() != Role.DELIVERY_PERSON) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized access");
        }

        return orderRepository.findByDeliveryPerson(deliveryPerson);
    }

    /* ================= ASSIGN DELIVERY PERSON (ADMIN) ================= */
    public Order assignDeliveryPerson(Long orderId, String email) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        User deliveryPerson = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (deliveryPerson.getUserRole() != Role.DELIVERY_PERSON) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not a delivery person");
        }

        order.setDeliveryPerson(deliveryPerson);
        order.setStatus(OrderStatus.ASSIGNED);

        return orderRepository.save(order);
    }

    /* ================= GET ORDER BY ID ================= */
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
    }

    /* ================= UPDATE DELIVERY STATUS ================= */
    @Transactional
    public Order updateDeliveryStatus(Long orderId, String email, DeliveryStatus status) {

        // Get order
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        // Check if delivery person is assigned
        if (order.getDeliveryPerson() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Delivery person not assigned to this order");
        }

        // Get delivery person making the request
        User deliveryPerson = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Delivery person not found"));

        if (deliveryPerson.getUserRole() != Role.DELIVERY_PERSON) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized role");
        }

        // Only assigned delivery person can update
        if (!order.getDeliveryPerson().getId().equals(deliveryPerson.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not assigned to this order");
        }

        // Update delivery status
        order.setDeliveryStatus(status);

        // Update order status based on delivery status
        switch (status) {
            case PICKED_UP, OUT_FOR_DELIVERY -> order.setStatus(OrderStatus.SHIPPED);
            case DELIVERED -> {
                order.setStatus(OrderStatus.DELIVERED);
                order.setDeliveryDate(LocalDateTime.now());
            }
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid delivery status");
        }

        return orderRepository.save(order);
    }
}
