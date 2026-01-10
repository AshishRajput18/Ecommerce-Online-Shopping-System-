package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.AddToCartRequest;
import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173") // Vite
public class CartController {

    @Autowired
    private CartService cartService;

    // ✅ ADD TO CART
    @PreAuthorize("hasRole('CUSTOMER')")

    @PostMapping("/add")
    public Cart addToCart(
            @RequestParam String email,
            @RequestParam Long productId,
            @RequestParam int quantity
    ) throws Exception {
        return cartService.addToCart(email, productId, quantity);
    }

    // ✅ GET CART BY USER
    @GetMapping("/user/{email}")
    public List<Cart> getCart(@PathVariable String email) throws Exception {
        return cartService.getCartByUser(email);
    }

    // ✅ UPDATE QUANTITY
    @PutMapping("/update")
    public Cart updateCart(@RequestBody AddToCartRequest request) throws Exception {
        return cartService.updateCartQuantity(
                request.getUserEmail(),
                request.getProductId(),
                request.getQuantity()
        );
    }

    // ✅ REMOVE ITEM
    @DeleteMapping("/remove")
    public String removeCart(
            @RequestParam String email,
            @RequestParam Long productId
    ) throws Exception {
        cartService.removeFromCart(email, productId);
        return "Cart item removed successfully";
    }
}
