import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import {  EmergencyListComponent } from './emergency-list.component';
import { FooterModule } from '../footer/footer.module';
import { IonicStorageModule } from '@ionic/storage-angular';
@NgModule({
    
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [ CommonModule, FormsModule, IonicModule,FooterModule,IonicStorageModule.forRoot()],
  declarations: [EmergencyListComponent],
  exports: [EmergencyListComponent]
})
export class EmergencyListModule {}