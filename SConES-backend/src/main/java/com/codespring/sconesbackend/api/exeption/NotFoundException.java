package com.codespring.sconesbackend.api.exeption;

import lombok.Data;

import java.util.Objects;

@Data
public class NotFoundException extends RuntimeException {

    private Class type;

    private Long id;

    public NotFoundException(Class type, Long id) {
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
        NotFoundException that = (NotFoundException) o;
        return Objects.equals(getType(), that.getType()) && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getType(), getId());
    }
}
