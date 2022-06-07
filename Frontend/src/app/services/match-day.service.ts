import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchDay } from '../model/MatchDay';

@Injectable({
  providedIn: 'root'
})
export class MatchDayService {

  matchUrl = "http://localhost:8081/matchdays"

  constructor(private http: HttpClient) { }


  addMatchDay(matchDay: MatchDay, id: number): Observable<Object>{
    return this.http.post(`${this.matchUrl}/${id}`, matchDay);
  }

  getAllMatchDays(): Observable<MatchDay[]>{
    return this.http.get<MatchDay[]>(this.matchUrl);
  }

  getMatchDayById(id: number): Observable<MatchDay>{
    return this.http.get<MatchDay>(`${this.matchUrl}/${id}`);
  }
}
