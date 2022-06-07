import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerURL = "http://localhost:8081/user"
  constructor(private http: HttpClient) { }

  requestHeader= new HttpHeaders(
    {
      "No-auth": "True"
    }
  );

  addUser(user:User): Observable<Object>{
    return this.http.post(this.registerURL, user,  { headers: this.requestHeader});
  }
}
