package com.codespring.sconesbackend.api;

import com.codespring.sconesbackend.dto.incoming.LoginInDTO;
import com.codespring.sconesbackend.dto.incoming.UserInDTO;
import com.codespring.sconesbackend.dto.outcoming.AuthenticationResponse;
import com.codespring.sconesbackend.service.UserService;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthRestController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginInDTO loginInDTO) {
        return ResponseEntity.ok(userService.login(loginInDTO));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UserInDTO userInDTO) {
        return ResponseEntity.ok(userService.register(userInDTO));
    }

}

