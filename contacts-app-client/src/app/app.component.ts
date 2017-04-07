import {Component} from '@angular/core';
import {Contact} from "./contact/contact";
import {ContactService} from "./contact/services/contact.service";
import {DialogService} from "./contact/services/dialog.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  //Synchronous method call based implementation
  //contacts: Contact[] = [];
  //End synchronous method call based implementation

  //Observable contact service implementation
  contacts: Observable<Contact[]>;

  constructor(private contactService: ContactService, private dialogService: DialogService){
    //Synchronous method call based implementation
    //this.contacts = contactService.getContacts();
    //End synchronous method call based implementation

    //Observable contact service implementation
    //Following should probably be in OnInit
    //On the other hand, the list could be alternatively handled by
    //the contact list child component, this depends on what the final
    //requirements for the app will be
    this.contacts = this.contactService.contacts;
    this.contactService.loadContacts();
  }

  //Following actions could potentially be implemented in the child components, that
  //would simply interact with the contact service, which would then trigger
  //appropriate updates in the data, that would be propagated back to the components
  //This approach could potentially simplify the implementation quite a bit by
  //avoiding the need to pass all the actions with associated data back to the app component
  //which does not currently seem to need to know the details, except for updating the data
  //through the contacts service
  //Consider what type of app architecture would be preferred and for which reasons!

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
    this.contactService.deleteContact(contact);
  }

  showContactOnMap(contact: Contact){
    console.log("App: showContactOnMap");
    console.log(JSON.stringify(contact));
    //Show on map is not fully implemented
    //Contact shall be passed to dialog service and used to display map
    //according to contact address, Google Maps Embed API will be used
    this.dialogService.mapDialog();
  }
}
