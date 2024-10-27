package com.codespring.sconesbackend.dto.incoming;

import lombok.Data;

import java.util.List;

@Data
public class PaperInDTO {

    private Long paperId;

    private String title;

    private String description;

    private List<String> emails;

    private String objectPath;
}
