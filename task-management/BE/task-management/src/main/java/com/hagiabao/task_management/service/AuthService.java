package com.hagiabao.task_management.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hagiabao.task_management.dto.request.LoginRequest;
import com.hagiabao.task_management.dto.request.RegisterRequest;
import com.hagiabao.task_management.dto.response.LoginResponse;
import com.hagiabao.task_management.dto.response.UserRegisterResponse;
import com.hagiabao.task_management.entity.User;
import com.hagiabao.task_management.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class AuthService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtSer;

    public UserRegisterResponse register(RegisterRequest request) {
        if (userRepo.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email đã được sử dụng");
        }
    
    User user = new User();
    user.setEmail(request.email());
    user.setFullName(request.fullName());
    user.setPassword(passwordEncoder.encode(request.password()));

    user = userRepo.save(user);
    return new UserRegisterResponse(user.getId(),request.email(),request.fullName());
}
public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        User user = userRepo.findByEmail(request.email())
                .orElseThrow(() -> new IllegalStateException("User không tồn tại"));

        String token = jwtSer.generateToken(user.getEmail());

        return new LoginResponse(token, user.getId(), user.getFullName(), user.getEmail());
    }
}