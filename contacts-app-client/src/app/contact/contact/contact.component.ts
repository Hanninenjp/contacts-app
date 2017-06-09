import { Component, OnInit } from '@angular/core';
import {Contact} from "../contact";
import {Observable} from "rxjs/Observable";
import {ContactService} from "../services/contact.service";
import {DialogService} from "../services/dialog.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Observable<Contact[]>;

  constructor(private contactService: ContactService, private dialogService: DialogService){

  }

  createContact(){
    this.dialogService.createContactDialog()
    //Handling the observable result could be alternatively done by the dialog service, which
    //would interact with the contact service
      .subscribe(contact => {
        if (contact) {
          this.contactService.createContact(contact);
        } else {
          //Cancelled
        }
      });
  }

  updateContact(contact: Contact){
    this.dialogService.updateContactDialog(contact)
      .subscribe(contact => {
        if(contact){
          this.contactService.updateContact(contact);
        }
        else{
          //Cancelled
        }
      });
  }

  deleteContact(contact: Contact){
    this.dialogService.deleteContactDialog(contact)
      .subscribe(confirm => {
        if(confirm){
          this.contactService.deleteContact(contact);
        }
        else{
          //Cancelled
        }
      });
  }

  showContactOnMap(contact: Contact){
    this.dialogService.mapDialog(contact);
  }

  ngOnInit() {
    //Observable contact service initialization
    this.contacts = this.contactService.contacts;
    this.contactService.loadContacts();
  }

}
