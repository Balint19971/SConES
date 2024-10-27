package com.codespring.sconesbackend.repositroy;

import com.codespring.sconesbackend.entity.Jury;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JuryRepository extends JpaRepository<Jury, Long> {

    Optional<Jury> findByEmail(String email);
}
