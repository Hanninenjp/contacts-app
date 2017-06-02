import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthenticationService {

  private baseUrl: string;
  private appUser: string;
  private authState: Subject<boolean>;

  constructor(private http: Http) {
    this.baseUrl = environment.contactApiUrl;
    this.appUser = '';
    this.authState = new Subject<boolean>();
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
          this.appUser = username;
          this.authState.next(true);
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
    this.appUser = '';
    this.authState.next(false);
    return Observable.of(true);
  }

  public getAuthState(): Observable<boolean>{
    return this.authState.asObservable();
  }

}
