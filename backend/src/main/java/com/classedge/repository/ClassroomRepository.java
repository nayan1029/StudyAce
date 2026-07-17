package com.classedge.repository;

import com.classedge.entity.Classroom;
import com.classedge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
    List<Classroom> findAllByTeacherOrderByCreatedAtDesc(User teacher);
    Optional<Classroom> findByClassCode(String classCode);
    boolean existsByClassCode(String classCode);
}
