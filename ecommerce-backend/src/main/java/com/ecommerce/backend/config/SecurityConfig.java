package com.ecommerce.backend.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // Enable CORS and CSRF disabled for testing PUT/POST from React
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())

            // Authorize requests
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/categories/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/categories/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/products/**").permitAll()
                .requestMatchers("/api/customer/**").permitAll()
                .requestMatchers("/api/cart/**").permitAll()
                .requestMatchers("/api/**").permitAll()
                .requestMatchers(HttpMethod.PUT,"/api/orders/**").permitAll()
                // Orders endpoints accessible for testing
                .requestMatchers("/api/orders/**").permitAll()
                // 🔥 VERY IMPORTANT — ALLOW auth endpoints
            .requestMatchers("/auth/**").permitAll()
            .requestMatchers("/api/**").permitAll()

            // Allow preflight requests
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                
                // Any other request requires authentication
                .anyRequest().authenticated()
            );

        return http.build();
    }

    // CORS configuration for React frontend
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();
         config.setAllowedOriginPatterns(List.of(
        "http://localhost:5173",
        "https://*.vercel.app"
    ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // allow cookies/auth headers if needed

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
