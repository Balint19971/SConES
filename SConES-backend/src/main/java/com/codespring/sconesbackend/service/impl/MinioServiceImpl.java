package com.codespring.sconesbackend.service.impl;

import com.codespring.sconesbackend.service.MinioService;
import io.minio.*;
import io.minio.errors.MinioException;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class MinioServiceImpl implements MinioService {

    private final MinioClient minioClient;

    @Override
    public void uploadFile(
            String bucketName,
            String objectName,
            InputStream stream,
            long size,
            String contentType) throws MinioException {
        try {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .stream(stream, size, -1)
                            .contentType(contentType)
                            .build());
        } catch (Exception e) {
            e.printStackTrace();
            throw new MinioException("Error occured while uploading file to MinIO");
        }
    }

    @Override
    public InputStream downloadFile(String bucketName, String objectName) throws MinioException {
        try {
            return minioClient.getObject(
                    GetObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .build());
        } catch (Exception e) {
            e.printStackTrace();
            throw new MinioException("Error occurred while downloading file from MinIO");
        }
    }

    @Override
    public void deleteFile(String bucketName, String objectName) throws MinioException {
        try {
            minioClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .build());
        } catch (Exception e) {
            e.printStackTrace();
            throw new MinioException("Error occurred while deleting file from MinIO");
        }
    }

    @Override
    public String getPdfUrl(Method method, String bucketName, String objectName) throws MinioException {
        try {
            String presignedUrl = minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .method(method)
                            .bucket(bucketName)
                            .object(objectName)
                            .build()
            );

            return presignedUrl;

        } catch (Exception e) {
            e.printStackTrace();
            throw new MinioException("Error occured while geting pdf url");
        }
    }
}
