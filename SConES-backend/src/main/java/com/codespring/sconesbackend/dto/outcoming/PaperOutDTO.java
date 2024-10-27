package com.codespring.sconesbackend.dto.outcoming;

import lombok.Data;

import java.util.List;

@Data
public class PaperOutDTO {

    private Long paperId;

    private String title;

    private String description;

    private List<String> authorsName;

    private List<String> supervisorsName;

    private String pdfUrl;

    private boolean isApproved;
}
