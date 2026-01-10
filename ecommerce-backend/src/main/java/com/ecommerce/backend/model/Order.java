package com.ecommerce.backend.model;

import com.ecommerce.backend.dto.DeliveryStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ================= CUSTOMER ================= */
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /* ================= ORDER ITEMS ================= */
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderItem> items = new ArrayList<>();

    private Double totalAmount;

    /* ================= DELIVERY STATUS ================= */
    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus;

    /* ================= ORDER STATUS ================= */
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    /* ================= DELIVERY PERSON ================= */
    @ManyToOne
    @JoinColumn(name = "delivery_person_id", nullable = true)
    private User deliveryPerson;

    private LocalDateTime orderDate = LocalDateTime.now();
    private LocalDateTime deliveryDate;

    /* ================= GETTERS & SETTERS ================= */

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public DeliveryStatus getDeliveryStatus() {
        return deliveryStatus;
    }

    public void setDeliveryStatus(DeliveryStatus deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public User getDeliveryPerson() {
        return deliveryPerson;
    }

    public void setDeliveryPerson(User deliveryPerson) {
        this.deliveryPerson = deliveryPerson;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public LocalDateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

	public void setId(Long id) {
		this.id = id;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}
    
    
}
