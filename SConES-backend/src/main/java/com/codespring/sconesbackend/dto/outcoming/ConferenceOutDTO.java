package com.codespring.sconesbackend.dto.outcoming;

import com.codespring.sconesbackend.entity.Section;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ConferenceOutDTO {

    private Long conferenceId;

    private String name;

    private Date startDate;

    private Date endDate;

    private String location;
}
