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
    this.createContact.emit();
  }

  onContactUpdate(contact: Contact){
    this.updateContact.emit(contact);
  }

  onContactDelete(contact: Contact){
    this.deleteContact.emit(contact);
  }

  onContactShowOnMap(contact: Contact){
    this.showContactOnMap.emit(contact);
  }

  ngOnInit() {
  }

}
