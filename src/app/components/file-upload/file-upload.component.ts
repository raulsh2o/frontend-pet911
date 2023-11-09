import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, Photo,CameraSource } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
	name: string;
	path: string;
	data: string;
}
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent  implements OnInit {
  images:LocalFile[] =[]
  admin=true
  upload=false
  camera=true
  send=false
  constructor(private router:Router,private platform:Platform,private load:LoadingController) { }

  ngOnInit() {
    this.loadFiles()
    this.deleteAllImage()
  }

  back(){
    this.deleteImage()
    this.router.navigate([`/header`])
    
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      
    });
    console.log(image)
   
    if(image){
      this.saveImage(image)
    }
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    this.upload=true

  
  };
  async saveImage(photo:Photo){
    const base64Data = await this.readAsBase64Data(photo)
    const filename = new Date().getTime()+'.jpeg';
    const savedFile = await Filesystem.writeFile({
      directory:Directory.Data,
      path: `${IMAGE_DIR}/${filename}`,
      data: base64Data as string
    })
    
    this.loadFiles()
  }


  async readAsBase64Data(photo:Photo){
    if(this.platform.is('hybrid')){
      const file = await Filesystem.readFile({
        path: photo.path!
      });
      return file.data
    }
    else{
      const response = await fetch(photo.webPath!);
      const bloc = await response.blob();
      return await this.convertBlobToBase64(bloc)
    }
  }
  convertBlobToBase64 = (blob:Blob)=> new Promise((resolve,reject)=>{
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = ()=>{
      resolve(reader.result);
    }
    reader.readAsDataURL(blob)
  })

  
  async loadFiles(){
    this.images =[]
    const loading = await this.load.create({
      message:'Cargando imagen...',
    })
    await loading.present()

    Filesystem.readdir({
      directory:Directory.Data,
      path:IMAGE_DIR
    }).then((result:any)=>{
      console.log('Aqui', result)
      this.loadFileData(result.files)
    },async err=>{
      console.log('err',err)
      await Filesystem.mkdir({
        directory:Directory.Data,
        path:IMAGE_DIR
      })
    }).then(_=>{
      loading.dismiss()
    })
  }
  async loadFileData(filenames:any){
    for(let f of filenames){
      console.log('REad',f.name)
      const filePath = `${IMAGE_DIR}/${f.name}`
       const readFile = await Filesystem.readFile({
         directory:Directory.Data,
        path:filePath
      });
       this.images.push({
         name:f,
         path:filePath,
         data:`data:image/jpeg;base64,${readFile.data}`
       })
    }
  }
  sendToAPI(){
    this.deleteImage()
    this.upload=false
    this.send=true
  }
  cancel(){
    this.deleteImage()
    this.send=false
    this.upload=false
  }
  async deleteImage(){
    await Filesystem.deleteFile({
      directory:Directory.Data,
      path:this.images[0].path
    })
    
  }
  async deleteAllImage(){
    for(let f of this.images){
      await Filesystem.deleteFile({
        directory:Directory.Data,
        path:f.path
      })
    }
    
    
  }
}
