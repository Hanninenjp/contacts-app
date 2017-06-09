import { Injectable } from '@angular/core';

@Injectable()
export class DeviceService {

  private cordova: boolean;

  constructor() {
    document.addEventListener('deviceready', () => {
      this.cordova = true;
    }, false);
  }

  public vibrate(time?: number){
    if(this.cordova){
      navigator.vibrate(time || 100);
    }
  }

}
