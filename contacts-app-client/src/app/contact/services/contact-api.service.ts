import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
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

  loadContacts(): Observable<Contact[]>{
    return this.http.get(this.baseUrl + '/contacts')
      .map(response => response.json() as Contact[]);
  }

  createContact(contact: Contact): Observable<Contact>{
    return this.http.post(this.baseUrl + '/contacts', contact)
      .map(response => response.json() as Contact);
  }

  updateContact(contact: Contact): Observable<Contact>{
    return this.http.put(this.baseUrl + '/contacts/' + contact.id, contact)
      //Current API implementation returns updated contact
      .map(response => response.json() as Contact);
  }

  deleteContact(contact: Contact): Observable<Contact>{
    return this.http.delete(this.baseUrl + '/contacts/' + contact.id)
    //Current API implementation returns deleted contact
      .map(response => response.json() as Contact);
  }
}
