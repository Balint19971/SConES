package com.codespring.sconesbackend.service.impl;

import com.codespring.sconesbackend.entity.Conference;
import com.codespring.sconesbackend.repositroy.ConferenceRepository;
import com.codespring.sconesbackend.service.ConferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ConferenceServiceImpl implements ConferenceService {

    private final ConferenceRepository conferenceRepository;

    @Override
    public Conference create(Conference conference) {
        return conferenceRepository.saveAndFlush(conference);
    }

    @Override
    public Conference update(Conference conference) {
        return conferenceRepository.saveAndFlush(conference);
    }

    @Override
    public boolean deleteById(Long id) {
        conferenceRepository.deleteById(id);
        return !conferenceRepository.existsById(id);
    }

    @Override
    public List<Conference> findAll() {
        return conferenceRepository.findAll();
    }

    @Override
    public Conference getById(Long id) {
        return conferenceRepository.findById(id).orElse(null);
    }

    @Override
    public boolean existsById(Long id) {
        return conferenceRepository.existsById(id);
    }

    @Override
    public Conference findConferenceByLocationAndStartDateAndEndDate(
            String location, Date startDate, Date endDate) {
        return conferenceRepository.findConferenceByLocationAndStartDateAndEndDate(
                location, startDate, endDate);
    }

    @Override
    public Conference findByIdWithSections(Long conferenceId) {
        return conferenceRepository.findByIdWithSections(conferenceId);
    }

    @Override
    public List<Conference> getConferencesWithOpenRegistration() {
        List<Conference> allConferences = conferenceRepository.findAll();
        return allConferences.stream()
                .filter(this::isRegistrationOpen)
                .collect(Collectors.toList());
    }

    @Override
    public List<Conference> getConferencesWithExpiredEndDate() {
        List<Conference> allConferences = conferenceRepository.findAll();
        return allConferences.stream()
                .filter(this::isConferenceExpired)
                .collect(Collectors.toList());
    }

    private boolean isRegistrationOpen(Conference conference) {
        Date startDate = conference.getStartDate();
        if (startDate != null) {
            LocalDate localStartDate = startDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate registrationDeadlineLocalDate = localStartDate.minusWeeks(1);
            Date registrationDeadline = Date.from(registrationDeadlineLocalDate.atStartOfDay(
                    ZoneId.systemDefault()).toInstant());
            return registrationDeadline.after(new Date());
        }
        return false;
    }

    public boolean isConferenceExpired(Conference conference) {
        Date endDate = conference.getEndDate();
        return endDate != null && endDate.before(new Date());
    }

    @Override
    public List<Conference> findAllByCreatorEmail(String email) {
        return conferenceRepository.findAllByCreatorEmail(email);
    }
}
