package com.example.backend.Repository;

import com.example.backend.Model.Fixtures;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FixtureRepository extends JpaRepository<Fixtures, Long> {
}
