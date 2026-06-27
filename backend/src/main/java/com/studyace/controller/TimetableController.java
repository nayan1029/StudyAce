package com.studyace.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/timetable")
public class TimetableController {

    @GetMapping
    public List<Map<String, String>> getTimetable() {
        return List.of(
                Map.of("day", "Monday", "time", "09:00 - 11:00", "subject", "Algorithms", "focus", "Concept practice"),
                Map.of("day", "Tuesday", "time", "10:00 - 12:00", "subject", "Database Systems", "focus", "Weak area revision"),
                Map.of("day", "Wednesday", "time", "14:00 - 16:00", "subject", "Operating Systems", "focus", "Exam preparation")
        );
    }

    @PostMapping("/generate")
    public Map<String, Object> generate(@RequestBody TimetableRequest request) {
        List<String> subjects = splitCsv(request.subjects());
        List<String> weakSubjects = splitCsv(request.weakSubjects());
        if (subjects.isEmpty()) {
            subjects = List.of("Algorithms", "Database Systems", "Operating Systems", "Placement Prep");
        }

        int dailyHours = Math.max(1, Math.min(8, request.dailyHours() == null ? 2 : request.dailyHours()));
        List<String> days = List.of("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        List<Map<String, String>> schedule = new ArrayList<>();

        for (int index = 0; index < Math.min(days.size(), subjects.size() + weakSubjects.size()); index++) {
            String subject = index < weakSubjects.size()
                    ? weakSubjects.get(index)
                    : subjects.get(index % subjects.size());
            int startHour = 8 + (index % 5) * 2;
            schedule.add(Map.of(
                    "day", days.get(index),
                    "subject", subject,
                    "time", String.format("%02d:00 - %02d:00", startHour, startHour + dailyHours),
                    "focus", weakSubjects.contains(subject) ? "High priority revision" : "Practice and recall"
            ));
        }

        return Map.of("schedule", schedule, "dailyHours", dailyHours);
    }

    private List<String> splitCsv(String value) {
        if (value == null || value.isBlank()) {
            return List.of();
        }
        return Arrays.stream(value.split(","))
                .map(String::trim)
                .filter(item -> !item.isBlank())
                .distinct()
                .collect(Collectors.toList());
    }

    public record TimetableRequest(String subjects, String weakSubjects, Integer dailyHours) {
    }
}
