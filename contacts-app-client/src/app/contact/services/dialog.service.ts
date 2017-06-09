import { Injectable } from '@angular/core';
import {MdDialog} from "@angular/material";
import {Contact} from "../contact";
import {ContactDialogComponent} from "../dialogs/contact-dialog/contact-dialog.component";
import {MapDialogComponent} from "../dialogs/map-dialog/map-dialog.component";
import {Observable} from "rxjs";
import {ConfirmDialogComponent} from "../dialogs/confirm-dialog/confirm-dialog.component";

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  public createContactDialog(): Observable<Contact>{
    let dialogRef = this.dialog.open(ContactDialogComponent);
    dialogRef.componentInstance.contact = new Contact();
    dialogRef.componentInstance.title = "New contact";
    dialogRef.componentInstance.action = "Create";
    return dialogRef.afterClosed();
  }

  public updateContactDialog(contact: Contact): Observable<Contact> {
    let dialogRef = this.dialog.open(ContactDialogComponent);
    dialogRef.componentInstance.contact = contact;
    dialogRef.componentInstance.title = "Edit contact";
    dialogRef.componentInstance.action = "Save";
    return dialogRef.afterClosed();
  }

  public deleteContactDialog(contact: Contact): Observable<boolean> {
    let dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.contact = contact;
    return dialogRef.afterClosed();
  }

  public mapDialog(contact: Contact){
    let dialogRef = this.dialog.open(MapDialogComponent);
    dialogRef.componentInstance.streetAddress = contact.streetAddress;
    dialogRef.componentInstance.city = contact.city;
    //return dialogRef.afterClosed();
  }

}
