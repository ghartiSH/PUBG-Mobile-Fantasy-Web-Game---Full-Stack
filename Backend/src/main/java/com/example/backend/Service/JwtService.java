package com.example.backend.Service;

import com.example.backend.Controller.UserController;
import com.example.backend.Model.JwtRequest;
import com.example.backend.Model.JwtResponse;
import com.example.backend.Model.User;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class JwtService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception{
        String userName = jwtRequest.getUserName();
        String password = jwtRequest.getPassword();
        authenticate(userName, password);
        final UserDetails userDetails =  loadUserByUsername(userName);
        String newGeneratedToken = jwtUtil.generateToken(userDetails);

        User user = userRepository.findById(userName).get();
         return new JwtResponse(user, newGeneratedToken);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       User user =  userRepository.findById(username).get();
       if(user !=null){
           return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),getAuthorities(user) );
       }
       else{
           throw new UsernameNotFoundException("UserName is not valid");
       }
       }


    private void authenticate(String username, String password) throws Exception{
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        } catch (DisabledException e){
            throw new Exception("User is disabled");
        }
        catch(BadCredentialsException e){
            throw new Exception("Bad Credentials");
        }
    }

    private Set getAuthorities(User user){
        Set authorities = new HashSet();
        user.getRole().forEach( role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_"+ role.getRoleName()));
        });
        return authorities;
    }


}
