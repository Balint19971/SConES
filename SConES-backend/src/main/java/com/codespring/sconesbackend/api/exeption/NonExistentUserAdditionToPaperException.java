package com.codespring.sconesbackend.api.exeption;

import lombok.Data;

import java.util.Objects;

@Data
public class NonExistentUserAdditionToPaperException extends RuntimeException {

    private String userEmail;

    public NonExistentUserAdditionToPaperException(String userEmail) {
        this.userEmail = userEmail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        NonExistentUserAdditionToPaperException that = (NonExistentUserAdditionToPaperException) o;
        return Objects.equals(getUserEmail(), that.getUserEmail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserEmail());
    }
}
