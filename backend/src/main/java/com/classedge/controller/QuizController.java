package com.classedge.controller;

import com.classedge.dto.QuizGenerateRequest;
import com.classedge.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final AiService aiService;

    @PostMapping("/generate")
    public Map<String, Object> generate(@RequestBody QuizGenerateRequest request) {
        return aiService.generateQuiz(request.getTopic(), request.getDifficulty());
    }
}
