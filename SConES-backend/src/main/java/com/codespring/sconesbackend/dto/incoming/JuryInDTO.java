package com.codespring.sconesbackend.dto.incoming;

import lombok.Data;

@Data
public class JuryInDTO {

    private Long juryId;

    private String name;

    private String email;
}
