package com.codespring.sconesbackend.service;

import com.codespring.sconesbackend.dto.incoming.LoginInDTO;
import com.codespring.sconesbackend.dto.incoming.UserInDTO;
import com.codespring.sconesbackend.dto.outcoming.AuthenticationResponse;
import com.codespring.sconesbackend.entity.User;

import java.util.List;

public interface UserService {

    User create(User user);

    User update(User user);

    void deleteById(Long id);

    List<User> findAll();

    User getById(Long id);

    boolean existsById(Long id);

    boolean existsByPhoneNumber(String phoneNumber);

    boolean existsByEmail(String email);

    User getUserByEmail(String email);

    AuthenticationResponse register(UserInDTO userInDTO);

    AuthenticationResponse login(LoginInDTO loginInDTO);

    List<User> findAllBySectionConferenceId(Long sectionConferenceId);

    List<User> findAuthorsByPaperId(Long paperId);
}
