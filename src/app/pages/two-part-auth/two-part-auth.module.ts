import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TwoPartAuthPageRoutingModule } from './two-part-auth-routing.module';

import { TwoPartAuthPage } from './two-part-auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TwoPartAuthPageRoutingModule
  ],
  declarations: [TwoPartAuthPage]
})
export class TwoPartAuthPageModule {}
