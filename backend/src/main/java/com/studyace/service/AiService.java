package com.studyace.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AiService {

    public Map<String, Object> summarize(String text) {
        String summary = text.length() <= 220 ? text : text.substring(0, 220) + "...";
        return Map.of("summary", summary, "provider", "stub-gemini-openai");
    }

    public Map<String, Object> generateQuiz(String topic, String difficulty) {
        return Map.of(
                "topic", topic,
                "difficulty", difficulty,
                "questions", List.of(
                        "Explain the core idea of " + topic,
                        "What is one real-world use case of " + topic + "?",
                        "Compare two approaches in " + topic
                )
        );
    }

    public Map<String, Object> analyzeResume(String content) {
        int score = Math.min(95, Math.max(60, content.length() / 20));
        return Map.of(
                "score", score,
                "suggestions", List.of(
                        "Use quantified impact statements",
                        "Add more role-specific keywords",
                        "Keep summary concise and targeted"
                )
        );
    }
}
