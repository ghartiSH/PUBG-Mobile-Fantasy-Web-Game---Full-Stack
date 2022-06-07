package com.example.backend.Model;

import lombok.Data;

@Data
public class JwtRequest {
    private String userName;
    private String password;
}
