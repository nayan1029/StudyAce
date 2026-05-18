package com.studyace.controller;

import com.studyace.dto.QuizGenerateRequest;
import com.studyace.dto.SummaryRequest;
import com.studyace.service.AiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/summarize")
    public Map<String, Object> summarize(@Valid @RequestBody SummaryRequest request) {
        return aiService.summarize(request.getText());
    }

    @PostMapping("/resume/analyze")
    public Map<String, Object> analyzeResume(@RequestBody SummaryRequest request) {
        return aiService.analyzeResume(request.getText());
    }

    @PostMapping("/assistant")
    public Map<String, Object> assistant(@RequestBody SummaryRequest request) {
        return Map.of("answer", "AI assistant response for: " + request.getText());
    }

    @PostMapping("/quiz")
    public Map<String, Object> generateQuiz(@RequestBody QuizGenerateRequest request) {
        return aiService.generateQuiz(request.getTopic(), request.getDifficulty());
    }
}
