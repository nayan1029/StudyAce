package com.classedge.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RosterMemberResponse {
    private Long userId;
    private String name;
    private String email;
    private String role; // "TEACHER" or "STUDENT"
}
