package com.studyace.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studyace.dto.AssistantRequest;
import com.studyace.dto.SummaryRequest;
import com.studyace.service.AiService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

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
    public Map<String, Object> assistant(@RequestBody Map<String, Object> requestBody) {
        AssistantRequest request = new AssistantRequest();
        request.setText(requestBody.get("text") == null ? null : String.valueOf(requestBody.get("text")));
        request.setHistory(extractHistory(requestBody.get("history")));
        return aiService.answerQuestion(request);
    }

    @SuppressWarnings("unchecked")
    private List<AssistantRequest.ChatMessage> extractHistory(Object historyValue) {
        List<AssistantRequest.ChatMessage> history = new ArrayList<>();

        if (!(historyValue instanceof List<?> historyList)) {
            return history;
        }

        for (Object item : historyList) {
            if (!(item instanceof Map<?, ?> itemMap)) {
                continue;
            }

            AssistantRequest.ChatMessage message = new AssistantRequest.ChatMessage();
            Object role = itemMap.get("role");
            Object content = itemMap.get("content");
            message.setRole(role == null ? null : String.valueOf(role));
            message.setContent(content == null ? null : String.valueOf(content));
            history.add(message);
        }

        return history;
    }
}
