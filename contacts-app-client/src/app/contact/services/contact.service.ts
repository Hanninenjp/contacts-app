import { Injectable } from '@angular/core';
import {Contact} from "../contact";
import {BehaviorSubject, Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {ContactApiService} from "./contact-api.service";
import {environment} from "../../../environments/environment";
import {ContactProvider} from "./contact-provider";

@Injectable()
export class ContactService {

  contactProvider: ContactProvider;

  public contacts: Observable<Contact[]>;
  private _contacts: BehaviorSubject<Contact[]>;
  private contactStore: {
    contacts: Contact[]
  };

  constructor(private localStorageService: LocalStorageService, private contactApiService: ContactApiService){
    this.contactProvider = environment.contactApiUrl ? contactApiService : localStorageService;
    this.contactStore = { contacts: [] };
    this._contacts = <BehaviorSubject<Contact[]>>new BehaviorSubject([]);
    this.contacts = this._contacts.asObservable();
  }

  public loadContacts(){
    this.contactProvider.loadContacts()
      .subscribe(data => {
        this.contactStore.contacts = data;
        this._contacts.next(Object.assign({}, this.contactStore).contacts);
      }, error => console.error('ContactService: loadContacts: error: ' + JSON.stringify(error)));
  }

  public createContact(contact: Contact){
    this.contactProvider.createContact(contact)
      .subscribe(data => {
        this.contactStore.contacts.push(data);
        this._contacts.next(Object.assign({}, this.contactStore).contacts);
      }, error => console.error('ContactService: createContact: error: ' + JSON.stringify(error)));
  }

  public updateContact(contact: Contact){
    this.contactProvider.updateContact(contact)
      .subscribe(data => {
        //Alternatively, find index based on the returned contact id
        let index = this.contactStore.contacts.findIndex(c => c.id === contact.id);
        this.contactStore.contacts[index] = data;
        this._contacts.next(Object.assign({}, this.contactStore).contacts);
      }, error => console.error('ContactService: updateContact: error: ' + JSON.stringify(error)));
  }

  public deleteContact(contact: Contact){
    this.contactProvider.deleteContact(contact)
      .subscribe(data => {
        //Alternatively, find index based on the returned contact id
        let index = this.contactStore.contacts.findIndex(c => c.id === contact.id);
        this.contactStore.contacts.splice(index, 1);
        this._contacts.next(Object.assign({}, this.contactStore).contacts);
      }, error => console.error('ContactService: deleteContact: error: ' + JSON.stringify(error)));
  }

}

