package com.codespring.sconesbackend.dto.outcoming;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SectionOutDTO {

    private Long sectionId;

    private String name;

    private String university;
}
