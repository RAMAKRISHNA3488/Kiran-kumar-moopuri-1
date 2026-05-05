package com.klanvision.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "job_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String phone;

    @Column(nullable = false)
    private String position;

    private String experience;

    @Column(columnDefinition = "TEXT")
    private String coverLetter;

    @Column(nullable = false)
    private String status = "PENDING"; // PENDING, REVIEWING, SHORTLISTED, REJECTED

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
