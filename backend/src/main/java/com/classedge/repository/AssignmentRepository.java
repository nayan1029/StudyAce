package com.classedge.repository;

import com.classedge.entity.Assignment;
import com.classedge.entity.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findAllByClassroomOrderByCreatedAtDesc(Classroom classroom);
}
