package com.studyace.service;

import com.studyace.entity.User;
import com.studyace.exception.ApiException;
import com.studyace.repository.NoteRepository;
import com.studyace.repository.TaskRepository;
import com.studyace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final UserRepository userRepository;
    private final NoteRepository noteRepository;
    private final TaskRepository taskRepository;

    public Map<String, Object> dashboard(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        long noteCount = noteRepository.findAllByUserOrderByCreatedAtDesc(user).size();
        long completedTasks = taskRepository.findAllByUserOrderByCreatedAtDesc(user).stream()
                .filter(com.studyace.entity.Task::isCompleted)
                .count();

        return Map.of(
                "stats", Map.of(
                        "notesCount", noteCount,
                        "completedTasks", completedTasks,
                        "quizAttempts", 0,
                        "focusHours", 0
                )
        );
    }
}
