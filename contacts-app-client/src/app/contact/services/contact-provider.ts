import {Contact} from "../contact";
import {Observable} from "rxjs/Observable";

export interface ContactProvider {
  loadContacts(): Observable<any>;
  createContact(contact: Contact): Observable<any>;
  updateContact(contact: Contact): Observable<any>;
  deleteContact(contact: Contact): Observable<any>;
}
