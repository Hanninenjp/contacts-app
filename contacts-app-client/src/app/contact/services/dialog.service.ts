import { Injectable } from '@angular/core';
import {MdDialog} from "@angular/material";
import {Contact} from "../contact";
import {ContactDialogComponent} from "../dialogs/contact-dialog/contact-dialog.component";
import {MapDialogComponent} from "../dialogs/map-dialog/map-dialog.component";
import {Observable} from "rxjs";

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  public createContactDialog(): Observable<Contact>{
    let dialogRef = this.dialog.open(ContactDialogComponent);
    dialogRef.componentInstance.contact = new Contact();
    dialogRef.componentInstance.action = "Create";
    return dialogRef.afterClosed();
  }

  public updateContactDialog(contact: Contact): Observable<Contact> {
    let dialogRef = this.dialog.open(ContactDialogComponent);
    dialogRef.componentInstance.contact = contact;
    dialogRef.componentInstance.action = "Edit";
    return dialogRef.afterClosed();
  }

  public mapDialog(){
    let dialogRef = this.dialog.open(MapDialogComponent);
    //Pass address string to the dialog
    return dialogRef.afterClosed();
  }
}
