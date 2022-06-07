import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tournament } from '../model/Tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentServiceService {

  private baseURL = "http://localhost:8081/tournaments";

  constructor(private http:HttpClient) {}

  addTournament(file:any, tournament: Tournament): Observable<object>{
    const fd = new FormData();
    fd.append('image', file);
    fd.append('tournamentName', tournament.tournamentName);
    fd.append('prizePool', tournament.prizePool.toString());
    fd.append('region', tournament.region);
    fd.append('startDate', tournament.startDate);
    fd.append('endDate', tournament.endDate);
    fd.append('tier', tournament.tier);
    return this.http.post(this.baseURL,fd);
   }

   getallTournaments(): Observable<Tournament[]>{
     return this.http.get<Tournament[]>(this.baseURL);
   }

   deleteTournament(id: number): Observable<Object>{
     return this.http.delete(`${this.baseURL}/${id}`);
   }
    getTournamentbyId(id: number): Observable<Tournament>{
      return this.http.get<Tournament>(`${this.baseURL}/${id}`);
    }
    updateTournament(id: number, tournament:Tournament): Observable<Object>{
      return this.http.put(`${this.baseURL}/ ${id}`, tournament);
    }
}
