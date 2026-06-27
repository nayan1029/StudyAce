package com.studyace.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AiService {

    public Map<String, Object> summarize(String text) {
        String cleanText = normalize(text);
        List<String> sentences = splitSentences(cleanText);
        String summary = sentences.stream()
                .limit(3)
                .collect(Collectors.joining(" "));

        if (summary.isBlank()) {
            summary = "Add notes to generate a focused summary.";
        }

        return Map.of(
                "summary", summary,
                "keyPoints", sentences.stream().limit(5).toList(),
                "provider", "local-ai-fallback"
        );
    }

    public Map<String, Object> generateQuiz(String topic, String difficulty) {
        String safeTopic = normalize(topic);
        if (safeTopic.isBlank()) {
            safeTopic = "the selected topic";
        }
        String level = normalize(difficulty);
        if (level.isBlank()) {
            level = "medium";
        }

        return Map.of(
                "topic", safeTopic,
                "difficulty", level,
                "questions", List.of(
                        Map.of(
                                "type", "MCQ",
                                "question", "Which statement best describes " + safeTopic + "?",
                                "options", List.of("A core concept to understand", "Only a memorization trick", "A database password", "A deployment server"),
                                "answer", "A core concept to understand"
                        ),
                        Map.of(
                                "type", "Short",
                                "question", "Explain one real-world use case of " + safeTopic + ".",
                                "answer", "Connect the concept to a practical student project or exam scenario."
                        ),
                        Map.of(
                                "type", "MCQ",
                                "question", "For " + level + " practice, what should you do after learning " + safeTopic + "?",
                                "options", List.of("Solve examples", "Skip revision", "Ignore mistakes", "Delete notes"),
                                "answer", "Solve examples"
                        )
                )
        );
    }

    public Map<String, Object> analyzeResume(String content) {
        String resume = normalize(content);
        int score = Math.min(95, Math.max(60, resume.length() / 20));
        List<String> suggestions = new ArrayList<>();
        suggestions.add("Use quantified impact statements for projects and internships.");
        suggestions.add("Add role-specific keywords from the target job description.");
        suggestions.add("Keep the summary concise and focused on strengths.");
        if (!resume.toLowerCase().contains("github")) {
            suggestions.add("Include a GitHub or portfolio link for technical proof.");
        }
        if (!resume.matches("(?is).*\\b(sql|mysql|postgres|mongodb)\\b.*")) {
            suggestions.add("Mention relevant database skills when they match your experience.");
        }

        return Map.of(
                "score", score,
                "suggestions", suggestions
        );
    }

    public Map<String, Object> answerQuestion(String question) {
        String prompt = normalize(question);
        if (prompt.isBlank()) {
            return Map.of(
                    "answer", "Ask a question and I will break it into a clear explanation, example, and revision step.",
                    "nextSteps", List.of("Add the topic", "Mention your exam or goal", "Ask for examples")
            );
        }

        return Map.of(
                "answer", "Start with the core idea: " + prompt + ". Break it into definitions, one simple example, and two practice questions. If it is difficult, revise the prerequisite concept first, then test yourself without looking at notes.",
                "nextSteps", List.of(
                        "Write a three-line summary in your own words.",
                        "Solve one easy and one medium question.",
                        "Add the mistakes to your revision notes."
                )
        );
    }

    private String normalize(String value) {
        return value == null ? "" : value.trim().replaceAll("\\s+", " ");
    }

    private List<String> splitSentences(String text) {
        if (text.isBlank()) {
            return List.of();
        }
        return Arrays.stream(text.split("(?<=[.!?])\\s+"))
                .map(String::trim)
                .filter(sentence -> !sentence.isBlank())
                .toList();
    }
}
