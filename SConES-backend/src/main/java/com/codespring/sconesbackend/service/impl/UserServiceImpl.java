package com.codespring.sconesbackend.service.impl;

import com.codespring.sconesbackend.assembler.UserAssembler;
import com.codespring.sconesbackend.dto.incoming.LoginInDTO;
import com.codespring.sconesbackend.dto.incoming.UserInDTO;
import com.codespring.sconesbackend.dto.outcoming.AuthenticationResponse;
import com.codespring.sconesbackend.entity.User;
import com.codespring.sconesbackend.repositroy.UserRepository;
import com.codespring.sconesbackend.security.JwtService;
import com.codespring.sconesbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserAssembler userAssembler;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    @Override
    public User create(User user) {
        return userRepository.saveAndFlush(user);
    }

    @Override
    public User update(User user) {
        return userRepository.saveAndFlush(user);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    @Override
    public boolean existsByPhoneNumber(String phoneNumber) {
        return userRepository.existsByPhoneNumber(phoneNumber);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public AuthenticationResponse register(UserInDTO userInDTO) {
        User user = userAssembler.toUser(userInDTO);
        create(user);
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    @Override
    public AuthenticationResponse login(LoginInDTO loginInDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginInDTO.getEmail(),
                        loginInDTO.getPassword()
                )
        );
        User user = getUserByEmail(loginInDTO.getEmail());
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    @Override
    public List<User> findAllBySectionConferenceId(Long sectionConferenceId) {
        return findAllBySectionConferenceId(sectionConferenceId);
    }

    @Override
    public List<User> findAuthorsByPaperId(Long paperId) {
        return userRepository.findAuthorsByPaperId(paperId);
    }

}
