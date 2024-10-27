package com.codespring.sconesbackend.service.impl;

import com.codespring.sconesbackend.entity.Jury;
import com.codespring.sconesbackend.repositroy.JuryRepository;
import com.codespring.sconesbackend.service.JuryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class JuryServiceImpl implements JuryService {

    private final JuryRepository juryRepository;


    @Override
    public List<Jury> findAll() {
        return juryRepository.findAll();
    }

    @Override
    public Jury create(Jury jury) {
        return juryRepository.saveAndFlush(jury);
    }

    @Override
    public Jury getById(Long id) {
        return juryRepository.findById(id).orElse(null);
    }

    @Override
    public Jury update(Jury jury) {
        return juryRepository.saveAndFlush(jury);
    }

    @Override
    public void deleteById(Long id) {
        juryRepository.deleteById(id);
    }

    @Override
    public Jury findByEmail(String email) {
        return juryRepository.findByEmail(email).orElse(null);
    }
}
