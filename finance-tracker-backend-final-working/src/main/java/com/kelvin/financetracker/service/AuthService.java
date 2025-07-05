package com.kelvin.financetracker.service;

import com.kelvin.financetracker.model.Role;
import com.kelvin.financetracker.model.User;
import com.kelvin.financetracker.repository.RoleRepository;
import com.kelvin.financetracker.repository.UserRepository;
import com.kelvin.financetracker.security.JwtTokenProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final JwtTokenProvider jwtProvider;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepo, RoleRepository roleRepo, JwtTokenProvider jwtProvider) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.jwtProvider = jwtProvider;
    }

    public boolean register(String username, String password) {
        if (userRepo.existsByUsername(username)) return false;
        Role userRole = roleRepo.findByName("USER").orElseGet(() -> roleRepo.save(new Role(null, "USER")));
        User user = new User(null, username, passwordEncoder.encode(password), Collections.singleton(userRole));
        userRepo.save(user);
        return true;
    }

    public Optional<String> login(String username, String password) {
        return userRepo.findByUsername(username)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(user -> jwtProvider.generateToken(user.getUsername()));
    }
}
