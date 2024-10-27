package com.codespring.sconesbackend.api.exeption;

import lombok.Data;

import java.util.Objects;

@Data
public class BadRequestException extends RuntimeException {

    private Class type;
    private String id;

    public BadRequestException(Class type, String id) {
        super();
        this.type = type;
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BadRequestException that = (BadRequestException) o;
        return Objects.equals(getType(), that.getType()) && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getType(), getId());
    }
}
