package com.codespring.sconesbackend.assembler;

import com.codespring.sconesbackend.dto.incoming.ConferenceInDTO;
import com.codespring.sconesbackend.dto.outcoming.ConferenceOutDTO;
import com.codespring.sconesbackend.entity.Conference;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ConferenceAssemblerTest {

    @Autowired
    private ConferenceAssembler conferenceAssembler;

    private Conference conference;

    private ConferenceOutDTO conferenceOutDTO;

    private ConferenceInDTO conferenceInDTO;

//    @BeforeEach
//    void setUp() throws ParseException {
//        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
//        Date startDate = dateFormat.parse("02-05-2024");
//        Date endDate = dateFormat.parse("03-05-2024");
//
//        conference = new Conference(1L, "Conf1", startDate, endDate, "Budapest");
//
//        conferenceOutDTO = new ConferenceOutDTO();
//        conferenceOutDTO.setConferenceId(1L);
//        conferenceOutDTO.setName("Conf1");
//        conferenceOutDTO.setStartDate(startDate);
//        conferenceOutDTO.setEndDate(endDate);
//        conferenceOutDTO.setLocation("Budapest");
//
//        conferenceInDTO = new ConferenceInDTO();
//        conferenceInDTO.setName("Conf1");
//        conferenceInDTO.setStartDate(startDate);
//        conferenceInDTO.setEndDate(endDate);
//        conferenceInDTO.setLocation("Budapest");
//    }

//    @Test
//    void toConferenceTest() {
//        //when
//        Conference conferenceFromAssembler = conferenceAssembler.toConference(conferenceInDTO, 1L);
//
//        //then
//        assertEquals(conferenceFromAssembler.getStartDate(), conference.getStartDate());
//    }

//    @Test
//    void toConferenceOutDTOTest() {
//        //when
//        ConferenceOutDTO conferenceOutDTOFromAssembler = conferenceAssembler.toConferenceOutDTO(conference);
//
//        //then
//        assertEquals(conferenceOutDTOFromAssembler.getStartDate(), conferenceOutDTO.getStartDate());
//    }
}
