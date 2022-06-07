import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { RegisterService } from 'src/app/services/register.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  confirmPass!: string;

  constructor(private registerService: RegisterService, private router:Router, private snack: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.user.password == this.confirmPass){
      this.registerService.addUser(this.user).subscribe(data => {
        console.log(data);
        this.snack.open("User created Successfully. Please login to continue.", "Close", {
          duration: 5000});
        this.router.navigate(['/login']);
      },
      (error) => {
        this.dialog.open(ErrorDialogComponent,{ data: {
          message: "Username Already Taken."
        }});
      }
      );
      
    }
    else{
      this.dialog.open(ErrorDialogComponent,{ data: {
        message: "Passwords Do not match.."
      }})
    }
  }


}
