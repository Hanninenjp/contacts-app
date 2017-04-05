import { Injectable } from '@angular/core';
import {MdDialog} from "@angular/material";
import {Contact} from "../contact";
import {ContactDialogComponent} from "../dialogs/contact-dialog/contact-dialog.component";
import {MapDialogComponent} from "../dialogs/map-dialog/map-dialog.component";

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  public contactDialog(contact?: Contact){
    let dialogRef = this.dialog.open(ContactDialogComponent);
    //Pass contact to the dialog
    //Pass create/edit string to the dialog
    //dialogRef.componentInstance.contact = contact;
    return dialogRef.afterClosed();
  }

  public mapDialog(){
    let dialogRef = this.dialog.open(MapDialogComponent);
    //Pass address string to the dialog
    return dialogRef.afterClosed();

    /*
    //Get return value
    //Perhaps this should be handled by the service user
     dialog.afterClosed()
     .subscribe(selection => {
     if (selection) {
     this.selected = selection;
     } else {
     // User clicked 'Cancel' or clicked outside the dialog
     }
     });
    */

  }
}
