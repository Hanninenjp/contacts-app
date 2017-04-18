import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private appRouter: Router) {
    this.user = new User();
  }

  onLogin(){
    this.appRouter.navigate(['/contacts']);
  }

  ngOnInit() {
  }

}
