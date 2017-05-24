import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Contact} from "../contact";
import {environment} from "../../../environments/environment";
import {ContactProvider} from "./contact-provider";
import {Observable} from "rxjs/Observable";


@Injectable()
export class ContactApiService implements ContactProvider{

  private baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = environment.contactApiUrl;
  }

  //Handling authenticated HTTP requests should be improved

  loadContacts(): Observable<Contact[]>{
    //Add headers
    let token = localStorage.getItem('ca-token');
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });
    //Send request
    return this.http.get(this.baseUrl + '/contacts', options)
      .map(response => response.json() as Contact[]);
  }

  createContact(contact: Contact): Observable<Contact>{
    //Add headers
    let token = localStorage.getItem('ca-token');
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });
    //Send request
    return this.http.post(this.baseUrl + '/contacts', contact, options)
      .map(response => response.json() as Contact);
  }

  updateContact(contact: Contact): Observable<Contact>{
    //Add headers
    let token = localStorage.getItem('ca-token');
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });
    //Send request
    return this.http.put(this.baseUrl + '/contacts/' + contact.id, contact, options)
      //Current API implementation returns updated contact
      .map(response => response.json() as Contact);
  }

  deleteContact(contact: Contact): Observable<Contact>{
    //Add headers
    let token = localStorage.getItem('ca-token');
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });
    //Send request
    return this.http.delete(this.baseUrl + '/contacts/' + contact.id, options)
    //Current API implementation returns deleted contact
      .map(response => response.json() as Contact);
  }
}
