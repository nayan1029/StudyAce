package com.classedge.service;

import com.classedge.dto.AnnouncementResponse;
import com.classedge.entity.Announcement;
import com.classedge.entity.Classroom;
import com.classedge.entity.User;
import com.classedge.repository.AnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final ClassroomService classroomService;

    public List<AnnouncementResponse> list(String email, Long classroomId) {
        User user = classroomService.findUser(email);
        Classroom classroom = classroomService.findClassroom(classroomId);
        classroomService.verifyMembership(classroom, user);

        return announcementRepository.findAllByClassroomOrderByCreatedAtDesc(classroom)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public AnnouncementResponse post(String email, Long classroomId, String content) {
        User user = classroomService.findUser(email);
        Classroom classroom = classroomService.findClassroom(classroomId);
        // Anyone in the class can post to the stream, like Google Classroom's
        // student-comment behavior — only assignment creation is teacher-only.
        classroomService.verifyMembership(classroom, user);

        Announcement announcement = Announcement.builder()
                .classroom(classroom)
                .author(user)
                .content(content.trim())
                .createdAt(LocalDateTime.now())
                .build();

        return toResponse(announcementRepository.save(announcement));
    }

    private AnnouncementResponse toResponse(Announcement announcement) {
        return AnnouncementResponse.builder()
                .id(announcement.getId())
                .authorName(announcement.getAuthor().getName())
                .content(announcement.getContent())
                .createdAt(announcement.getCreatedAt())
                .build();
    }
}
