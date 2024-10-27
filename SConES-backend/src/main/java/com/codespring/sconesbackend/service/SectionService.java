package com.codespring.sconesbackend.service;


import com.codespring.sconesbackend.entity.Section;

import java.util.List;

public interface SectionService {

    List<Section> findAll();

    List<String> findAllUniversitiesContaining(String substring);

    List<Section> findAllSectionsByUniversity(String university);

    List<Section> findAllByConferenceId(Long conferenceId);

    void saveAllSections(List<Section> sections);

    Section create(Section section);

    Section getById(Long id);

    Section update(Section section);

    void deleteById(Long id);
}
