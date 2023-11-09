import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AssociateManagerComponent } from './associate-manager.component';
import { FooterModule } from '../footer/footer.module';
@NgModule({
    
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [ CommonModule, FormsModule, IonicModule,FooterModule],
  declarations: [AssociateManagerComponent],
  exports: [AssociateManagerComponent]
})
export class AssociateManagerModule {}