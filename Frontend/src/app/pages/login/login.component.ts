import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/app/model/LoginDetails';
import { LoginService } from 'src/app/services/login.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: LoginDetails = new  LoginDetails();

  loginResponse: any;

  constructor(private loginService: LoginService, private userAuthService: UserAuthService,
    private router: Router, private dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loginService.login(this.login).subscribe( (data)=>{
      this.loginResponse = data;
      this.userAuthService.setUser(this.loginResponse.user.username);
      this.userAuthService.setRole(this.loginResponse.user.role);
      this.userAuthService.setToken(this.loginResponse.jwtToken);

      const role = this.loginResponse.user.role[0].roleName;
      if(role=='admin'){
        this.router.navigate(['/admin']);
      }
      else{
        this.router.navigate(['/home']);
      }
    },
    (error)=> {this.dialog.open(ErrorDialogComponent, { data: {
      message: "Invalid Username / Password."
    }})
    }
    );
  }

}
