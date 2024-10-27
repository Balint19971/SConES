package com.codespring.sconesbackend.service.impl;

import com.codespring.sconesbackend.entity.Conference;
import com.codespring.sconesbackend.repositroy.ConferenceRepository;
import com.codespring.sconesbackend.service.ConferenceService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class ConferenceServiceImplTest {

    @Autowired
    private ConferenceService conferenceService;

    @MockBean
    private ConferenceRepository conferenceRepository;

//    @Test
//    void getAllTest() {
//        //given
//        List<Conference> conferenceList = new ArrayList<>();
//
//        Conference conference1 = new Conference(1L, "conf1", new Date(), new Date(), "Vasarhely");
//        Conference conference2 = new Conference(2L, "conf2", new Date(), new Date(), "Budapest");
//
//        conferenceList.add(conference1);
//        conferenceList.add(conference2);
//
//        //mock the calls
//        when(conferenceRepository.findAll()).thenReturn(conferenceList);
//
//        //when
//        List<Conference> conferenceListFromService = conferenceService.findAll();
//
//        //then
//        assertEquals(conference1.getLocation(), conferenceListFromService.get(0).getLocation());
//    }
}
