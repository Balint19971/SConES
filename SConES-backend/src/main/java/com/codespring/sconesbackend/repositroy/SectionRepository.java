package com.codespring.sconesbackend.repositroy;

import com.codespring.sconesbackend.entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SectionRepository extends JpaRepository<Section, Long> {

    @Query("SELECT DISTINCT s.university FROM Section s WHERE s.university LIKE %:substring%")
    List<String> findAllUniversitiesContaining(@Param("substring") String substring);

    List<Section> findAllByUniversity(String university);

    @Query("SELECT s FROM Section s JOIN s.conferences c WHERE c.conferenceId = :conferenceId")
    List<Section> findAllByConferenceId(@Param("conferenceId") Long conferenceId);
}
