import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CreteEditPetComponent } from './crete-edit-pet.component';
import { FooterModule}  from '../footer/footer.module';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { ImagePicker, ImagePickerOptions } from '@awesome-cordova-plugins/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
@NgModule({
    
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [ CommonModule, FormsModule, IonicModule,FooterModule],
  declarations: [CreteEditPetComponent],
  providers: [
    Camera,
    File,
    ImagePicker,
    Crop
    // Otros proveedores aquí...
  ],
})
export class CreteEditPetModule {}
