package com.codespring.sconesbackend.service.impl;

import com.codespring.sconesbackend.entity.Section;
import com.codespring.sconesbackend.repositroy.SectionRepository;
import com.codespring.sconesbackend.service.SectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SectionServiceImpl implements SectionService {

    private final SectionRepository sectionRepository;

    @Override
    public List<Section> findAll() {
        return sectionRepository.findAll();
    }

    @Override
    public List<String> findAllUniversitiesContaining(String substring) {
        return sectionRepository.findAllUniversitiesContaining(substring);
    }

    @Override
    public List<Section> findAllSectionsByUniversity(String university) {
        return sectionRepository.findAllByUniversity(university);
    }

    @Override
    public List<Section> findAllByConferenceId(Long conferenceId) {
        return sectionRepository.findAllByConferenceId(conferenceId);
    }

    @Override
    public void saveAllSections(List<Section> sections) {
        sectionRepository.saveAllAndFlush(sections);
    }

    @Override
    public Section create(Section section) {
        return sectionRepository.saveAndFlush(section);
    }

    @Override
    public Section getById(Long id) {
        return sectionRepository.findById(id).orElse(null);
    }

    @Override
    public Section update(Section section) {
        return sectionRepository.saveAndFlush(section);
    }

    @Override
    public void deleteById(Long id) {
        sectionRepository.deleteById(id);
    }
}
