package com.codespring.sconesbackend.repositroy;

import com.codespring.sconesbackend.entity.Conference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ConferenceRepository extends JpaRepository<Conference, Long> {

    Conference findConferenceByLocationAndStartDateAndEndDate(String location, Date startDate, Date endDate);

    @Query("SELECT c FROM Conference c LEFT JOIN FETCH c.sections WHERE c.conferenceId = :conferenceId")
    Conference findByIdWithSections(@Param("conferenceId") Long conferenceId);

    List<Conference> findAllByCreatorEmail(String email);

}
