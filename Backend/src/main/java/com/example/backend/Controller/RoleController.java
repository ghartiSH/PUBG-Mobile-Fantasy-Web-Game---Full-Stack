package com.example.backend.Controller;

import com.example.backend.Model.Role;
import com.example.backend.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;
    @PostMapping("/role")
    public Role createRole(@RequestBody Role role){
         return roleRepository.save(role);
    }

    @GetMapping("/role")
    public ResponseEntity<List<Role>> getAllRoles(){
        return new ResponseEntity<>(roleRepository.findAll(), HttpStatus.OK);
    }
}
