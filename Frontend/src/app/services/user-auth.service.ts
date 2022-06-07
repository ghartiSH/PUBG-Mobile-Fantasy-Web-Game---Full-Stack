import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRole(role:[]){
    localStorage.setItem("role", JSON.stringify(role));
  }

  public getRole(): []{
    return JSON.parse(localStorage.getItem("role")!);
  }

  public setToken(jwtToken: string){
    localStorage.setItem("jwtToken", jwtToken);

  }

  public getToken(): string{
    return localStorage.getItem("jwtToken")!;
  }

  public setUser(user: string){
    localStorage.setItem("username", user);
  }

  public getUser():string{
    return localStorage.getItem("username")!;
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRole() && this.getToken();
  }
}
