import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {ContactService} from "./contact/services/contact.service";
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactListItemComponent } from './contact/contact-list-item/contact-list-item.component';
import {MaterialModule} from "@angular/material";
import { ContactDialogComponent } from './contact/dialogs/contact-dialog/contact-dialog.component';
import {DialogService} from "./contact/services/dialog.service";
import { MapDialogComponent } from './contact/dialogs/map-dialog/map-dialog.component';
import {LocalStorageService} from "./contact/services/local-storage.service";
import { ConfirmDialogComponent } from './contact/dialogs/confirm-dialog/confirm-dialog.component';
import { ContactAddressPipe } from './contact/pipes/contact-address.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactListItemComponent,
    ContactDialogComponent,
    MapDialogComponent,
    ConfirmDialogComponent,
    ContactAddressPipe
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
    ContactService,
    DialogService,
    LocalStorageService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ContactDialogComponent,
    ConfirmDialogComponent,
    MapDialogComponent
  ]
})
export class AppModule { }
