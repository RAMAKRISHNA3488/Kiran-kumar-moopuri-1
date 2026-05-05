package com.klanvision.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private UserDTO user;
    private String message;

    @Data
    @AllArgsConstructor
    public static class UserDTO {
        private Long id;
        private String name;
        private String email;
        private String role;
    }
}
