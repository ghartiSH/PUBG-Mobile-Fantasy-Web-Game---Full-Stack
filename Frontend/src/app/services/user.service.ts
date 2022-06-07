import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL = "http://localhost:8081/user"
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.userURL);
  }

  getUserbyId(uid: string): Observable<User>{
    return this.http.get<User>(`${this.userURL}/${uid}`);
  }
}
