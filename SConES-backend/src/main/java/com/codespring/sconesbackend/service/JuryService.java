package com.codespring.sconesbackend.service;

import com.codespring.sconesbackend.entity.Jury;

import java.util.List;
import java.util.Optional;

public interface JuryService {

    List<Jury> findAll();

    Jury create(Jury jury);

    Jury getById(Long id);

    Jury update(Jury jury);

    void deleteById(Long id);

    Jury findByEmail(String email);
}
