import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../model/LoginDetails';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = "http://localhost:8081/authenticate";
  constructor(private http: HttpClient, private userAuthService: UserAuthService) { }

  requestHeader= new HttpHeaders(
    {
      "No-auth": "True"
    }
  );
  login(loginDetails: LoginDetails){
    return this.http.post(this.baseUrl,loginDetails, { headers: this.requestHeader});
  }

  public roleMatch(allowedRole: any[]): boolean{
    let isMatch = false;
    const userRole: any = this.userAuthService.getRole();
    if(userRole !=null && userRole){
      for(let i=0; i<userRole.length; i++){
        for(let j=0; j<allowedRole.length; j++){
          if(userRole[i].roleName == allowedRole[j]){
            isMatch = true;
          }else{
            isMatch = false;
          }
        }
      }
    }
    return isMatch;
  }
}
