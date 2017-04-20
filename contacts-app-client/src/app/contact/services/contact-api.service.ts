import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Contact} from "../contact";

@Injectable()
export class ContactApiService {

  private baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:51367/api';
  }

  loadContacts() {
    return this.http.get(this.baseUrl + '/contacts')
      .map(response => response.json() as Contact[]);
  }

  createContact(contact: Contact){
    return this.http.post(this.baseUrl + '/contacts', contact)
      .map(response => response.json() as Contact);
  }

  updateContact(contact: Contact){
    return this.http.put(this.baseUrl + '/contacts/' + contact.id, contact)
      .map(response => response.json() as Contact);
  }

  deleteContact(contact: Contact){
    return this.http.delete(this.baseUrl + '/contacts/' + contact.id)
      .map(response => response.status);
  }
}
