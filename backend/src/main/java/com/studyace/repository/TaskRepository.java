package com.studyace.repository;

import com.studyace.entity.Task;
import com.studyace.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByUserOrderByCreatedAtDesc(User user);
}
