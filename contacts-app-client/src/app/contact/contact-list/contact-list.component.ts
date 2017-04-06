import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from "../contact";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Input() contacts: Contact[];
  @Output() createContact = new EventEmitter();
  @Output() updateContact: EventEmitter<Contact> = new EventEmitter();
  @Output() deleteContact: EventEmitter<Contact> = new EventEmitter();
  @Output() showContactOnMap: EventEmitter<Contact> = new EventEmitter();

  constructor() { }

  onContactCreate(){
    console.log("ContactList: onContactCreate");
    this.createContact.emit();
  }

  onContactUpdate(contact: Contact){
    console.log("ContactList: onContactUpdate");
    console.log(contact);
    this.updateContact.emit(contact);
  }

  onContactDelete(contact: Contact){
    console.log("ContactList: onContactDelete");
    console.log(contact);
    this.deleteContact.emit(contact);
  }

  onContactShowOnMap(contact: Contact){
    console.log("ContactList: onContactShowOnMap");
    console.log(contact);
    this.showContactOnMap.emit(contact);
  }

  ngOnInit() {
  }

}
