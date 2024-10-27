package com.codespring.sconesbackend.assembler;

import com.codespring.sconesbackend.dto.incoming.ConferenceInDTO;
import com.codespring.sconesbackend.dto.outcoming.ConferenceOutDTO;
import com.codespring.sconesbackend.entity.Conference;
import com.codespring.sconesbackend.entity.Section;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ConferenceAssembler {

    public Conference toConference(
            ConferenceInDTO conferenceInDTO,
            Long conferenceId,
            List<Section> sections,
            String creatorEmail) {
        Conference conference = new Conference();
        if (conferenceId != null) {
            conference.setConferenceId(conferenceId);
        }
        conference.setName(conferenceInDTO.getName());
        conference.setStartDate(conferenceInDTO.getStartDate());
        conference.setEndDate(conferenceInDTO.getEndDate());
        conference.setLocation(conferenceInDTO.getLocation());
        conference.setSections(sections);
        conference.setCreatorEmail(creatorEmail);

        return conference;
    }

    public ConferenceOutDTO toConferenceOutDTO(Conference conference) {
        ConferenceOutDTO conferenceOutDTO = new ConferenceOutDTO();
        conferenceOutDTO.setConferenceId(conference.getConferenceId());
        conferenceOutDTO.setName(conference.getName());
        conferenceOutDTO.setStartDate(conference.getStartDate());
        conferenceOutDTO.setEndDate(conference.getEndDate());
        conferenceOutDTO.setLocation(conference.getLocation());

        return conferenceOutDTO;
    }
}
