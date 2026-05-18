package com.studyace.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/timetable")
public class TimetableController {

    @GetMapping
    public List<Map<String, String>> getTimetable() {
        return List.of(
                Map.of("day", "Monday", "slot", "09:00", "subject", "Algorithms"),
                Map.of("day", "Tuesday", "slot", "11:00", "subject", "Database Systems"),
                Map.of("day", "Wednesday", "slot", "14:00", "subject", "Operating Systems")
        );
    }
}
