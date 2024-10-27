package com.codespring.sconesbackend.dto.incoming;

import lombok.Data;

@Data
public class UserInDTO {

    private String fullName;

    private String email;

    private String password;

    private String phoneNumber;

    private String role;
}
