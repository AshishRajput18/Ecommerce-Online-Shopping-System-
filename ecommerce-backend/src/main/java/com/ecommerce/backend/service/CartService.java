package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Cart;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.CartRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ProductRepository productRepo;

    // ✅ Add product to cart & decrease stock
 // ✅ ADD TO CART + DECREASE STOCK
 // ✅ ADD TO CART + DECREASE STOCK
    @Transactional
    public Cart addToCart(String email, Long productId, int quantity) throws Exception {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new Exception("Product not found"));

        if (quantity > product.getQuantity()) {
            throw new Exception("Not enough stock");
        }

        // 🔽 DECREASE PRODUCT STOCK
        product.setQuantity(product.getQuantity() - quantity);
        productRepo.save(product);

        Cart cartItem = cartRepo.findByUserAndProductId(user, productId).orElse(null);

        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = new Cart();
            cartItem.setUser(user);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
        }

        return cartRepo.save(cartItem);
    }

    public List<Cart> getCartByUser(String email) throws Exception {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));
        return cartRepo.findByUser(user);
    }

    // ✅ Update cart quantity & adjust stock
    public Cart updateCartQuantity(String email, Long productId, int newQuantity) throws Exception {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        Cart cartItem = cartRepo.findByUserAndProductId(user, productId)
                .orElseThrow(() -> new Exception("Cart item not found"));

        Product product = cartItem.getProduct();

        int oldQuantity = cartItem.getQuantity();
        int difference = newQuantity - oldQuantity;

        if (difference > 0 && difference > product.getQuantity()) {
            throw new Exception("Not enough stock available");
        }

        // 🔄 Adjust stock
        product.setQuantity(product.getQuantity() - difference);
        productRepo.save(product);

        cartItem.setQuantity(newQuantity);
        return cartRepo.save(cartItem);
    }

    // ✅ Remove item from cart & restore stock
    public void removeFromCart(String email, Long productId) throws Exception {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        Cart cartItem = cartRepo.findByUserAndProductId(user, productId)
                .orElseThrow(() -> new Exception("Cart item not found"));

        Product product = cartItem.getProduct();

        // 🔺 Restore stock
        product.setQuantity(product.getQuantity() + cartItem.getQuantity());
        productRepo.save(product);

        cartRepo.delete(cartItem);
    }
}
