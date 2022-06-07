import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerStats } from '../model/PlayerStats';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatsService {

  teamUrl = "http://localhost:8081/playerstats"

  constructor(private http: HttpClient) { }

  addPlayerStat(playerStats: PlayerStats, id: number): Observable<object>{

    return this.http.post(`${this.teamUrl}/${id}`,playerStats);
  }

  getAllPlayerStats(): Observable<PlayerStats[]>{
    return this.http.get<PlayerStats[]>(this.teamUrl);
  }

  updatePlayerStats(id: number, pStats: PlayerStats): Observable<Object>{
    return this.http.put(`${this.teamUrl}/${id}`,pStats);
  }

  getPlayerStatsByID(id: number): Observable<PlayerStats>{
    return this.http.get<PlayerStats>(`${this.teamUrl}/${id}`);
  }
}
