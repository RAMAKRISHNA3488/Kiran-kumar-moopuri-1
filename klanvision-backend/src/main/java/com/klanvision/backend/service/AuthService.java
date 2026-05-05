package com.klanvision.backend.service;

import com.klanvision.backend.dto.AuthResponse;
import com.klanvision.backend.dto.LoginRequest;
import com.klanvision.backend.dto.RegisterRequest;
import com.klanvision.backend.model.User;
import com.klanvision.backend.repository.UserRepository;
import com.klanvision.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public AuthResponse login(LoginRequest request) {
        User.Role role;
        try {
            role = User.Role.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            return new AuthResponse(null, null, "Invalid role provided.");
        }

        Optional<User> userOpt = userRepository.findByEmailAndRole(request.getEmail(), role);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                String token = jwtUtils.generateToken(user.getEmail(), user.getRole().name());
                AuthResponse.UserDTO userDto = new AuthResponse.UserDTO(
                        user.getId(), user.getName(), user.getEmail(), user.getRole().name()
                );
                return new AuthResponse(token, userDto, "Login successful.");
            }
        }
        return new AuthResponse(null, null, "Invalid email, password, or role.");
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(null, null, "Email is already in use.");
        }

        User.Role role;
        try {
            role = User.Role.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            return new AuthResponse(null, null, "Invalid role provided.");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(role)
                .active(true)
                .build();

        userRepository.save(user);

        String token = jwtUtils.generateToken(user.getEmail(), user.getRole().name());
        AuthResponse.UserDTO userDto = new AuthResponse.UserDTO(
                user.getId(), user.getName(), user.getEmail(), user.getRole().name()
        );
        return new AuthResponse(token, userDto, "User registered successfully.");
    }
}
