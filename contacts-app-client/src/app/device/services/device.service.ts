import { Injectable } from '@angular/core';

@Injectable()
export class DeviceService {

  private cordova: boolean;

  constructor() {
    document.addEventListener('deviceready', () => {
      console.log('DeviceService: deviceready');
      this.cordova = true;
    }, false);
  }

  public vibrate(time?: number){
    if(this.cordova){
      console.log('DeviceService: vibrate');
      navigator.vibrate(time || 100);
    }
  }

}
