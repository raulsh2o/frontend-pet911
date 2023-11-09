
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { MapComponent } from './map.component';
import { Geolocation } from '@capacitor/geolocation';
@NgModule({
    
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [MapComponent],
  exports: [MapComponent]
})
export class MapComponentModule {}
