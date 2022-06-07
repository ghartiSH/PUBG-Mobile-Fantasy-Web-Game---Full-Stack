import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fixture } from '../model/Fixture';

@Injectable({
  providedIn: 'root'
})
export class FixturesService {

  teamUrl = "http://localhost:8081/fixtures"

  constructor(private http: HttpClient) { }

  addFixture(file: any, fixture: Fixture, id: number): Observable<object>{
    const fd = new FormData();
    fd.append('matchNo', fixture.matchNo.toString());
    fd.append('time', fixture.time);
    fd.append('map', file);
    return this.http.post(`${this.teamUrl}/${id}`,fd);
  }

  getAllFixtures(): Observable<Fixture[]>{
    return this.http.get<Fixture[]>(this.teamUrl);
  }

  updateFixture(id: number, file:any, fixture: Fixture): Observable<Object>{
    const nfd = new FormData();
    nfd.append('matchNo', fixture.matchNo.toString());
    nfd.append('time', fixture.time);
    nfd.append('map', file);
    return this.http.put(`${this.teamUrl}/${id}`,nfd);
  }

  getFixtureByID(id: number): Observable<Fixture>{
    return this.http.get<Fixture>(`${this.teamUrl}/${id}`);
  }
}
