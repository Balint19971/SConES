package com.codespring.sconesbackend.api;

import com.codespring.sconesbackend.api.exeption.BadRequestException;
import com.codespring.sconesbackend.api.exeption.CreationFailedException;
import com.codespring.sconesbackend.api.exeption.NotFoundException;
import com.codespring.sconesbackend.assembler.ConferenceAssembler;
import com.codespring.sconesbackend.dto.incoming.ConferenceInDTO;
import com.codespring.sconesbackend.dto.outcoming.ConferenceOutDTO;
import com.codespring.sconesbackend.entity.Conference;
import com.codespring.sconesbackend.entity.Section;
import com.codespring.sconesbackend.service.ConferenceService;

import com.codespring.sconesbackend.service.SectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/conferences")
public class ConferenceRestController {

    private final ConferenceService conferenceService;

    private final SectionService sectionService;
    private final ConferenceAssembler conferenceAssembler;

    @GetMapping
    public ResponseEntity<List<ConferenceOutDTO>> getAll() {
        List<ConferenceOutDTO> conferenceOutDTOList = new ArrayList<>();
        for (Conference conference : conferenceService.findAll()) {
            conferenceOutDTOList.add(conferenceAssembler.toConferenceOutDTO(conference));
        }

        return ResponseEntity.ok(conferenceOutDTOList);
    }

    @GetMapping("/by-creator")
    public ResponseEntity<List<ConferenceOutDTO>> getAllByCreator(@AuthenticationPrincipal UserDetails userDetails) {
        List<ConferenceOutDTO> conferenceOutDTOList = new ArrayList<>();
        for (Conference conference : conferenceService.findAllByCreatorEmail(userDetails.getUsername())) {
            conferenceOutDTOList.add(conferenceAssembler.toConferenceOutDTO(conference));
        }

        return ResponseEntity.ok(conferenceOutDTOList);
    }

    @GetMapping("/open-registrations")
    public ResponseEntity<List<ConferenceOutDTO>> getConferencesWithOpenRegistration() {
        List<ConferenceOutDTO> conferenceOutDTOList = new ArrayList<>();
        for (Conference conference : conferenceService.getConferencesWithOpenRegistration()) {
            conferenceOutDTOList.add(conferenceAssembler.toConferenceOutDTO(conference));
        }

        return ResponseEntity.ok(conferenceOutDTOList);
    }

    @GetMapping("/expired")
    public ResponseEntity<List<ConferenceOutDTO>> getConferencesWithExpiredEndDate() {
        List<ConferenceOutDTO> conferenceOutDTOList = new ArrayList<>();
        for (Conference conference : conferenceService.getConferencesWithExpiredEndDate()) {
            conferenceOutDTOList.add(conferenceAssembler.toConferenceOutDTO(conference));
        }

        return ResponseEntity.ok(conferenceOutDTOList);
    }

    @GetMapping("/{conferenceId}")
    public ResponseEntity<ConferenceOutDTO> getConferenceById(@PathVariable("conferenceId") String stringConferenceId) {
        try {
            long conferenceId = Long.parseLong(stringConferenceId);

            Conference conference = conferenceService.findByIdWithSections(conferenceId);

            if (conference == null) {
                throw new NotFoundException(Conference.class, conferenceId);
            } else {
                return ResponseEntity.ok(conferenceAssembler.toConferenceOutDTO(conference));
            }
        } catch (NumberFormatException e) {
            throw new BadRequestException(Conference.class, stringConferenceId);
        }
    }

    @PostMapping
    public ResponseEntity<ConferenceOutDTO> createConference(
            @RequestBody ConferenceInDTO conferenceInDTO, @AuthenticationPrincipal UserDetails userDetails) {

        if (conferenceService.findConferenceByLocationAndStartDateAndEndDate(
                conferenceInDTO.getLocation(),
                conferenceInDTO.getStartDate(),
                conferenceInDTO.getEndDate()) == null) {

            List<Section> sectionList = new ArrayList<>();

            for (Long id : conferenceInDTO.getSectionsIds()) {
                sectionList.add(sectionService.getById(id));
            }

            ConferenceOutDTO conferenceOutDTO = conferenceAssembler.toConferenceOutDTO(
                    conferenceService.create(conferenceAssembler.toConference(
                            conferenceInDTO, null, sectionList, userDetails.getUsername())));

            return ResponseEntity.ok(conferenceOutDTO);

        } else {
            throw new CreationFailedException(Conference.class);
        }
    }

    @PutMapping("/{conferenceId}")
    public ResponseEntity<ConferenceOutDTO> updateConference(
            @RequestBody ConferenceInDTO conferenceInDTO,
            @PathVariable("conferenceId") String stringConferenceId,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Long conferenceId = Long.parseLong(stringConferenceId);

            if (conferenceService.existsById(conferenceId)) {

                List<Section> sectionList = new ArrayList<>();

                for (Long id : conferenceInDTO.getSectionsIds()) {
                    sectionList.add(sectionService.getById(id));
                }

                ConferenceOutDTO conferenceOutDTO = conferenceAssembler.toConferenceOutDTO(
                        conferenceService.update(conferenceAssembler.toConference(
                                conferenceInDTO, conferenceId, sectionList, userDetails.getUsername())));

                return ResponseEntity.ok(conferenceOutDTO);
            } else {
                throw new NotFoundException(Conference.class, conferenceId);
            }
        } catch (NumberFormatException e) {
            throw new BadRequestException(Conference.class, stringConferenceId);
        }
    }

    @DeleteMapping("/{conferenceId}")
    public boolean deleteConference(@PathVariable("conferenceId") String stringConferenceId) {
        try {
            Long conferenceId = Long.parseLong(stringConferenceId);

            if (conferenceService.existsById(conferenceId)) {
                return conferenceService.deleteById(conferenceId);
            } else {
                throw new NotFoundException(Conference.class, conferenceId);
            }
        } catch (NumberFormatException e) {
            throw new BadRequestException(Conference.class, stringConferenceId);
        }
    }

}
