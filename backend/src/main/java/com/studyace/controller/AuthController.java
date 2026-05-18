package com.studyace.controller;

import com.studyace.dto.AuthRequest;
import com.studyace.dto.AuthResponse;
import com.studyace.dto.RegisterRequest;
import com.studyace.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public AuthResponse.UserResponse me(Authentication authentication) {
        return authService.currentUser(authentication.getName());
    }
}
