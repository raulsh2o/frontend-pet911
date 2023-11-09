import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FileUploadModule} from './components/file-upload/file-upload.module'
import { HttpClientModule } from '@angular/common/http';
import { AdoptCarrouselModule } from './components/adopt-carrousel/adopt-carrousel.module';
import { AdoptInfoModule } from './components/adopt-info/adopt-info.module';
import { AssociatedStartModule } from './components/associated-start/associated-start.module';
import { ClientStartModule } from './components/client-start/client-start.module';
import { HistoryModule } from './components/history/history.module';
import { MapComponentModule } from './components/map/map.module';
import { ServiceInfoModule } from './components/service-info/service-info.module';
import { ServiceListModule } from './components/service-list/service-list.module';
import { MenuModule } from './components/menu/menu.module';
import { AllpetsModule } from './components/allpets/allpets.module';
import { PetInfoModule } from './components/pet-info/pet-info.module';
import { AssociateListModule } from './components/associate-list/associate-list.module';
import { AssociateManagerModule } from './components/associate-manager/associate-manager.module';
import { QrInfoModule } from './components/qr-info/qr-info.module';
import { QrListModule } from './components/qr-list/qr-list.module';
import { CreteEditPetModule } from './components/crete-edit-pet/create-edit-pet.module';
import { CreteEditQrModule } from './components/crete-edit-qr/crete-edit-qr.module';
import { UseTermsModule } from './components/use-terms/use-terms.module';
import { SupportModule } from './components/support/support.module';
import { AssociateSchedulesModule } from './components/associate-schedules/associate-schedules.module';
import { ActivateTwofaModule } from './components/activate-twofa/activate-twofa.module';
import { EditSchedulesModule } from './components/edit-schedules/edit-schedulles.module';
import { ConfigurationModule } from './components/configuration/configuration.module';
import { SelectServiceModule } from './components/select-service/select-service.module';
import { ReviewModule } from './components/review/review.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FileUploadModule,HttpClientModule,AdoptCarrouselModule,AdoptInfoModule,AssociatedStartModule,ClientStartModule,HistoryModule,MapComponentModule,ServiceInfoModule,ServiceListModule,MenuModule,AllpetsModule,PetInfoModule,AssociateListModule,AssociateManagerModule,QrInfoModule,QrListModule,CreteEditPetModule,CreteEditQrModule,UseTermsModule,SupportModule,AssociateSchedulesModule,ActivateTwofaModule,EditSchedulesModule,ConfigurationModule,SelectServiceModule,ReviewModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
