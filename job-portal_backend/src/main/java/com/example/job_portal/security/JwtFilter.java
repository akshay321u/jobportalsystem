package com.example.job_portal.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        System.out.println("AUTH HEADER: " + authHeader);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);

            try {
                // Extract email from JWT subject
                String email = jwtUtil.extractEmail(token);

                // Extract role from JWT claim
                String role = jwtUtil.extractRole(token);

                System.out.println("EMAIL FROM TOKEN: " + email);
                System.out.println("ROLE FROM TOKEN: " + role);

                if (email != null &&
                    SecurityContextHolder.getContext()
                        .getAuthentication() == null) {

                    UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            List.of(
                                new SimpleGrantedAuthority(
                                    "ROLE_" + role
                                )
                            )
                        );

                    SecurityContextHolder.getContext()
                        .setAuthentication(authentication);

                    System.out.println("AUTHENTICATION SUCCESS");
                }

            } catch (Exception e) {
                System.out.println("JWT ERROR: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}