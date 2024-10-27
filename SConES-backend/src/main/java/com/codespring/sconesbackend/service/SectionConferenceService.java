package com.codespring.sconesbackend.service;

import com.codespring.sconesbackend.entity.*;

import java.util.List;

public interface SectionConferenceService {

    SectionConference create(SectionConference sectionConference);

    SectionConference update(SectionConference sectionConference);

    SectionConference getById(Long id);

    Long findSectionConferenceIdByConferenceIdAndSectionId(Long conferenceId, Long sectionId);

    List<User> findUsersByConferenceId(Long conferenceId);

    SectionConference getSectionConferenceWithJuriesBySectionConferenceId(Long sectionConferenceId);

    Section findSectionBySectionConferenceId(Long sectionConferenceId);

    Conference findConferenceBySectionConferenceId(Long sectionConferenceId);

    List<Jury> findJuriesBySectionConferenceId(Long sectionConferenceId);

    List<User> findCandidatesBySectionConferenceId(Long sectionConferenceId);
}
