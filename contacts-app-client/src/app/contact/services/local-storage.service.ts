import { Injectable } from '@angular/core';
import {Contact} from "../contact";

@Injectable()
export class LocalStorageService {

  private contactLocalStorageKey: string = "ca-contacts";

  constructor() {
    if(!localStorage.getItem(this.contactLocalStorageKey)){
      //Initialize local storage with an empty array
      localStorage.setItem(this.contactLocalStorageKey, JSON.stringify([]));
    }
  }

  public loadContacts(): Contact[]{
    let storageElement = localStorage.getItem(this.contactLocalStorageKey);
    return JSON.parse(storageElement);
  }

  public saveContacts(contacts: Contact[]){
    localStorage.setItem(this.contactLocalStorageKey, JSON.stringify(contacts));
  }
}
