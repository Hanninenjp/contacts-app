import { Injectable } from '@angular/core';
import {Contact} from "../contact";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class ContactService {

  //Synchronous method call based implementation
  /*
  private _contacts: Contact[] = [];

  constructor() {
    this._contacts.push(new Contact(1, 'First', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta'));
    this._contacts.push(new Contact(2, 'Second', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta'));
  }

  public getContacts(): Contact[]{
    return this._contacts;
  }
  */
  //End synchronous method call based implementation

  //Observable contact service implementation
  public contacts: Observable<Contact[]>;
  private _contacts: BehaviorSubject<Contact[]>;
  private contactStore: {
    contacts: Contact[]
  };

  constructor(){
    this.contactStore = { contacts: [] };
    this._contacts = <BehaviorSubject<Contact[]>>new BehaviorSubject([]);
    this.contacts = this._contacts.asObservable();
  }

  public loadContacts(){
    //Test data
    this.contactStore.contacts.push(new Contact(1, 'First', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta'));
    this.contactStore.contacts.push(new Contact(2, 'Second', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta'));
    //End test data
    //Local storage handling is not yet implemented
    //Only a copy of contacts is provided
    this._contacts.next(Object.assign({}, this.contactStore).contacts);
  }

  public createContact(contact: Contact){
    console.log("contactService: createContact");
    console.log("Current Contacts: " + JSON.stringify(this.contactStore.contacts));
    if(this.contactStore.contacts.length > 0){
      let maxId = Math.max.apply(null, this.contactStore.contacts.map(c => c.id));
      console.log("maxId: " + maxId);
      contact.id = maxId + 1;
    }
    else{
      contact.id = 1;
    }
    console.log("Contact: " + JSON.stringify(contact));
    //Local storage handling is not yet implemented
    this.contactStore.contacts.push(contact);
    console.log("Updated Contacts: " + JSON.stringify(this.contactStore.contacts));
    this._contacts.next(Object.assign({}, this.contactStore).contacts);
  }

  public updateContact(contact: Contact){
    console.log("contactService: updateContact");
    console.log("Current Contacts: " + JSON.stringify(this.contactStore.contacts));
    console.log("Contact: " + JSON.stringify(contact));
    let index = this.contactStore.contacts.findIndex(c => c.id === contact.id);
    console.log("index: " + index);
    //Local storage handling is not yet implemented
    //Object.assign(this.contactStore.contacts[index], contact); //Consider update method
    this.contactStore.contacts[index] = contact;
    console.log("Updated Contacts: " + JSON.stringify(this.contactStore.contacts));
    this._contacts.next(Object.assign({}, this.contactStore).contacts);
  }

  public deleteContact(contact: Contact){
    console.log("contactService: deleteContact");
    console.log("Current Contacts: " + JSON.stringify(this.contactStore.contacts));
    console.log("Contact: " + JSON.stringify(contact));
    let index = this.contactStore.contacts.findIndex(c => c.id === contact.id);
    console.log("index: " + index);
    //Local storage handling is not yet implemented
    this.contactStore.contacts.splice(index, 1);
    console.log("Updated Contacts: " + JSON.stringify(this.contactStore.contacts));
    this._contacts.next(Object.assign({}, this.contactStore).contacts);
  }
}

