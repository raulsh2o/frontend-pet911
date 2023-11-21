import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AdoptCarrouselComponent } from './components/adopt-carrousel/adopt-carrousel.component';
import { AdoptInfoComponent } from './components/adopt-info/adopt-info.component';
import { AssociatedStartComponent } from './components/associated-start/associated-start.component';
import { ClientStartComponent } from './components/client-start/client-start.component';
import { HistoryComponent } from './components/history/history.component';
import { MapComponent } from './components/map/map.component';
import { MenuComponent } from './components/menu/menu.component';
import { ServiceInfoComponent } from './components/service-info/service-info.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { UserPetsComponent } from './components/user-pets/user-pets.component';
import { AllpetsComponent } from './components/allpets/allpets.component';
import { PetInfoComponent } from './components/pet-info/pet-info.component';
import { CreteEditPetComponent } from './components/crete-edit-pet/crete-edit-pet.component';
import { CreteEditQrComponent } from './components/crete-edit-qr/crete-edit-qr.component';
import { QrListComponent } from './components/qr-list/qr-list.component';
import { QrInfoComponent } from './components/qr-info/qr-info.component';
import { UseTermsComponent } from './components/use-terms/use-terms.component';
import { SupportComponent } from './components/support/support.component';
import { AssociateSchedulesComponent } from './components/associate-schedules/associate-schedules.component';
import { ActivateTwofaComponent } from './components/activate-twofa/activate-twofa.component';
import { EditSchedulesComponent } from './components/edit-schedules/edit-schedules.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { SelectServiceComponent } from './components/select-service/select-service.component';
import { AssociateListComponent } from './components/associate-list/associate-list.component';
import { AssociateManagerComponent } from './components/associate-manager/associate-manager.component';
import { ReviewComponent } from './components/review/review.component';
import { EmergencyComponent} from './components/emergency/emergency.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'password-change/:id',
    loadChildren: () => import('./pages/password-change/password-change.module').then( m => m.PasswordChangePageModule)
  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./pages/password-recovery/password-recovery.module').then( m => m.PasswordRecoveryPageModule)
  },
  {
    path: 'two-part-auth/:id',
    loadChildren: () => import('./pages/two-part-auth/two-part-auth.module').then( m => m.TwoPartAuthPageModule)
  },
  {
    path: 'file-upload', component:FileUploadComponent
  },
  {
    path:'adopt-list', component:AdoptCarrouselComponent
  },
  {
    path:'adopt-info', component:AdoptInfoComponent
  },
  {
    path:'associated-start', component:AssociatedStartComponent
  },
  {
    path:'client-start', component:ClientStartComponent
  },
  {
    path:'history', component:HistoryComponent
  },
  {
    path:'map', component:MapComponent
  },
  {
    path:'menu', component:MenuComponent
  },
  {
    path:'service-info', component:ServiceInfoComponent
  },
  {
    path:'service-list', component:ServiceListComponent
  },
  {
    path:'user-pets', component:UserPetsComponent
  },
  {
    path:'allpets', component:AllpetsComponent
  },
  {
    path:'pet-info', component:PetInfoComponent
  },
  {
    path:'create-pet', component:CreteEditPetComponent
  },
  {
    path:'create-qr', component:CreteEditQrComponent
  },
  {
    path:'qr-list', component:QrListComponent
  },
  {
    path:'qr-info', component:QrInfoComponent
  },
  {
    path:'terms', component:UseTermsComponent
  },
  {
    path:'support', component:SupportComponent
  },
  {
    path:'associate-schedules', component:AssociateSchedulesComponent
  },
  {
    path:'activate-2fa', component:ActivateTwofaComponent
  },
  {
    path:'edit-schedule', component:EditSchedulesComponent
  },
  {
    path:'configuration', component:ConfigurationComponent
  },
  {
    path:'select-service', component:SelectServiceComponent
  },
  {
    path:'associate-list', component:AssociateListComponent
  },
  {
    path:'associate-manager', component:AssociateManagerComponent
  },
  {
    path:'review', component:ReviewComponent
  },
  {
    path:'emergency', component:EmergencyComponent
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
