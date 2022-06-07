package com.example.backend.Repository;

import com.example.backend.Model.Players;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Players, Long> {
}
