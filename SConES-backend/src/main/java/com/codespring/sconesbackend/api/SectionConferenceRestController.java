package com.codespring.sconesbackend.api;

import com.codespring.sconesbackend.api.exeption.BadRequestException;
import com.codespring.sconesbackend.assembler.*;
import com.codespring.sconesbackend.dto.incoming.*;
import com.codespring.sconesbackend.dto.outcoming.SectionConferenceOutDTO;
import com.codespring.sconesbackend.entity.*;
import com.codespring.sconesbackend.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sections-conference")
public class SectionConferenceRestController {

    private final UserService userService;

    private final PaperService paperService;

    private final SectionConferenceService sectionConferenceService;

    private final SectionConferenceAssembler sectionConferenceAssembler;


    @PostMapping("/id")
    public ResponseEntity<Map<String, Long>> getSectionConferenceIdByConferenceAndSectionId(
            @RequestBody SectionConferenceInDTO sectionConferenceInDTO) {

        Long sectionConferenceId =
                sectionConferenceService.findSectionConferenceIdByConferenceIdAndSectionId(
                        sectionConferenceInDTO.getConferenceId(), sectionConferenceInDTO.getSectionId()
                );

        Map<String, Long> response = new HashMap<>();
        response.put("sectionConferenceId", sectionConferenceId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{sectionConferenceId}")
    public ResponseEntity<SectionConferenceOutDTO> getSectionConferenceById(
            @PathVariable("sectionConferenceId") String stringSectionConferenceId) {

        try {
            long sectionConferenceId = Long.parseLong(stringSectionConferenceId);

            SectionConference sectionConference = sectionConferenceService.getById(sectionConferenceId);

            SectionConferenceOutDTO sectionConferenceOutDTO =
                    sectionConferenceAssembler.toSectionConferenceOutDTO(sectionConference);

            return ResponseEntity.ok(sectionConferenceOutDTO);

        } catch (NumberFormatException e) {
            throw new BadRequestException(Conference.class, stringSectionConferenceId);
        }
    }

    @PutMapping("/register-to-conference")
    public ResponseEntity<String> candidateRegistrationToConference(
            @RequestBody RegisterToSectionConferenceInDTO registerToSectionConferenceInDTO,
            @AuthenticationPrincipal UserDetails userDetails) {

        SectionConference sectionConference = sectionConferenceAssembler.toSectionConference(
                registerToSectionConferenceInDTO.getSectionConferenceInDTO());

        List<User> registeredUsersToConferences = sectionConferenceService.findUsersByConferenceId(
                sectionConference.getSectionConferenceId());

        List<User> authorsByPaper = userService.findAuthorsByPaperId(registerToSectionConferenceInDTO.getPaperId());

        String username = userDetails.getUsername();
        if (isUserAlreadyRegisteredToConference(username, registeredUsersToConferences)
                || isAuthorWithTheSamePaperAlreadyRegistered(authorsByPaper, registeredUsersToConferences)) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("You are already registered to this conference");
        }

        Paper paper = paperService.getById(registerToSectionConferenceInDTO.getPaperId());


        if (paper.isApproved()) {
            sectionConference.addCandidate(userService.getUserByEmail(userDetails.getUsername()));
            sectionConferenceService.update(sectionConference);

            return ResponseEntity.ok("Your registration to the conference was successful");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("You can't register to conference with unapproved paper");
        }
    }

    @PutMapping("/add-juries")
    public ResponseEntity<String> addJuriesToSectionConference(
            @RequestBody SectionConferenceInDTO sectionConferenceInDTO) {

        sectionConferenceService.update(sectionConferenceAssembler.toSectionConference(sectionConferenceInDTO));

        return ResponseEntity.ok("You successfully updated juries in section-conference");
    }


    private boolean isUserAlreadyRegisteredToConference(String username, List<User> registeredUsers) {
        return registeredUsers.stream().anyMatch(user -> user.getUsername().equals(username));
    }

    private boolean isAuthorWithTheSamePaperAlreadyRegistered(List<User> authors, List<User> registeredUsers) {
        return authors.stream()
                .anyMatch(author -> registeredUsers.stream()
                        .anyMatch(user -> user.getUsername().equals(author.getUsername())));
    }

}
