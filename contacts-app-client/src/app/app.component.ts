import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./user/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  authState: boolean;

  constructor(private appRouter: Router, private authentication: AuthenticationService) {
    this.authState = false;
  }

  onLogout(){
    //Navigating to login will also trigger logout
    this.authentication.logout()
      .subscribe(result => {
        this.appRouter.navigate(['/login']);
    });
  }

  ngOnInit(){
    this.authentication.getAuthState()
      .subscribe(state => {
        console.log('Authentication state: ' + state);
        this.authState = state;
      })
  }

}
