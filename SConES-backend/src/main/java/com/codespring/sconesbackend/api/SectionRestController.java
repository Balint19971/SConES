package com.codespring.sconesbackend.api;

import com.codespring.sconesbackend.api.exeption.BadRequestException;
import com.codespring.sconesbackend.assembler.SectionAssembler;
import com.codespring.sconesbackend.dto.incoming.SectionInDTO;
import com.codespring.sconesbackend.dto.outcoming.SectionOutDTO;
import com.codespring.sconesbackend.entity.Conference;
import com.codespring.sconesbackend.entity.Section;
import com.codespring.sconesbackend.service.SectionService;
import com.codespring.sconesbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sections")
public class SectionRestController {

    private final SectionService sectionService;

    private final SectionAssembler sectionAssembler;

    private final UserService userService;

    @GetMapping("/universities")
    public ResponseEntity<List<String>> getAllUniversitiesContaining(@RequestParam String substring) {
        List<String> universities = sectionService.findAllUniversitiesContaining(substring);

        return ResponseEntity.ok(universities);
    }

    @GetMapping("/by-university")
    public ResponseEntity<List<SectionOutDTO>> getAllSectionsByUniversity(@RequestParam String university) {
        List<Section> sectionList = sectionService.findAllSectionsByUniversity(university);
        List<SectionOutDTO> sectionOutDTOList = new ArrayList<>();

        for (Section section : sectionList) {
            sectionOutDTOList.add(sectionAssembler.toSectionOutDTO(section));
        }

        return ResponseEntity.ok(sectionOutDTOList);
    }

    @GetMapping("/by-conferences/{conferenceId}")
    public ResponseEntity<List<SectionOutDTO>> getAllSectionByConferenceId(
            @PathVariable("conferenceId") String stringConferenceId) {

        try {
            Long conferenceId = Long.parseLong(stringConferenceId);
            List<Section> sectionList = sectionService.findAllByConferenceId(conferenceId);
            List<SectionOutDTO> sectionOutDTOList = new ArrayList<>();

            for (Section section : sectionList) {
                sectionOutDTOList.add(sectionAssembler.toSectionOutDTO(section));
            }

            return ResponseEntity.ok(sectionOutDTOList);
        } catch (NumberFormatException e) {
            throw new BadRequestException(Conference.class, stringConferenceId);
        }
    }

    @PostMapping
    public ResponseEntity<String> saveAll(@RequestBody List<SectionInDTO> sectionInDTOList) {
        List<Section> sectionList = new ArrayList<>();

        for (SectionInDTO sectionInDTO : sectionInDTOList) {
            sectionList.add(sectionAssembler.toSection(sectionInDTO));
        }

        sectionService.saveAllSections(sectionList);

        return ResponseEntity.ok("New Sections saved succesfully");
    }


}
