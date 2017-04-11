import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent implements OnInit {

  public streetAddress = '';
  public city = '';
  public mapUrl: string;

  constructor(public dialogRef: MdDialogRef<MapDialogComponent>, private sanitizer: DomSanitizer) {}

  sanitizeUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
    //Removing extra whitespace characters could be improved
    this.mapUrl = "https://maps.google.com/maps?q=" + this.streetAddress.trim().replace(' ', '+') + ",+" + this.city.trim().replace(' ', '+') + "&output=embed";
  }

}
