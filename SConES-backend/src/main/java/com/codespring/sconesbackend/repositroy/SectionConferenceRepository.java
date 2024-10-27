package com.codespring.sconesbackend.repositroy;

import com.codespring.sconesbackend.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SectionConferenceRepository extends JpaRepository<SectionConference, Long> {

    @Query("SELECT sc.sectionConferenceId "
            + "FROM SectionConference sc "
            + "WHERE sc.conference.conferenceId = :conferenceId AND sc.section.sectionId = :sectionId")
    Long findSectionConferenceIdByConferenceIdAndSectionId(
            @Param("conferenceId") Long conferenceId, @Param("sectionId") Long sectionId);

    @Query("SELECT DISTINCT u "
            + "FROM SectionConference sc "
            + "JOIN sc.candidates u "
            + "WHERE sc.conference.conferenceId = :conferenceId")
    List<User> findUsersByConferenceId(@Param("conferenceId") Long conferenceId);

    @Query("SELECT sc "
            + "FROM SectionConference sc "
            + "LEFT JOIN FETCH sc.juries "
            + "WHERE sc.sectionConferenceId = :sectionConferenceId")
    SectionConference getSectionConferenceWithJuriesBySectionConferenceId(
            @Param("sectionConferenceId") Long sectionConferenceId);

    @Query("SELECT sc.section FROM SectionConference sc WHERE sc.sectionConferenceId = :sectionConferenceId")
    Optional<Section> findSectionBySectionConferenceId(@Param("sectionConferenceId") Long sectionConferenceId);

    @Query("SELECT sc.conference FROM SectionConference sc WHERE sc.sectionConferenceId = :sectionConferenceId")
    Optional<Conference> findConferenceBySectionConferenceId(@Param("sectionConferenceId") Long sectionConferenceId);

    @Query("SELECT sc.juries FROM SectionConference sc WHERE sc.sectionConferenceId = :sectionConferenceId")
    List<Jury> findJuriesBySectionConferenceId(@Param("sectionConferenceId") Long sectionConferenceId);

    @Query("SELECT sc.candidates FROM SectionConference sc WHERE sc.sectionConferenceId = :sectionConferenceId")
    List<User> findCandidatesBySectionConferenceId(@Param("sectionConferenceId") Long sectionConferenceId);

}
