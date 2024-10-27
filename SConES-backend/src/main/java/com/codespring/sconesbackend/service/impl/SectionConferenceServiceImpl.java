package com.codespring.sconesbackend.service.impl;

import com.codespring.sconesbackend.entity.*;
import com.codespring.sconesbackend.repositroy.SectionConferenceRepository;
import com.codespring.sconesbackend.service.SectionConferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SectionConferenceServiceImpl implements SectionConferenceService {

    private final SectionConferenceRepository sectionConferenceRepository;


    @Override
    public SectionConference create(SectionConference sectionConference) {
        return sectionConferenceRepository.saveAndFlush(sectionConference);
    }

    @Override
    public SectionConference update(SectionConference sectionConference) {
        return sectionConferenceRepository.saveAndFlush(sectionConference);
    }

    @Override
    public SectionConference getById(Long id) {
        return sectionConferenceRepository.findById(id).orElse(null);
    }

    @Override
    public Long findSectionConferenceIdByConferenceIdAndSectionId(Long conferenceId, Long sectionId) {
        return sectionConferenceRepository.findSectionConferenceIdByConferenceIdAndSectionId(conferenceId, sectionId);
    }

    @Override
    public List<User> findUsersByConferenceId(Long conferenceId) {
        return sectionConferenceRepository.findUsersByConferenceId(conferenceId);
    }

    @Override
    public SectionConference getSectionConferenceWithJuriesBySectionConferenceId(Long sectionConferenceId) {
        return sectionConferenceRepository.getSectionConferenceWithJuriesBySectionConferenceId(sectionConferenceId);
    }

    @Override
    public Section findSectionBySectionConferenceId(Long sectionConferenceId) {
        return sectionConferenceRepository.findSectionBySectionConferenceId(sectionConferenceId).orElse(null);
    }

    @Override
    public Conference findConferenceBySectionConferenceId(Long sectionConferenceId) {
        return sectionConferenceRepository.findConferenceBySectionConferenceId(sectionConferenceId).orElse(null);
    }

    @Override
    public List<Jury> findJuriesBySectionConferenceId(Long sectionConferenceId) {
        return sectionConferenceRepository.findJuriesBySectionConferenceId(sectionConferenceId);
    }

    @Override
    public List<User> findCandidatesBySectionConferenceId(Long sectionConferenceId) {
        return sectionConferenceRepository.findCandidatesBySectionConferenceId(sectionConferenceId);
    }
}
