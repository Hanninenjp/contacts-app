import { Component, OnInit } from '@angular/core';
import {Contact} from "../../contact";
import {ContactDialogComponent} from "../contact-dialog/contact-dialog.component";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  contact: Contact;

  constructor(private dialogRef: MdDialogRef<ContactDialogComponent>) { }

  actionConfirmed(){
    this.dialogRef.close(true);
  }

  ngOnInit() {
  }

}
