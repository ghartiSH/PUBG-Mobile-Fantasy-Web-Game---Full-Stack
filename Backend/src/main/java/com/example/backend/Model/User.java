package com.example.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String username;
    private String email;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_role", joinColumns = {@JoinColumn(name = "user_id")}, inverseJoinColumns = { @JoinColumn(name = "role_id")})
    private Set<Role> role;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = UserTeam.class)
    private List<UserTeam> userTeam;

    public User(String username, String email){
        this.username = username;
        this.email = email;
    }
}
