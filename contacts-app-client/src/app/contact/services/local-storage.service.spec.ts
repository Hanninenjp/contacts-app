import {LocalStorageService} from "./local-storage.service";
import {inject, TestBed} from "@angular/core/testing";
import 'rxjs/add/observable/of';
import {Contact} from "../contact";

describe('LocalStorageService', () => {

  let localStorageKey = 'ca-contacts';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
  });

  //Mock local storage
  beforeEach(() => {
    let store = {};
    spyOn(localStorage, 'getItem').and.callFake((key) => {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key, value) => {
      store[key] = value;
    });
  });

  function contactArray(){
    return [
      new Contact(1, 'First', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta'),
      new Contact(2, 'Second', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta'),
      new Contact(3, 'Third', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta')
    ];
  }

  //Initialize
  it('#constructor should initialize local storage', inject([LocalStorageService], (service: LocalStorageService) => {
    let data =localStorage.getItem(localStorageKey);
    expect(JSON.parse(data)).toEqual([]);
  }));

  //Load
  it('#loadContacts should read and return all contacts from local storage', inject([LocalStorageService], (service: LocalStorageService) => {
    let contacts = contactArray();
    let contactIds = contacts.map(c => c.id);
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
    service.loadContacts().subscribe((contacts: Contact[]) => {
      expect(contacts.length).toBe(3);
      expect(contacts.map(c => c.id)).toEqual(contactIds);
    });
  }));

  //Create
  it('#createContact should create a contact in local storage', inject([LocalStorageService], (service: LocalStorageService) => {

    //Empty storage, add first contact, assign id 1
    let testContact = new Contact(null, 'First', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta');
    service.createContact(testContact).subscribe((contact: Contact) => {
      expect(contact.id).toBe(1);
    });
    service.loadContacts().subscribe((contacts: Contact[]) => {
      expect(contacts.length).toBe(1);
      expect(contacts[0].id).toBe(1);
    });
    //Contacts stored, add contact, assign consecutive id
    testContact = new Contact(null, 'Second', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta');
    service.createContact(testContact).subscribe((contact: Contact) => {
      expect(contact.id).toBe(2);
    });
    service.loadContacts().subscribe((contacts: Contact[]) => {
      expect(contacts.length).toBe(2);
      expect(contacts[1].id).toBe(2);
    });
  }));

  //Update
  it('#updateContact should update a contact in local storage', inject([LocalStorageService], (service: LocalStorageService) => {

    //Empty storage, add first contact, assign id 1
    let testContact = new Contact(null, 'First', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta');
    service.createContact(testContact).subscribe((contact: Contact) => {
      expect(contact.id).toBe(1);
    });
    service.loadContacts().subscribe((contacts: Contact[]) => {
      expect(contacts.length).toBe(1);
      expect(contacts[0].id).toBe(1);
    });
    //Contacts stored, update contact
    testContact = new Contact(1, 'Other', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta');
    service.updateContact(testContact).subscribe((contact: Contact) => {
      expect(contact.firstName).toEqual('Other');
    });
    service.loadContacts().subscribe((contacts: Contact[]) => {
      expect(contacts.length).toBe(1);
      expect(contacts[0].firstName).toEqual('Other');
    });
  }));

  //Delete
  it('#deleteContact should delete a contact from local storage', inject([LocalStorageService], (service: LocalStorageService) => {

    //Empty storage, add first contact, assign id 1
    let testContact = new Contact(null, 'First', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta');
    service.createContact(testContact).subscribe((contact: Contact) => {
      expect(contact.id).toBe(1);
    });
    service.loadContacts().subscribe((contacts: Contact[]) => {
      expect(contacts.length).toBe(1);
      expect(contacts[0].id).toBe(1);
    });
    //Contacts stored, delete contact
    testContact = new Contact(1, 'First', 'Contact', '0401234567', 'Laserkatu 10', 'Lappeenranta');
    service.deleteContact(testContact).subscribe((contact: Contact) => {
      expect(contact.id).toBe(1);
    });
    service.loadContacts().subscribe((contacts: Contact[]) => {
      expect(contacts.length).toBe(0);
    });
  }));

});
