package com.codespring.sconesbackend.assembler;

import com.codespring.sconesbackend.dto.incoming.PaperInDTO;
import com.codespring.sconesbackend.dto.outcoming.PaperOutDTO;
import com.codespring.sconesbackend.entity.Paper;
import com.codespring.sconesbackend.entity.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PaperAssembler {

    public Paper toPaper(PaperInDTO paperInDTO, List<User> users) {
        Paper paper = new Paper();
        if (paperInDTO.getPaperId() != null) {
            paper.setPaperId(paperInDTO.getPaperId());
        }
        paper.setTitle(paperInDTO.getTitle());
        paper.setDescription(paperInDTO.getDescription());
        paper.setParticipants(users);
        paper.setMinioPath(paperInDTO.getObjectPath());
        paper.setApproved(false);

        return paper;
    }

    public PaperOutDTO toPaperOutDTO(Paper paper, String generatedMinioUrl) {
        PaperOutDTO paperOutDTO = new PaperOutDTO();
        paperOutDTO.setPaperId(paper.getPaperId());
        paperOutDTO.setTitle(paper.getTitle());
        paperOutDTO.setDescription(paper.getDescription());

        List<String> authorsNameList = new ArrayList<>();
        List<String> supervisorsNameList = new ArrayList<>();
        for (int i = 0; i < paper.getParticipants().size(); i++) {
            if (paper.getParticipants().get(i).getRole().name().equals("AUTHOR")) {
                authorsNameList.add(paper.getParticipants().get(i).getFullName());
            } else if (paper.getParticipants().get(i).getRole().name().equals("SUPERVISOR")) {
                supervisorsNameList.add(paper.getParticipants().get(i).getFullName());
            }
        }

        paperOutDTO.setAuthorsName(authorsNameList);
        paperOutDTO.setSupervisorsName(supervisorsNameList);
        paperOutDTO.setPdfUrl(generatedMinioUrl);
        paperOutDTO.setApproved(paper.isApproved());

        return paperOutDTO;
    }
}
