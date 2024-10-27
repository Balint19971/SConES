package com.codespring.sconesbackend.dto.incoming;

import lombok.Data;

@Data
public class LoginInDTO {

    private String email;

    private String password;
}
