import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CreteEditQrComponent } from './crete-edit-qr.component';
import { FooterModule}  from '../footer/footer.module';
@NgModule({
    
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [ CommonModule, FormsModule, IonicModule,FooterModule],
  declarations: [CreteEditQrComponent],
  exports: [CreteEditQrComponent]
})
export class CreteEditQrModule {}
