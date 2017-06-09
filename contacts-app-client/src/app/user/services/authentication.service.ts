import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {JwtHelper} from "angular2-jwt";
import {User} from "../user";

@Injectable()
export class AuthenticationService {

  private baseUrl: string;
  private authenticatedUser: User;
  private applicationUser: Subject<User>;
  private jwtHelper: JwtHelper;

  constructor(private http: Http) {
    this.baseUrl = environment.contactApiUrl;
    this.authenticatedUser = null;
    this.applicationUser = new Subject<User>();
    this.jwtHelper = new JwtHelper();
  }

  //Current implementation provides support for simple token-based authentication, but some
  //functionality is currently not implemented, including keeping track of token expiration,
  //and refreshing token

  public login(username: string, password: string): Observable<boolean>{
    //Current server middleware implementation requires that username and password are
    //are sent in the authentication request as url encoded form data
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password);
    let body = urlSearchParams.toString();

    return this.http.post(this.baseUrl + '/authenticate', body, options)
      .map(response => {
        let token = response.json() && response.json().access_token;
        if(token){
          localStorage.setItem('ca-token', token);
          let tokenPayload = this.jwtHelper.decodeToken(token);
          console.log(tokenPayload);
          this.authenticatedUser = new User(tokenPayload.given_name || '', tokenPayload.family_name || '', username, password);
          this.applicationUser.next(this.authenticatedUser);
          return true;
        }
        else{
          console.log('Authentication service: login: no token');
          return false;
        }
      })
      //Error handling could be further clarified and error
      // handling implementation could be refactored
      .catch((error: any) => {
        let errorMessage = '';
        console.log('Authentication service: login: error');
        console.log(JSON.stringify(error));
        if(error instanceof Response){
          if(error.status){
            errorMessage = error.text() || 'Login failed.';
          }
          else{
            errorMessage = 'Login failed.';
          }
        }
        else{
          errorMessage = 'Login failed.';
          console.error(error.message ? error.message : error.toString());
        }
        return Observable.throw(errorMessage);
      });
  }

  public logout(): Observable<boolean>{
    localStorage.removeItem('ca-token');
    this.authenticatedUser = null;
    this.applicationUser.next(this.authenticatedUser);
    return Observable.of(true);
  }

  public isAuthenticatedUser(): boolean{
    if(this.authenticatedUser){
      return true;
    }
    return false;
  }

  public getAuthenticatedUser(): Observable<User>{
    return this.applicationUser.asObservable();
  }

}
