package com.example.backend.Repository;

import com.example.backend.Model.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTeamRepository extends JpaRepository<UserTeam, Long> {
}
