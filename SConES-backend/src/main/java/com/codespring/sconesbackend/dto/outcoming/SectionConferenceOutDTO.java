package com.codespring.sconesbackend.dto.outcoming;

import com.codespring.sconesbackend.entity.Conference;
import com.codespring.sconesbackend.entity.Jury;
import com.codespring.sconesbackend.entity.Section;
import com.codespring.sconesbackend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SectionConferenceOutDTO {

    private Long sectionConferenceId;

    private ConferenceOutDTO conference;

    private SectionOutDTO section;

    private List<UserOutDTO> candidates;

    private List<JuryOutDTO> juries;

}
