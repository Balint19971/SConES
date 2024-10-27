package com.codespring.sconesbackend.assembler;

import com.codespring.sconesbackend.dto.incoming.UserInDTO;
import com.codespring.sconesbackend.dto.outcoming.UserOutDTO;
import com.codespring.sconesbackend.entity.User;
import com.codespring.sconesbackend.security.Roles;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserAssembler {

    private final PasswordEncoder passwordEncoder;

    public User toUser(UserInDTO userInDTO) {
        User user = new User();

        user.setFullName(userInDTO.getFullName());
        user.setPassword(passwordEncoder.encode(userInDTO.getPassword()));
        user.setPhoneNumber(userInDTO.getPhoneNumber());
        user.setEmail(userInDTO.getEmail());

        switch (userInDTO.getRole()) {
            case "Author" -> user.setRole(Roles.AUTHOR);
            case "Supervisor" -> user.setRole(Roles.SUPERVISOR);
            case "Director" -> user.setRole(Roles.DIRECTOR);
            case "Admin" -> user.setRole(Roles.ADMIN);
        }

        return user;
    }

    public UserOutDTO toUserOutDTO(User user) {
        UserOutDTO userOutDTO = new UserOutDTO();

        userOutDTO.setId(user.getUserId());
        userOutDTO.setFullName(user.getFullName());
        userOutDTO.setPhoneNumber(user.getPhoneNumber());
        userOutDTO.setEmail(user.getEmail());
        userOutDTO.setRole(user.getRole().name());

        return userOutDTO;
    }
}
