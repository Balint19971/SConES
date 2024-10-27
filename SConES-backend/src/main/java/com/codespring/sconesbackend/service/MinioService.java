package com.codespring.sconesbackend.service;

import io.minio.errors.MinioException;
import io.minio.http.Method;

import java.io.InputStream;

public interface MinioService {

    void uploadFile(String bucketName, String objectName, InputStream stream, long size, String contentType)
            throws MinioException;

    InputStream downloadFile(String bucketName, String objectName) throws MinioException;

    void deleteFile(String bucketName, String objectName) throws MinioException;

    String getPdfUrl(Method method, String bucketName, String objectName) throws MinioException;
}
