package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.ProductRequest;
import com.ecommerce.backend.model.Category;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repository.CategoryRepository;
import com.ecommerce.backend.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;
    private final CategoryRepository categoryRepo;

    public ProductController(ProductService service, CategoryRepository categoryRepo) {
        this.service = service;
        this.categoryRepo = categoryRepo;
    }

    // ✅ GET ALL PRODUCTS
    @GetMapping
    public List<Product> getAll() {
        return service.getAll();
    }

    // ✅ GET PRODUCT BY ID
    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // ✅ GET PRODUCTS BY CATEGORY
    @GetMapping("/category/{categoryId}")
    public List<Product> getByCategory(@PathVariable Long categoryId) {
        return service.getByCategory(categoryId);
    }

    // ✅ ADD PRODUCT (ADMIN)
    @PostMapping
    public Product add(@RequestBody ProductRequest req) {

        Category category = categoryRepo.findById(req.getCategoryId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                            "Category not found with ID " + req.getCategoryId()
                        )
                );

        Product product = new Product(
                null,
                req.getTitle(),
                req.getDescription(),
                req.getPrice(),
                req.getQuantity(),
                req.getImageUrl(),
                category
        );

        return service.save(product);
    }
}
