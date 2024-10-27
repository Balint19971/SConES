package com.codespring.sconesbackend.dto.outcoming;

import lombok.Data;

@Data
public class UserOutDTO {

    private Long id;

    private String fullName;

    private String phoneNumber;

    private String email;

    private String role;
}
