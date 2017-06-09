import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../user";
import {AuthenticationService} from "../services/authentication.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  error: string;

  constructor(private appRouter: Router, private authentication: AuthenticationService) {
    this.user = new User();
    this. error = '';
  }

  onLogin(){
    this.error = '';
    this.authentication.login(this.user.username, this.user.password)
      .subscribe(result => {
        if(result === true){
          this.appRouter.navigate(['/contacts']);
        }
        else{
          this.user.username = '';
          this.user.password = '';
          this.error = 'Login failed.';
        }
      }, error => {
        this.user.username = '';
        this.user.password = '';
        this.error = error;
      });
  }

  ngOnInit() {
    if(!environment.contactApiUrl){
      //Local environment
      //Authentication is not supported
      this.appRouter.navigate(['/contacts']);
    }
    else{
      //Logout current user
      this.authentication.logout();
    }
  }

}
