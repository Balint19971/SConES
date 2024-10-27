package com.codespring.sconesbackend.dto.incoming;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ConferenceInDTO {

    private String name;

    private Date startDate;

    private Date endDate;

    private String location;

    private List<Long> sectionsIds;
}
