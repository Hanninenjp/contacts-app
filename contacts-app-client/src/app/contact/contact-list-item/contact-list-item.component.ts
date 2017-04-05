import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../contact";
import {DialogService} from "../services/dialog.service";

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.css']
})
export class ContactListItemComponent implements OnInit {

  @Input() contact: Contact;

  constructor(private dialogService: DialogService) { }

  //This will be the edit dialog
  //Pass contact to the dialog, dialog should return edited contact, which is passed to the parent
  contactDialog(){
    this.dialogService.contactDialog();
  }

  mapDialog(){
    this.dialogService.mapDialog();
  }

  ngOnInit() {
  }

}
