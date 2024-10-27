package com.codespring.sconesbackend.api.exeption;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UnauthorizedException extends RuntimeException {

    private String message;
}
