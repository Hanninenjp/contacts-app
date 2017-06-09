import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from "../user/services/authentication.service";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private appRouter: Router, private authentication: AuthenticationService){ }

  canActivate(){
    if(!environment.contactApiUrl) {
      //Local environment
      //Authentication is not supported
      return true;
    }
    else if(this.authentication.isAuthenticatedUser()){
      return true;
    }
    this.appRouter.navigate(['/login']);
    return false;
  }

}
