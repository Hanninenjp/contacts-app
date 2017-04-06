import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Contact} from "../../contact";

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent implements OnInit {

  contact: Contact;
  action: string;
  contactForm: FormGroup;

  constructor(private dialogRef: MdDialogRef<ContactDialogComponent>) { }

  //Reactive forms are used

  onSubmit(form: FormGroup) {
    console.log("ContactDialog: onSubmit");
    console.log("Form valid:");
    console.log(form.valid);
    console.log("Form:");
    console.log(this.contactForm.value);
    let saveContact: Contact = new Contact();
    saveContact.id = this.contact.id;
    Object.assign(saveContact, this.contactForm.value);
    console.log("Contact:");
    console.log(saveContact);
    this.dialogRef.close(saveContact);
  }

  ngOnInit() {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      streetAddress: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    });
    this.contactForm.setValue({
      firstName: this.contact.firstName || '',
      lastName: this.contact.lastName || '',
      phone: this.contact.phone || '',
      streetAddress: this.contact.streetAddress || '',
      city: this.contact.city || ''
    });
  }
}
