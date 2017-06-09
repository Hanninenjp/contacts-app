import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from "../contact";

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.css']
})
export class ContactListItemComponent implements OnInit {

  @Input() contact: Contact;
  @Output() contactUpdate = new EventEmitter();
  @Output() contactDelete = new EventEmitter();
  @Output() contactShowOnMap = new EventEmitter();

  constructor() { }

  onUpdate(){
    this.contactUpdate.emit();
  }

  onDelete(){
    this.contactDelete.emit();
  }

  onShowOnMap(){
    this.contactShowOnMap.emit();
  }

  ngOnInit() {
  }

}
