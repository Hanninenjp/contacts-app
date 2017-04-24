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
    console.log('ContactService: constructor: environment:');
    console.log(environment);
    //this.contactProvider = contactApiService; //Contact API service
    //this.contactProvider = localStorageService; //Local storage service
    this.contactProvider = environment.contactApiUrl ? contactApiService : localStorageService;
    this.contactStore = { contacts: [] };
    this._contacts = <BehaviorSubject<Contact[]>>new BehaviorSubject([]);
    this.contacts = this._contacts.asObservable();
  }

  public loadContacts(){
    console.log("ContactService: loadContacts");
    this.contactProvider.loadContacts()
      .subscribe(data => {
        console.log('ContactService: loadContacts: success');
        console.log(JSON.stringify(data));
        this.contactStore.contacts = data;
        this._contacts.next(Object.assign({}, this.contactStore).contacts);
      }, error => console.log('ContactService: loadContacts: error'));
  }

  public createContact(contact: Contact){
    console.log("ContactService: createContact");
    console.log("Current Contacts: " + JSON.stringify(this.contactStore.contacts));
    this.contactProvider.createContact(contact)
      .subscribe(data => {
        console.log('ContactService: createContact: success');
        console.log(JSON.stringify(data));
        this.contactStore.contacts.push(data);
        console.log("Updated Contacts: " + JSON.stringify(this.contactStore.contacts));
        this._contacts.next(Object.assign({}, this.contactStore).contacts);
      }, error => console.log('ContactService: createContact: failed'));
  }

  public updateContact(contact: Contact){
    console.log("ContactService: updateContact");
    console.log("Current Contacts: " + JSON.stringify(this.contactStore.contacts));
    console.log("Contact: " + JSON.stringify(contact));
    this.contactProvider.updateContact(contact)
      .subscribe(data => {
        console.log('ContactService: updateContact: success');
        console.log(JSON.stringify(data));
        //Alternatively, find index based on the returned contact id
        let index = this.contactStore.contacts.findIndex(c => c.id === contact.id);
        this.contactStore.contacts[index] = data;
        console.log("Updated Contacts: " + JSON.stringify(this.contactStore.contacts));
        this._contacts.next(Object.assign({}, this.contactStore).contacts);
      }, error => console.log('ContactService: updateContact: error'));
  }

  public deleteContact(contact: Contact){
    console.log("ContactService: deleteContact");
    console.log("Current Contacts: " + JSON.stringify(this.contactStore.contacts));
    console.log("Contact: " + JSON.stringify(contact));
    this.contactProvider.deleteContact(contact)
      .subscribe(data => {
        console.log('ContactService: deleteContact: success');
        console.log(JSON.stringify(data));
        //Alternatively, find index based on the returned contact id
        let index = this.contactStore.contacts.findIndex(c => c.id === contact.id);
        console.log("index: " + index);
        this.contactStore.contacts.splice(index, 1);
        console.log("Updated Contacts: " + JSON.stringify(this.contactStore.contacts));
        this._contacts.next(Object.assign({}, this.contactStore).contacts);
      }, error => console.log('ContactService: deleteContact: error'));
  }
}

