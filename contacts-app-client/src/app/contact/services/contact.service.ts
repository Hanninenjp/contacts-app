import { Injectable } from '@angular/core';
import {Contact} from "../contact";
import {BehaviorSubject, Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {ContactApiService} from "./contact-api.service";

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

  constructor(private localStorageService: LocalStorageService, private contactApiService: ContactApiService){
    this.contactStore = { contacts: [] };
    this._contacts = <BehaviorSubject<Contact[]>>new BehaviorSubject([]);
    this.contacts = this._contacts.asObservable();
  }

  public loadContacts(){

    //Test data
    //this.contactStore.contacts.push(new Contact(1, 'First', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta'));
    //this.contactStore.contacts.push(new Contact(2, 'Second', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta'));
    //End test data

    //Local storage implementation
    //Load contacts from local storage
    //this.contactStore.contacts = this.localStorageService.loadContacts();
    //Only a copy of contacts is provided
    //this._contacts.next(Object.assign({}, this.contactStore).contacts);
    //End local storage implementation

    //Contact API implementation
    this.contactApiService.loadContacts()
      .subscribe(data => {
        console.log('ContactApiService: loadContacts: success');
        console.log(JSON.stringify(data));
        this.contactStore.contacts = data;
        this._contacts.next(Object.assign({}, this.contactStore).contacts);
      }, error => console.log('ContactApiService: loadContacts: error'));
    //End contact API implementation

  }

  public createContact(contact: Contact){
    console.log("contactService: createContact");
    console.log("Current Contacts: " + JSON.stringify(this.contactStore.contacts));

    //Local storage implementation
    /*
    if(this.contactStore.contacts.length > 0){
      let maxId = Math.max.apply(null, this.contactStore.contacts.map(c => c.id));
      console.log("maxId: " + maxId);
      contact.id = maxId + 1;
    }
    else{
      contact.id = 1;
    }
    console.log("Contact: " + JSON.stringify(contact));
    this.contactStore.contacts.push(contact);
    console.log("Updated Contacts: " + JSON.stringify(this.contactStore.contacts));

    //Update contacts in local storage
    this.localStorageService.saveContacts(this.contactStore.contacts);

    this._contacts.next(Object.assign({}, this.contactStore).contacts);
    */
    //End local storage implementation

    //Contact API implementation
    this.contactApiService.createContact(contact)
      .subscribe(data => {
        console.log('ContactApiService: createContact: success');
        console.log(JSON.stringify(data));
        this.contactStore.contacts.push(data);
        console.log("Updated Contacts: " + JSON.stringify(this.contactStore.contacts));
        this._contacts.next(Object.assign({}, this.contactStore).contacts);
      }, error => console.log('ContactApiService: createContact: failed'));
    //End contact API implementation
  }

  public updateContact(contact: Contact){
    console.log("contactService: updateContact");
    console.log("Current Contacts: " + JSON.stringify(this.contactStore.contacts));
    console.log("Contact: " + JSON.stringify(contact));

    //Local storage implementation
    /*
    let index = this.contactStore.contacts.findIndex(c => c.id === contact.id);
    console.log("index: " + index);
    //Object.assign(this.contactStore.contacts[index], contact); //Consider update method
    this.contactStore.contacts[index] = contact;
    console.log("Updated Contacts: " + JSON.stringify(this.contactStore.contacts));

    //Update contacts in local storage
    this.localStorageService.saveContacts(this.contactStore.contacts);

    this._contacts.next(Object.assign({}, this.contactStore).contacts);
    */
    //End local storage implementation

    //Contact API implementation
    this.contactApiService.updateContact(contact)
      .subscribe(data => {
        console.log('ContactApiService: updateContact: success');
        console.log(JSON.stringify(data));
        let index = this.contactStore.contacts.findIndex(c => c.id === contact.id); //Find existing contact
        this.contactStore.contacts[index] = data; //Update with contact received in response
        console.log("Updated Contacts: " + JSON.stringify(this.contactStore.contacts));
        this._contacts.next(Object.assign({}, this.contactStore).contacts);
      }, error => console.log('ContactApiService: updateContact: error'));
    //End contact API implementation
  }

  public deleteContact(contact: Contact){
    console.log("contactService: deleteContact");
    console.log("Current Contacts: " + JSON.stringify(this.contactStore.contacts));
    console.log("Contact: " + JSON.stringify(contact));

    //Local storage implementation
    /*
    let index = this.contactStore.contacts.findIndex(c => c.id === contact.id);
    console.log("index: " + index);
    this.contactStore.contacts.splice(index, 1);
    console.log("Updated Contacts: " + JSON.stringify(this.contactStore.contacts));

    //Update contacts in local storage
    this.localStorageService.saveContacts(this.contactStore.contacts);

    this._contacts.next(Object.assign({}, this.contactStore).contacts);
    */
    //End local storage implementation

    //Contact API implementation
    this.contactApiService.deleteContact(contact)
      .subscribe(status => {
        if(status === 204){
          //Success
          //API response HTTP 204 No Content
          console.log('ContactApiService: deleteContact: success: status: HTTP ' + status);
          let index = this.contactStore.contacts.findIndex(c => c.id === contact.id);
          console.log("index: " + index);
          this.contactStore.contacts.splice(index, 1);
          console.log("Updated Contacts: " + JSON.stringify(this.contactStore.contacts));
          this._contacts.next(Object.assign({}, this.contactStore).contacts);
        }
        else{
          //Failed
          //Could also be another status code indicating success, depending on the API
          //implementation, handling different status codes may need further attention
          //Error handling could be improved
          console.log('ContactApiService: deleteContact: error : failed: HTTP ' + status);
        }
      }, error => console.log('ContactApiService: deleteContact: error'));
    //End contact API implementation

  }
}

