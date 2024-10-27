package com.codespring.sconesbackend.dto.incoming;

import lombok.Data;

@Data
public class RegisterToSectionConferenceInDTO {

    private Long paperId;

    private SectionConferenceInDTO sectionConferenceInDTO;
}
