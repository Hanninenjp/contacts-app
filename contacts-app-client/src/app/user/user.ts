export class User {

  firstName: string;
  lastName: string;
  username: string;
  password: string;

  constructor(firstName?, lastName?, username?, password?){
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.username = username || '';
    this.password = password || '';
  }

}
