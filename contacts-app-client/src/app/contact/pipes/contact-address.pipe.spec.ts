import {ContactAddressPipe} from "./contact-address.pipe";
import {Contact} from "../contact";

describe('ContactAddressPipe', () => {

  let pipe = new ContactAddressPipe();

  it('Should join and return streetAddress and city', () => {
    let contact = new Contact(1, 'FirstName', 'LastName', '0401234567', 'Laserkatu 10', 'Lappeenranta');
    expect(pipe.transform(contact)).toBe(contact.streetAddress + ', ' + contact.city);
  });

  it('Should return streetAddress', () => {
    let contact = new Contact(1, 'FirstName', 'LastName', '0401234567', 'Laserkatu 10', '');
    expect(pipe.transform(contact)).toBe(contact.streetAddress);
    contact.city = null;
    expect(pipe.transform(contact)).toBe(contact.streetAddress);
  });

  it('Should return city', () => {
    let contact = new Contact(1, 'FirstName', 'LastName', '0401234567', '', 'Lappeenranta');
    expect(pipe.transform(contact)).toBe(contact.city);
    contact.streetAddress = null;
    expect(pipe.transform(contact)).toBe(contact.city);
  });

  it('Should return empty string', () => {
    let contact = new Contact(1, 'FirstName', 'LastName', '0401234567', '', '');
    expect(pipe.transform(contact)).toBe('');
    expect(pipe.transform(null)).toBe((''));
  });

});
