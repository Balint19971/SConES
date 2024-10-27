package com.codespring.sconesbackend.api.exeption;

import lombok.Data;

import java.util.Objects;

@Data
public class CreationFailedException extends RuntimeException {

    private Class type;

    public CreationFailedException(Class type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CreationFailedException that = (CreationFailedException) o;
        return Objects.equals(getType(), that.getType());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getType());
    }
}
