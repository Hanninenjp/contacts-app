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
    console.log("App: createContact");
    this.dialogService.createContactDialog()
    //Handling the observable result could be alternatively done by the dialog service, which
    //would interact with the contact service
    //Perhaps this would be a better choice, consider implementing the changes
      .subscribe(contact => {
        console.log("App: createContactDialog");
        if (contact) {
          console.log(JSON.stringify(contact));
          this.contactService.createContact(contact);
        } else {
          //Cancelled
          console.log("Cancelled");
        }
      });
  }

  updateContact(contact: Contact){
    console.log("App: updateContact");
    console.log(JSON.stringify(contact));
    this.dialogService.updateContactDialog(contact)
      .subscribe(contact => {
        console.log("App: updateContactDialog");
        if(contact){
          console.log(JSON.stringify(contact));
          this.contactService.updateContact(contact);
        }
        else{
          //Cancelled
          console.log("Cancelled");
        }
      });
  }

  deleteContact(contact: Contact){
    console.log("App: deleteContact");
    console.log(JSON.stringify(contact));
    this.dialogService.deleteContactDialog(contact)
      .subscribe(confirm => {
        console.log("Delete confirmed: " + confirm);
        if(confirm){
          this.contactService.deleteContact(contact);
        }
        else{
          //Cancelled
          console.log("Cancelled");
        }
      });
  }

  showContactOnMap(contact: Contact){
    console.log("App: showContactOnMap");
    console.log(JSON.stringify(contact));
    this.dialogService.mapDialog(contact);
  }

  ngOnInit() {

    console.log('ContactComponent: ngOnInit');
    console.log('ContactComponent: loading contacts');

    //Observable contact service initialization
    this.contacts = this.contactService.contacts;
    this.contactService.loadContacts();
  }

}
