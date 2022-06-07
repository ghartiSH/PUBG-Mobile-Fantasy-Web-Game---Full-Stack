import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Players } from '../model/Player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerURL = "http://localhost:8081/player"
  constructor(private http: HttpClient) { }

  addPlayer(file: any, player:Players, teamId: number): Observable<Object>{
    const fd = new FormData();
    fd.append('playerId', player.playerId.toString());
    fd.append('playerName', player.playerName);
    fd.append('image', file);
    return this.http.post(`${this.playerURL}/${teamId}`,fd);
  }

  getPlayerById(id: number): Observable<Players>{
    return this.http.get<Players>(`${this.playerURL}/${id}`);
  }
}
