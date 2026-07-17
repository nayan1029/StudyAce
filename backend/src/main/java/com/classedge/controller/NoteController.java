package com.classedge.controller;

import com.classedge.dto.NoteRequest;
import com.classedge.dto.NoteResponse;
import com.classedge.service.NoteService;
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
