package com.codespring.sconesbackend.assembler;

import com.codespring.sconesbackend.dto.incoming.JuryInDTO;
import com.codespring.sconesbackend.dto.outcoming.JuryOutDTO;
import com.codespring.sconesbackend.entity.Jury;
import org.springframework.stereotype.Component;

@Component
public class JuryAssembler {

    public Jury toJury(JuryInDTO juryInDTO) {
        Jury.JuryBuilder builder = Jury.builder()
                .name(juryInDTO.getName())
                .email(juryInDTO.getEmail());

        if (juryInDTO.getJuryId() != null) {
            builder.juryId(juryInDTO.getJuryId());
        }

        return builder.build();
    }

    public JuryOutDTO toJuryOutDTO(Jury jury) {
        return JuryOutDTO.builder()
                .juryId(jury.getJuryId())
                .name(jury.getName())
                .build();
    }
}
