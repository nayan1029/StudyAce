package com.studyace.controller;

import com.studyace.dto.NoteRequest;
import com.studyace.dto.NoteResponse;
import com.studyace.service.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @PostMapping
    public NoteResponse create(Authentication auth, @Valid @RequestBody NoteRequest request) {
        return noteService.create(auth.getName(), request);
    }

    @GetMapping
    public List<NoteResponse> getAll(Authentication auth) {
        return noteService.getAll(auth.getName());
    }
}
