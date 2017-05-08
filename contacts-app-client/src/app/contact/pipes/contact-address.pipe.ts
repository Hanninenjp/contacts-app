import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from "../contact";
import {isNull} from "util";

@Pipe({
  name: 'contactAddress'
})
export class ContactAddressPipe implements PipeTransform {

  transform(contact: Contact, args?: any): any {
    if(!contact){
      return '';
    }
    let addressParts = [contact.streetAddress || null, contact.city || null];
    addressParts = addressParts.filter(p => !isNull(p));
    return addressParts.join(', ');
  }

}
