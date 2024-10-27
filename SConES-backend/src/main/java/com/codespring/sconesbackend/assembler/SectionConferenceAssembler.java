package com.codespring.sconesbackend.assembler;

import com.codespring.sconesbackend.dto.incoming.JuryInDTO;
import com.codespring.sconesbackend.dto.incoming.SectionConferenceInDTO;
import com.codespring.sconesbackend.dto.outcoming.JuryOutDTO;
import com.codespring.sconesbackend.dto.outcoming.SectionConferenceOutDTO;
import com.codespring.sconesbackend.dto.outcoming.UserOutDTO;
import com.codespring.sconesbackend.entity.*;
import com.codespring.sconesbackend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SectionConferenceAssembler {

    private final JuryService juryService;

    private final JuryAssembler juryAssembler;

    private final UserAssembler userAssembler;

    private final ConferenceAssembler conferenceAssembler;

    private final SectionAssembler sectionAssembler;

    private final ConferenceService conferenceService;

    private final SectionService sectionService;

    private final SectionConferenceService sectionConferenceService;


    public SectionConference toSectionConference(SectionConferenceInDTO sectionConferenceInDTO) {
        SectionConference.SectionConferenceBuilder builder = SectionConference.builder()
                .conference(conferenceService.getById(sectionConferenceInDTO.getConferenceId()))
                .section(sectionService.getById(sectionConferenceInDTO.getSectionId()));

        if (sectionConferenceInDTO.getSectionConferenceId() != null) {
            builder.sectionConferenceId(sectionConferenceInDTO.getSectionConferenceId());
            builder.candidates(sectionConferenceService.findCandidatesBySectionConferenceId(
                    sectionConferenceInDTO.getSectionConferenceId()));
        }

        if (sectionConferenceInDTO.getJuries() != null) {
            List<Jury> juryList = new ArrayList<>();
            for (JuryInDTO juryInDTO : sectionConferenceInDTO.getJuries()) {
                if (juryService.findByEmail(juryInDTO.getEmail()) != null) {
                    juryList.add(juryService.findByEmail(juryInDTO.getEmail()));
                } else {
                    juryList.add(juryService.create(juryAssembler.toJury(juryInDTO)));
                }
            }
            builder.juries(juryList);
        }

        return builder.build();
    }

    public SectionConferenceOutDTO toSectionConferenceOutDTO(SectionConference sectionConference) {
        SectionConferenceOutDTO.SectionConferenceOutDTOBuilder builder = SectionConferenceOutDTO.builder()
                .sectionConferenceId(sectionConference.getSectionConferenceId())
                .conference(conferenceAssembler.toConferenceOutDTO(sectionConference.getConference()))
                .section(sectionAssembler.toSectionOutDTO(sectionConference.getSection()));

        List<User> userList = sectionConference.getCandidates();
        List<UserOutDTO> userOutDTOList = new ArrayList<>();
        for (User user : userList) {
            userOutDTOList.add(userAssembler.toUserOutDTO(user));
        }
        builder.candidates(userOutDTOList);

        List<Jury> juriesList = sectionConference.getJuries();
        List<JuryOutDTO> juryOutDTOList = new ArrayList<>();
        for (Jury jury : juriesList) {
            juryOutDTOList.add(juryAssembler.toJuryOutDTO(jury));
        }
        builder.juries(juryOutDTOList);

        return builder.build();
    }
}
