package com.codespring.sconesbackend.api;

import com.codespring.sconesbackend.api.exeption.BadRequestException;
import com.codespring.sconesbackend.api.exeption.NotFoundException;
import com.codespring.sconesbackend.assembler.UserAssembler;
import com.codespring.sconesbackend.dto.incoming.UserInDTO;
import com.codespring.sconesbackend.dto.outcoming.UserOutDTO;
import com.codespring.sconesbackend.entity.Conference;
import com.codespring.sconesbackend.entity.User;
import com.codespring.sconesbackend.security.Roles;
import com.codespring.sconesbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserRestController {

    private final UserService userService;

    private final UserAssembler userAssembler;

    @GetMapping
    public ResponseEntity<List<UserOutDTO>> getAll() {
        List<UserOutDTO> userOutDTOList = new ArrayList<>();
        for (User user : userService.findAll()) {
            userOutDTOList.add(userAssembler.toUserOutDTO(user));
        }

        return ResponseEntity.ok(userOutDTOList);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserOutDTO> getUserById(@PathVariable("userId") String stringUserId) {
        try {
            long userId = Long.parseLong(stringUserId);

            User user = userService.getById(userId);

            if (user == null) {
                throw new NotFoundException(User.class, userId);
            } else {
                return ResponseEntity.ok(userAssembler.toUserOutDTO(user));
            }
        } catch (NumberFormatException e) {
            throw new BadRequestException(Conference.class, stringUserId);
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserOutDTO> updateUser(
            @RequestBody UserInDTO userInDTO,
            @PathVariable("userId") String stringUserId) {
        try {
            Long userId = Long.parseLong(stringUserId);

            if (userService.existsById(userId)) {
                User user = userService.getById(userId);
                user.setFullName(userInDTO.getFullName());
                user.setPhoneNumber(userInDTO.getPhoneNumber());
                user.setEmail(userInDTO.getEmail());
                switch (userInDTO.getRole()) {
                    case "Author" -> user.setRole(Roles.AUTHOR);
                    case "Supervisor" -> user.setRole(Roles.SUPERVISOR);
                    case "Director" -> user.setRole(Roles.DIRECTOR);
                    case "Admin" -> user.setRole(Roles.ADMIN);
                }
                UserOutDTO userOutDTO = userAssembler.toUserOutDTO(
                        userService.update(user));

                return ResponseEntity.ok(userOutDTO);
            } else {
                throw new NotFoundException(User.class, userId);
            }
        } catch (NumberFormatException e) {
            throw new BadRequestException(Conference.class, stringUserId);
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("userId") String stringUserId) {
        try {
            Long userId = Long.parseLong(stringUserId);

            if (userService.existsById(userId)) {
                userService.deleteById(userId);
                return ResponseEntity.ok(true);
            } else {
                throw new NotFoundException(User.class, userId);
            }
        } catch (NumberFormatException e) {
            throw new BadRequestException(Conference.class, stringUserId);
        }
    }

}
