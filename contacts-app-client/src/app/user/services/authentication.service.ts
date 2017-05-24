import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthenticationService {

  private baseUrl: string;

  constructor(private http: Http, private appRouter: Router) {
    this.baseUrl = environment.contactApiUrl;
  }

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

    /*
    this.http
      .post(this.baseUrl + '/authenticate', body, options)
      .subscribe(response => {
        localStorage.setItem('ca-token', response.json().access_token);
        console.log('Authentication service: login: ' + JSON.stringify(response.json()));
        this.appRouter.navigate(['/contacts']);
      }, error => {
        //Error handling should be improved
        console.log(error.json());
      });
      */

    return this.http.post(this.baseUrl + '/authenticate', body, options)
      .map(response => {
        let token = response.json() && response.json().access_token;
        if(token){
          localStorage.setItem('ca-token', token);
          return true;
        }
        else{
          return false;
        }
      });
  }
}
