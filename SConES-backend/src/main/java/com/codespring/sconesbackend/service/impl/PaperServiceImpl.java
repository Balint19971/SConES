package com.codespring.sconesbackend.service.impl;

import com.codespring.sconesbackend.entity.Paper;
import com.codespring.sconesbackend.repositroy.PaperRepository;
import com.codespring.sconesbackend.service.PaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PaperServiceImpl implements PaperService {

    private final PaperRepository paperRepository;

    @Override
    public Paper create(Paper paper) {
        return paperRepository.saveAndFlush(paper);
    }

    @Override
    public Paper update(Paper paper) {
        return paperRepository.saveAndFlush(paper);
    }

    @Override
    public void deleteById(Long id) {
        paperRepository.deleteById(id);
    }

    @Override
    public boolean existsPaperByTitle(String title) {
        return paperRepository.existsPaperByTitle(title);
    }

    @Override
    public boolean existsById(Long id) {
        return paperRepository.existsById(id);
    }

    @Override
    public List<Paper> findAll() {
        return paperRepository.findAll();
    }

    @Override
    public Paper getById(Long id) {
        return paperRepository.findById(id).orElse(null);
    }

    @Override
    public Paper findByIdWithUsers(Long id) {
        return paperRepository.findByIdWithUsers(id).orElse(null);
    }

    @Override
    public List<Paper> findByUserId(Long userId) {
        return paperRepository.findByUserId(userId);
    }
}
