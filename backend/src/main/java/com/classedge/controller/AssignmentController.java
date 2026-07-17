package com.classedge.controller;

import com.classedge.dto.AssignmentResponse;
import com.classedge.dto.CreateAssignmentRequest;
import com.classedge.service.AssignmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classrooms/{classroomId}/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    @GetMapping
    public List<AssignmentResponse> list(Authentication auth, @PathVariable Long classroomId) {
        return assignmentService.list(auth.getName(), classroomId);
    }

    @PostMapping
    public AssignmentResponse create(Authentication auth, @PathVariable Long classroomId,
                                      @Valid @RequestBody CreateAssignmentRequest request) {
        return assignmentService.create(auth.getName(), classroomId, request);
    }
}
