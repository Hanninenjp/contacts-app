import { Injectable } from '@angular/core';
import {Contact} from "../contact";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LocalStorageService {

  private contactLocalStorageKey: string = "ca-contacts";

  constructor() {
    if(!localStorage.getItem(this.contactLocalStorageKey)){
      //Initialize local storage with an empty array
      localStorage.setItem(this.contactLocalStorageKey, JSON.stringify([]));
    }
  }

  public loadContacts(): Observable<Contact[]>{
    let storageElement = localStorage.getItem(this.contactLocalStorageKey);
    let contacts = JSON.parse(storageElement);
    return Observable.of(contacts);
  }

  createContact(contact: Contact): Observable<Contact>{
    let storageElement = localStorage.getItem(this.contactLocalStorageKey);
    let contacts = JSON.parse(storageElement);
    if(contacts.length > 0){
      let maxId = Math.max.apply(null, contacts.map(c => c.id));
      console.log("maxId: " + maxId);
      contact.id = maxId + 1;
    }
    else{
      contact.id = 1;
    }
    console.log("Contact: " + JSON.stringify(contact));
    contacts.push(contact);
    localStorage.setItem(this.contactLocalStorageKey, JSON.stringify(contacts));
    return Observable.of(contact);
  }

  updateContact(contact: Contact): Observable<Contact>{
    let storageElement = localStorage.getItem(this.contactLocalStorageKey);
    let contacts = JSON.parse(storageElement);
    let index = contacts.findIndex(c => c.id === contact.id);
    console.log("index: " + index);
    contacts[index] = contact;
    localStorage.setItem(this.contactLocalStorageKey, JSON.stringify(contacts));
    return Observable.of(contact);
  }

  deleteContact(contact: Contact): Observable<Contact>{
    let storageElement = localStorage.getItem(this.contactLocalStorageKey);
    let contacts = JSON.parse(storageElement);
    let index = contacts.findIndex(c => c.id === contact.id);
    console.log("index: " + index);
    contacts.splice(index, 1);
    localStorage.setItem(this.contactLocalStorageKey, JSON.stringify(contacts));
    return Observable.of(contact);
  }
}
