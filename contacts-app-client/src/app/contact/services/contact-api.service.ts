import { Injectable } from '@angular/core';
import {Contact} from "../contact";
import {environment} from "../../../environments/environment";
import {ContactProvider} from "./contact-provider";
import {Observable} from "rxjs/Observable";
import {AuthHttp} from "angular2-jwt";


@Injectable()
export class ContactApiService implements ContactProvider{

  private baseUrl: string;

  constructor(private authHttp: AuthHttp) {
    this.baseUrl = environment.contactApiUrl;
  }

  loadContacts(): Observable<Contact[]>{
    return this.authHttp.get(this.baseUrl + '/contacts')
      .map(response => response.json() as Contact[]);
  }

  createContact(contact: Contact): Observable<Contact>{
    return this.authHttp.post(this.baseUrl + '/contacts', contact)
      .map(response => response.json() as Contact);
  }

  updateContact(contact: Contact): Observable<Contact>{
    return this.authHttp.put(this.baseUrl + '/contacts/' + contact.id, contact)
    //Current API implementation returns updated contact
      .map(response => response.json() as Contact);
  }

  deleteContact(contact: Contact): Observable<Contact>{
    return this.authHttp.delete(this.baseUrl + '/contacts/' + contact.id)
    //Current API implementation returns deleted contact
      .map(response => response.json() as Contact);
  }
}
