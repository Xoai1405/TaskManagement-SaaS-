package com.hagiabao.task_management.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hagiabao.task_management.dto.request.LoginRequest;
import com.hagiabao.task_management.dto.request.RegisterRequest;
import com.hagiabao.task_management.dto.response.LoginResponse;
import com.hagiabao.task_management.dto.response.UserRegisterResponse;
import com.hagiabao.task_management.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController 
@RequestMapping ("/api/v1/auth")
@RequiredArgsConstructor 
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService authSer;

    @PostMapping("/register")
    public  ResponseEntity<UserRegisterResponse> register (@Valid @RequestBody RegisterRequest request) {
        //TODO: process POST request
        UserRegisterResponse res = authSer.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);

    }

     @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authSer.login(request);
        return ResponseEntity.ok(response);
    }
    
}
