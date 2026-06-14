
package com.example.job_portal.service;

import com.example.job_portal.model.User;
import com.example.job_portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register new user
    public User register(User user) {
        return userRepository.save(user);
    }

    // Login
    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        System.out.println("EMAIL ENTERED: " + email);
        System.out.println("PASSWORD ENTERED: " + password);

        if (user.isPresent()) {
            System.out.println("USER FOUND: " + user.get().getEmail());
            System.out.println("PASSWORD IN DB: " + user.get().getPassword());

            if (user.get().getPassword().equals(password)) {
                System.out.println("PASSWORD MATCHED");
                return user;
            } else {
                System.out.println("PASSWORD DOES NOT MATCH");
            }
        } else {
            System.out.println("USER NOT FOUND");
        }

        return Optional.empty();
    }
}