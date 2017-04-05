export class Contact {
  public id: number;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public streetAddress: string;
  public city: string;

  constructor(id?: number, firstName?: string, lastName?: string, phone?: string, streetAddress?: string, city?: string){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.streetAddress = streetAddress;
    this.city = city;
  }
}
