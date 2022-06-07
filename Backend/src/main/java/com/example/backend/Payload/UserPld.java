package com.example.backend.Payload;
import com.example.backend.Model.Role;
import lombok.Data;

import java.util.Set;

@Data
public class UserPld {
    private String username;
    private String email;
    private String password;
    private Set<Role> role;
}
