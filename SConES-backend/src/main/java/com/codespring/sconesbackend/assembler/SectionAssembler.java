package com.codespring.sconesbackend.assembler;

import com.codespring.sconesbackend.dto.incoming.SectionInDTO;
import com.codespring.sconesbackend.dto.outcoming.SectionOutDTO;
import com.codespring.sconesbackend.entity.Section;
import org.springframework.stereotype.Component;

@Component
public class SectionAssembler {

    public Section toSection(SectionInDTO sectionInDTO) {
        Section.SectionBuilder builder = Section.builder()
                .name(sectionInDTO.getName())
                .university(sectionInDTO.getUniversity());

        if (sectionInDTO.getSectionId() != null) {
            builder.sectionId(sectionInDTO.getSectionId());
        }

        return builder.build();
    }

    public SectionOutDTO toSectionOutDTO(Section section) {
        return SectionOutDTO.builder()
                .sectionId(section.getSectionId())
                .name(section.getName())
                .university(section.getUniversity())
                .build();
    }
}
