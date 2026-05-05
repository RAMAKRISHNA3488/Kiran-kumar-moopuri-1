-- Preload users for testing
-- All passwords are 'password' encoded with BCrypt
-- CANDIDATE: candidate@klanvision.com / password
-- CUSTOMER: customer@klanvision.com / password
-- EMPLOYEE: employee@klanvision.com / password
-- ADMIN: admin@klanvision.com / password

INSERT INTO users (name, email, password, phone, role, active) VALUES 
('Candidate User', 'candidate@klanvision.com', '$2a$10$Xm5j0v3E7p5vO4qjF7v3O.w9vS4x5yGz8O8e7W5r4yGz8O8e7W5r4', '1234567890', 'CANDIDATE', true),
('Customer Care', 'customer@klanvision.com', '$2a$10$Xm5j0v3E7p5vO4qjF7v3O.w9vS4x5yGz8O8e7W5r4yGz8O8e7W5r4', '1234567890', 'CUSTOMER', true),
('Employee User', 'employee@klanvision.com', '$2a$10$Xm5j0v3E7p5vO4qjF7v3O.w9vS4x5yGz8O8e7W5r4yGz8O8e7W5r4', '1234567890', 'EMPLOYEE', true),
('Admin User', 'admin@klanvision.com', '$2a$10$Xm5j0v3E7p5vO4qjF7v3O.w9vS4x5yGz8O8e7W5r4yGz8O8e7W5r4', '1234567890', 'ADMIN', true);
