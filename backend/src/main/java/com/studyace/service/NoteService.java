package com.studyace.service;

import com.studyace.dto.NoteRequest;
import com.studyace.dto.NoteResponse;
import com.studyace.entity.Note;
import com.studyace.entity.User;
import com.studyace.exception.ApiException;
import com.studyace.repository.NoteRepository;
import com.studyace.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    public NoteResponse create(String email, NoteRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        Note note = Note.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();

        return toResponse(noteRepository.save(note));
    }

    public List<NoteResponse> getAll(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found"));

        return noteRepository.findAllByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private NoteResponse toResponse(Note note) {
        return NoteResponse.builder()
                .id(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .createdAt(note.getCreatedAt())
                .build();
    }
}
