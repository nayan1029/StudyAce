package com.classedge.controller;

import com.classedge.dto.GradeSubmissionRequest;
import com.classedge.dto.SubmissionResponse;
import com.classedge.dto.SubmitAssignmentRequest;
import com.classedge.service.SubmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;

    @PostMapping("/api/assignments/{assignmentId}/submit")
    public SubmissionResponse submit(Authentication auth, @PathVariable Long assignmentId,
                                      @Valid @RequestBody SubmitAssignmentRequest request) {
        return submissionService.submit(auth.getName(), assignmentId, request.getContent());
    }

    @GetMapping("/api/assignments/{assignmentId}/submissions")
    public List<SubmissionResponse> list(Authentication auth, @PathVariable Long assignmentId) {
        return submissionService.listForAssignment(auth.getName(), assignmentId);
    }

    @PostMapping("/api/submissions/{submissionId}/grade")
    public SubmissionResponse grade(Authentication auth, @PathVariable Long submissionId,
                                     @Valid @RequestBody GradeSubmissionRequest request) {
        return submissionService.grade(auth.getName(), submissionId, request);
    }
}
