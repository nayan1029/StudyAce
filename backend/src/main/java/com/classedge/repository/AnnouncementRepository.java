package com.classedge.repository;

import com.classedge.entity.Announcement;
import com.classedge.entity.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findAllByClassroomOrderByCreatedAtDesc(Classroom classroom);
}
