package com.example.job_portal.controller;

import com.example.job_portal.model.AuthResponse;
import com.example.job_portal.model.User;
import com.example.job_portal.security.JwtUtil;
import com.example.job_portal.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public Object login(@RequestBody User user) {

        Optional<User> validUser =
                userService.login(user.getEmail(), user.getPassword());

        if (validUser.isPresent()) {

            User dbUser = validUser.get();

            String token = jwtUtil.generateToken(
                    dbUser.getEmail(),
                    dbUser.getRole()
            );

            return new AuthResponse(validUser.get(), token);
        }

        return "Invalid credentials";
    }
}