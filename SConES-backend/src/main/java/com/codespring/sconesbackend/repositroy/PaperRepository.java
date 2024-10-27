package com.codespring.sconesbackend.repositroy;

import com.codespring.sconesbackend.entity.Paper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaperRepository extends JpaRepository<Paper, Long> {

    boolean existsPaperByTitle(String title);

    @Query("SELECT p FROM Paper p LEFT JOIN FETCH p.participants WHERE p.paperId = :paperId")
    Optional<Paper> findByIdWithUsers(@Param("paperId") Long paperId);

    @Query("SELECT p FROM Paper p JOIN p.participants u WHERE u.userId = :userId")
    List<Paper> findByUserId(@Param("userId") Long userId);

}
