package com.example.backend.Repository;

import com.example.backend.Model.Tournaments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TournamentRepository extends JpaRepository<Tournaments, Long> {
    Tournaments findByTournamentName(String title);
}
