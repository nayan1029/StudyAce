package com.classedge.repository;

import com.classedge.entity.Task;
import com.classedge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByUserOrderByCreatedAtDesc(User user);
}
