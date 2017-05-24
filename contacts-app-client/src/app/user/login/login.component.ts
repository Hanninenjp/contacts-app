import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../user";
import {AuthenticationService} from "../services/authentication.service";

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

    console.log('LoginComponent: onLogin');
    this.error = '';
    this.authentication.login(this.user.username, this.user.password)
      .subscribe(result => {
        if(result === true){
          this.appRouter.navigate(['/contacts']);
        }
        else{
          console.log('LoginComponent: onLogin: error');
          //this.user.username = '';
          //this.user.password = '';
          this.error = 'Invalid username or password!';
        }
      }, error => {
        console.log('LoginComponent: onLogin: error');
        //this.user.username = '';
        //this.user.password = '';
        this.error = 'Invalid username or password!';
      });
  }

  ngOnInit() {
  }

}
