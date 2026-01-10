package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.CategoryRequest;
import com.ecommerce.backend.model.Category;
import com.ecommerce.backend.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    // ✅ Add Category
    @PostMapping
    public ResponseEntity<Category> add(@RequestBody CategoryRequest req) {

        if (req.getName() == null || req.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Category category = new Category();
        category.setName(req.getName());
        category.setDescription(req.getDescription());

        Category saved = service.save(category);

        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // ✅ Get all Categories
    @GetMapping
    public List<Category> getAll() {
        return service.findAll();
    }
}
