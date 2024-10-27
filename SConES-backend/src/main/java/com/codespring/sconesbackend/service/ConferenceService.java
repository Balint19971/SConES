package com.codespring.sconesbackend.service;

import com.codespring.sconesbackend.entity.Conference;

import java.util.Date;
import java.util.List;

public interface ConferenceService {

    Conference create(Conference conference);

    Conference update(Conference conference);

    boolean deleteById(Long id);

    List<Conference> findAll();

    Conference getById(Long id);

    boolean existsById(Long id);

    Conference findConferenceByLocationAndStartDateAndEndDate(String location, Date startDate, Date endDate);

    Conference findByIdWithSections(Long conferenceId);

    List<Conference> getConferencesWithOpenRegistration();

    List<Conference> getConferencesWithExpiredEndDate();

    boolean isConferenceExpired(Conference conference);

    List<Conference> findAllByCreatorEmail(String email);

}
