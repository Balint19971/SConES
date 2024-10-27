package com.codespring.sconesbackend.repositroy;

import com.codespring.sconesbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByPhoneNumber(String phoneNumber);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u JOIN u.sectionConferences sc WHERE sc.sectionConferenceId = :sectionConferenceId")
    List<User> findAllBySectionConferenceId(@Param("sectionConferenceId") Long sectionConferenceId);

    @Query("SELECT u "
            + "FROM User u "
            + "JOIN u.papers p "
            + "WHERE p.paperId = :paperId AND u.role = 'AUTHOR'")
    List<User> findAuthorsByPaperId(@Param("paperId") Long paperId);
}
