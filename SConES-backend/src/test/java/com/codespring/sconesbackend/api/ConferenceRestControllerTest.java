package com.codespring.sconesbackend.api;

import com.codespring.sconesbackend.assembler.ConferenceAssembler;
import com.codespring.sconesbackend.dto.outcoming.ConferenceOutDTO;
import com.codespring.sconesbackend.entity.Conference;
import com.codespring.sconesbackend.repositroy.ConferenceRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class ConferenceRestControllerTest {

    @Autowired
    private ConferenceAssembler conferenceAssembler;

    @Autowired
    private ConferenceRestController conferenceRestController;

    @MockBean
    private ConferenceRepository conferenceRepository;

//    @Test
//    void getAllTest() throws ParseException {
//        //given
//        List<Conference> conferenceList = new ArrayList<>();
//
//        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
//
//        String startDateString = "02-04-2024";
//        String endDateString = "04-04-2024";
//
//        Date startDate = dateFormat.parse(startDateString);
//        Date endDate = dateFormat.parse(endDateString);
//
//        Conference conference = Conference.builder().conferenceId(1L).name("conf1").build();
//
//        Conference conference1 = new Conference(1L, "conf1", startDate, endDate, "Vasarhely");
//        Conference conference2 = new Conference(2L, "conf2", startDate, endDate, "Budapest");
//
//        conferenceList.add(conference1);
//        conferenceList.add(conference2);
//
//        List<ConferenceOutDTO> conferenceOutDTOList = new ArrayList<>();
//        for (Conference conference : conferenceList) {
//            conferenceOutDTOList.add(conferenceAssembler.toConferenceOutDTO(conference));
//        }
//
//        //mock the calls
//        when(conferenceRepository.findAll()).thenReturn(conferenceList);
//
//        //when
//        ResponseEntity<List<ConferenceOutDTO>> listResponseEntity = conferenceRestController.getAll();
//
//        //then
//        assertEquals(listResponseEntity.getBody().get(0).getLocation(), conferenceOutDTOList.get(0).getLocation());
//    }
}
