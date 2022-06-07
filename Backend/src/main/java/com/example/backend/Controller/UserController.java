package com.example.backend.Controller;

import com.example.backend.Exception.ResourceNotFoundException;
import com.example.backend.Model.Role;
import com.example.backend.Model.Tournaments;
import com.example.backend.Model.User;
import com.example.backend.Payload.UserPld;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.TournamentRepository;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private TournamentRepository tournamentRepository;

    @PostMapping("/user")
    public User addUser(@RequestBody UserPld userPld){
        User user1 = userRepository.save(new User(userPld.getUsername(), userPld.getEmail()));
        user1.setPassword(passwordEncoder.encode(userPld.getPassword()));

        //user1.setRole(userPld.getRole());

        Role role = roleRepository.findById("user").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);


        user1.setRole(roles);

        return userRepository.save(user1);
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/user/{uid}")
    public ResponseEntity<User> getUserById(@PathVariable String uid){
        User user = userRepository.findById(uid).orElseThrow(()-> new ResourceNotFoundException("User not found"));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


}
