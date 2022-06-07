package com.example.backend.Repository;

import com.example.backend.Model.Teams;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Teams, Long> {
}
