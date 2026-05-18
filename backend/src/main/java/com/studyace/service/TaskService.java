package com.studyace.service;

import com.studyace.dto.TaskRequest;
import com.studyace.dto.TaskResponse;
import com.studyace.entity.Task;
import com.studyace.entity.User;
import com.studyace.exception.ApiException;
import com.studyace.repository.TaskRepository;
import com.studyace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskResponse create(String email, TaskRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        Task task = Task.builder()
                .title(request.getTitle())
                .deadline(request.getDeadline())
                .completed(false)
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();

        return toResponse(taskRepository.save(task));
    }

    public List<TaskResponse> getAll(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        return taskRepository.findAllByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private TaskResponse toResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .deadline(task.getDeadline())
                .completed(task.isCompleted())
                .build();
    }
}
