package com.klanvision.backend.repository;

import com.klanvision.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndRole(String email, User.Role role);
    boolean existsByEmail(String email);
}
