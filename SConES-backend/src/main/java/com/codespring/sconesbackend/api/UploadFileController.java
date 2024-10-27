package com.codespring.sconesbackend.api;

import com.codespring.sconesbackend.api.exeption.FileUploadFailedException;
import com.codespring.sconesbackend.api.exeption.UnsupportedFileTypeException;
import com.codespring.sconesbackend.service.MinioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/files")
public class UploadFileController {

    private final MinioService minioService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        if (!Objects.equals(file.getContentType(), "application/pdf")) {
            throw new UnsupportedFileTypeException();
        }
        try {
            InputStream inputStream = file.getInputStream();
            String bucketName = "scones";
            String objectName = LocalDate.now().getYear() + "/" + file.getOriginalFilename();
            String contentType = file.getContentType();
            long size = file.getSize();

            minioService.uploadFile(bucketName, objectName, inputStream, size, contentType);
            Map<String, String> response = new HashMap<>();
            response.put("objectPath", objectName);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            throw new FileUploadFailedException();
        }
    }
}
