package com.codespring.sconesbackend.dto.incoming;

import com.codespring.sconesbackend.entity.Jury;
import com.codespring.sconesbackend.entity.User;
import lombok.Data;

import java.util.List;

@Data
public class SectionConferenceInDTO {

    private Long sectionConferenceId;

    private Long sectionId;

    private Long conferenceId;

    private List<JuryInDTO> juries;
}
