import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserTeam } from '../model/UserTeam';

@Injectable({
  providedIn: 'root'
})
export class UserTeamService {

  private baseURL = "http://localhost:8081/userteam";
  constructor(private http: HttpClient) { }

  addUserTeam(userTeam: UserTeam, user: String): Observable<Object>{
    return this.http.post(`${this.baseURL}/${user}`,userTeam);
  }

  getAllUserTeams(): Observable<UserTeam[]>{
    return this.http.get<UserTeam[]>(this.baseURL);
  }
}
