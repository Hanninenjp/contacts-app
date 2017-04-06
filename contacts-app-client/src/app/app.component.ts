import { Component } from '@angular/core';
import {Contact} from "./contact/contact";
import {ContactService} from "./contact/services/contact.service";
import {DialogService} from "./contact/services/dialog.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private dialogService: DialogService){
    this.contacts = contactService.getContacts();
  }

  createContact(){
    console.log("App: createContact");
    this.dialogService.createContactDialog()
      .subscribe(result => {
        console.log("App: createContactDialog");
        if (result) {
          //Create not implemented
          console.log(result);
        } else {
          //Cancelled
          console.log("Cancelled");
        }
      });
  }

  updateContact(contact: Contact){
    console.log("App: updateContact");
    console.log(contact);
    //Update not implemented
  }

  deleteContact(contact: Contact){
    console.log("App: deleteContact");
    console.log(contact);
    //Delete not implemented
  }

  showContactOnMap(contact: Contact){
    console.log("App: showContactOnMap");
    console.log(contact);
    //Show on map not implemented
  }
}
