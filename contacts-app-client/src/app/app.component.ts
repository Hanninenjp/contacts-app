import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./user/services/authentication.service";
import {Router} from "@angular/router";
import {User} from "./user/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  authenticatedUser: User;

  constructor(private appRouter: Router, private authentication: AuthenticationService) {
    this.authenticatedUser = null;
  }

  onLogout(){
    //Navigating to login will trigger logout
    this.appRouter.navigate(['/login']);
  }

  ngOnInit(){
    this.authentication.getAuthenticatedUser()
      .subscribe(user => {
        this.authenticatedUser = user;
      });
  }

}
