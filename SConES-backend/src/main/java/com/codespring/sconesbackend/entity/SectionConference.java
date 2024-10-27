package com.codespring.sconesbackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "section_conference")
public class SectionConference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "section_conference_id")
    private Long sectionConferenceId;

    @ManyToOne
    @JoinColumn(name = "conference_id", nullable = false)
    private Conference conference;

    @ManyToOne
    @JoinColumn(name = "section_id", nullable = false)
    private Section section;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinTable(
            name = "user_section_conference",
            joinColumns = @JoinColumn(name = "section_conference_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> candidates;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinTable(
            name = "jury_section_conference",
            joinColumns = @JoinColumn(name = "section_conference_id"),
            inverseJoinColumns = @JoinColumn(name = "jury_id"))
    private List<Jury> juries;

    public void addCandidate(User candidate) {
        if (candidates == null) {
            candidates = new ArrayList<>();
        }

        candidates.add(candidate);
    }

    public void addJury(Jury jury) {
        if (juries == null) {
            juries = new ArrayList<>();
        }

        juries.add(jury);
    }
}
