import {Directive, HostListener} from '@angular/core';
import {DeviceService} from "../services/device.service";

@Directive({
  selector: '[caVibration]'
})
export class VibrationDirective {

  constructor(private deviceService: DeviceService) {

  }

  @HostListener('click', ['$event'])
  onClick() {
    console.log('VibrationDirective: click');
    this.deviceService.vibrate();
  }

}
