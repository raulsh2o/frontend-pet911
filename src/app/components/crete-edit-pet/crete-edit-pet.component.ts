import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service';
import { Camera, CameraOptions, PictureSourceType } from '@awesome-cordova-plugins/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@awesome-cordova-plugins/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { ActionSheetController } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-crete-edit-pet',
  templateUrl: './crete-edit-pet.component.html',
  styleUrls: ['./crete-edit-pet.component.scss'],
})
export class CreteEditPetComponent  implements OnInit {
  results=[{name:'Clinica 1',description:'Es la clinica 1',date:'2023-03-03'},{name:'Clinica 2',description:'Es la clinica 2',date:'2023-04-04'},{name:'Clinica 3',description:'Es la clinica 3',date:'2023-05-05'},
  {name:'Clinica 4',description:'Es la clinica 4',date:'2023-06-06'}]
  res=this.results

  first=true
  second=false
  third=false
  fourth=false
  send=false
  name=''
  age=''
  sex=''
  allergies=''
  race=''
  tipoServicio= ""
  petId=''
  imageurl: any;
  securepath: any = window;
  url: any;
  constructor(
    private router:Router, 
    private storage:Storage, 
    private service:ApiService, 
    private route: ActivatedRoute, 
    private actionsheet: ActionSheetController, 
    private camera: Camera, 
    private file: File,
    private imagepicker: ImagePicker, 
    private crop: Crop, 
    private domsanitize: DomSanitizer
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tipoServicio = params['tipoServicio']; // Asignación del valor a tipoServicio
      this.petId = params['petId'];
    });
  }
  chooseFromCamera(sourceType: PictureSourceType){
    const options: CameraOptions = {
       quality: 100,
       mediaType: this.camera.MediaType.PICTURE,
       destinationType: this.camera.DestinationType.FILE_URI,
       encodingType: this.camera.EncodingType.JPEG,
       sourceType: sourceType,
    };

    this.camera.getPicture(options).then((result) => {
      console.log('Camera URL',result);
      // this.imageurl = result;
      this.imageurl = this.securepath.Ionic.WebView.convertFileSrc(result);
    }, error=>{
      console.log('Error CAMERA', error);
    });
  }
  santizeUrl(imageUrl: string){
    return this.domsanitize.bypassSecurityTrustUrl(imageUrl);
  }
 async selectimageOptions(){
    const actionsheet = await this.actionsheet.create({
     header: 'Select image Source',
     buttons: [
       {
         text: 'Select Camera',
         handler: ()=>{
           this.chooseFromCamera(this.camera.PictureSourceType.CAMERA);
           console.log('Camera Selected');
         }
       },
       {
         text: 'Cancel',
         role: 'cancel'
       }
     ]
    });
    await actionsheet.present();
  }
  emergency(){
    this.router.navigate([`/mapa`])
  }
  home(){
    this.router.navigate([`/start`])
  }
  // handleInput(event:any) {
  //   const query = event.target.value.toLowerCase();
  //   console.log(event.target.value.toLowerCase())
  //   this.results = this.services.filter((d:any) => d.name.toLowerCase().indexOf(query) > -1);
  // }
  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    console.log(event.target.value.toLowerCase())
    this.res = this.results.filter((d:any) => d.name.toLowerCase().indexOf(query) > -1);
  }
  filter(Initdate:any,Finaldate:any){
    const initMonth = Initdate.substring(Initdate.length - 2);
    const finalMonth = Finaldate.substring(Finaldate.length - 2);
    this.res=this.results.filter((date:any)=>{
      const dateString = date.date
      const dateObject = new Date(dateString);
      const month = dateObject.getMonth() + 1;
      
      if(month>=parseInt(initMonth, 10)  && month<=parseInt(finalMonth, 10) ){
        
        return date
      }
    })
    console.log(initMonth,finalMonth)
  }
  update(name:string, age:string, sex:string, race:string, allergies:string){
    console.log('update')
    console.log(this.petId)
    this.storage.create().then(() => {
      console.log('Base de datos creada');
      this.storage.get('client_email').then((value) => {
        console.log('Valor recuperado:', value);
        var pet={
          name:name,
          age:age,
          sex:sex,
          race:race,
          allergies:allergies,
          email:value,
          image:this.imageurl,
        }
        this.service.putPets(pet,this.petId).subscribe((res:any)=>{
        })
        setTimeout(() => {
          this.router.navigate(['allpets']);
        }, 1000);
        
      }).catch(error => {
        console.error('Error al obtener client_email', error);
      });
    }).catch(error => {
      console.error('Error al crear la base de datos', error);
    });
  }
  /*
  continue(option:string, name:string, age:string, sex:string, race:string, allergies:string){
    if(option=="photo"){
      this.first=false
      this.second=true
    }else if(option=="info"){
      this.selectimageOptions();
      this.send=true
    }else if(option=="optional"){
      this.third=false
      this.fourth=true
    }else if(option=="end"){
      this.storage.create().then(() => {
        console.log('Base de datos creada');
        this.storage.get('client_email').then((value) => {
          console.log('Valor recuperado:', value);
          const testurl = 'https://www.cuentosyrecetas.com/wp-content/uploads/2018/07/El-gato-con-botas-cuento-corto.jpg';
          const base64Image = this.convertImageUrlToBase64(testurl);
          var pet={
            name:name,
            age:age,
            sex:sex,
            race:race,
            allergies:allergies,
            email:value,
            image:base64Image,
          }
          this.service.postPet(pet).subscribe((res:any)=>{
          })
          this.router.navigate([`client-start`]);
          
        }).catch(error => {
          console.error('Error al obtener client_email', error);
        });
      }).catch(error => {
        console.error('Error al crear la base de datos', error);
      });
    }
    
  
  }
  */
  async continue(option: string, name: string, age: string, sex: string, race: string, allergies: string) {
    if (option === "photo") {
      this.first = false;
      this.second = true;
    } else if (option === "info") {
      this.selectimageOptions();
      this.send = true;
    } else if (option === "optional") {
      this.third = false;
      this.fourth = true;
    } else if (option === "end") {
      try {
        await this.storage.create();
        console.log('Base de datos creada');
        
        const value = await this.storage.get('client_email');
        console.log('Valor recuperado:', value);
  
        const testurl = 'https://www.cuentosyrecetas.com/wp-content/uploads/2018/07/El-gato-con-botas-cuento-corto.jpg';
        const base64Image = await this.convertImageUrlToBase64(this.imageurl);
  
        var pet = {
          name: name,
          age: age,
          sex: sex,
          race: race,
          allergies: allergies,
          email: value,
          image: base64Image,
        };
  
        this.service.postPet(pet).subscribe((res: any) => {
          // Manejar la respuesta del servicio
        });
  
        this.router.navigate([`client-start`]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  back(option:string){
    if(option=="photo"){
      this.first=true
      this.second=false
      this.send=false
    }else if(option=="info"){
      this.second=true
      this.third=false
    }else if(option=="optional"){
      this.third=true
      this.fourth=false
    }
    
  }
  sendToAPI(){
    this.second=false
    this.third=true
    this.send=false
  }
  async convertImageUrlToBase64(imageUrl: string): Promise<string> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const base64Data = await this.blobToBase64(blob);
    return base64Data;
  }

  blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
