package com.codespring.sconesbackend.service;

import com.codespring.sconesbackend.entity.Paper;

import java.util.List;

public interface PaperService {

    List<Paper> findAll();

    Paper create(Paper paper);

    Paper getById(Long id);

    Paper findByIdWithUsers(Long id);

    List<Paper> findByUserId(Long userId);

    Paper update(Paper paper);

    void deleteById(Long id);

    boolean existsPaperByTitle(String title);

    boolean existsById(Long id);
}
