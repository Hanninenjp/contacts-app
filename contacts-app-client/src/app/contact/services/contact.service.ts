import { Injectable } from '@angular/core';
import {Contact} from "../contact";

@Injectable()
export class ContactService {

  private _contacts: Contact[] = [];

  constructor() {
    this._contacts.push(new Contact(1, 'First', 'Contact', '0401234567', 'Koulukatu', 'Lappeenranta'));
    this._contacts.push(new Contact(2, 'Second', 'Contact', '0401234567', 'Koulukatu', 'Lappeenranta'));
  }

  public getContacts(): Contact[]{
    return this._contacts;
  }
}
