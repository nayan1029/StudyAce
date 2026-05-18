package com.studyace.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizGenerateRequest {
    private String topic;
    private String difficulty;
}
