package com.classedge.repository;

import com.classedge.entity.TimetableEntry;
import com.classedge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimetableEntryRepository extends JpaRepository<TimetableEntry, Long> {
    List<TimetableEntry> findAllByUserOrderBySortOrderAsc(User user);

    void deleteAllByUser(User user);
}
