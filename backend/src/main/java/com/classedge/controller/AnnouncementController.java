package com.classedge.controller;

import com.classedge.dto.AnnouncementResponse;
import com.classedge.dto.CreateAnnouncementRequest;
import com.classedge.service.AnnouncementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classrooms/{classroomId}/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @GetMapping
    public List<AnnouncementResponse> list(Authentication auth, @PathVariable Long classroomId) {
        return announcementService.list(auth.getName(), classroomId);
    }

    @PostMapping
    public AnnouncementResponse post(Authentication auth, @PathVariable Long classroomId,
                                      @Valid @RequestBody CreateAnnouncementRequest request) {
        return announcementService.post(auth.getName(), classroomId, request.getContent());
    }
}
