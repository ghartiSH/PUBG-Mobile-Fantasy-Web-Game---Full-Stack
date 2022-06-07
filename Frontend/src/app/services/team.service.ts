import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamUrl = "http://localhost:8081/team"

  constructor(private http: HttpClient) { }

  addTeam(file: any, team: Team, id: number): Observable<object>{
    const fd = new FormData();
    fd.append('image', file);
    fd.append('teamId', team.teamId.toString());
    fd.append('teamName', team.teamName);
    fd.append('region', team.region);
    fd.append('country', team.country);
    return this.http.post(`${this.teamUrl}/${id}`,fd);
  }

  getAllTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(this.teamUrl);
  }

  updateTeam(id:number, team: Team): Observable<Object>{
    return this.http.put(`${this.teamUrl}/${id}`,team);
  }

  getTeambyID(id: number): Observable<Team>{
    return this.http.get<Team>(`${this.teamUrl}/${id}`);
  }
  
}
