import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwoPartAuthPage } from './two-part-auth.page';

const routes: Routes = [
  {
    path: '',
    component: TwoPartAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwoPartAuthPageRoutingModule {}
