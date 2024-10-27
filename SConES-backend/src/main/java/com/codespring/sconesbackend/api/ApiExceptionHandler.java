package com.codespring.sconesbackend.api;

import com.codespring.sconesbackend.api.exeption.*;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler {

    private final ApiErrorResponse errorResponse;

    @Autowired
    public ApiExceptionHandler(ApiErrorResponse errorResponse) {
        this.errorResponse = errorResponse;
    }

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<ApiErrorResponse> handleNotFoundException(NotFoundException e) {
        errorResponse.setStatus(HttpStatus.NOT_FOUND.value());
        errorResponse.setMessage("No " + e.getType().getSimpleName() + "found with the Id: " + e.getId());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ApiErrorResponse> handleBadRequestException(BadRequestException e) {
        errorResponse.setStatus(HttpStatus.BAD_REQUEST.value());
        errorResponse.setMessage(
                "Incorrect parameter type: " + e.getType().getSimpleName() + " with the Id: " + e.getId());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ApiErrorResponse> handleCreationFailedException(CreationFailedException e) {
        errorResponse.setStatus(HttpStatus.CONFLICT.value());
        errorResponse.setMessage("Creation failed for: " + e.getType().getSimpleName());
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    public ResponseEntity<ApiErrorResponse> handleNonExistentUserAdditionToPaperException(
            NonExistentUserAdditionToPaperException e) {
        errorResponse.setStatus(HttpStatus.NOT_FOUND.value());
        errorResponse.setMessage("User doesn't exist with the email: " + e.getUserEmail());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnsupportedFileTypeException.class)
    public ResponseEntity<ApiErrorResponse> handleUnsupportedFileTypeException() {
        errorResponse.setStatus(HttpStatus.BAD_REQUEST.value());
        errorResponse.setMessage("Given file type is not supported");
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FileUploadFailedException.class)
    public ResponseEntity<ApiErrorResponse> handleFileUploadFailedException() {
        errorResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        errorResponse.setMessage("File upload failed");
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    public ResponseEntity<ApiErrorResponse> handleUnauthorizedException(UnauthorizedException e) {
        errorResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
        errorResponse.setMessage(e.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @Component
    @Data
    public static class ApiErrorResponse {

        private int status;
        private String message;
    }
}
