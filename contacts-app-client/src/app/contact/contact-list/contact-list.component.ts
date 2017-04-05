import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../contact";
import {DialogService} from "../services/dialog.service";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Input() contacts: Contact[];

  constructor(public dialogService: DialogService) { }

  public createContact(){
    this.dialogService.contactDialog();
  }

  ngOnInit() {
  }

}
