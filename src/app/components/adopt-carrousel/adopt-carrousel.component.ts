import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-adopt-carrousel',
  templateUrl: './adopt-carrousel.component.html',
  styleUrls: ['./adopt-carrousel.component.scss'],
})
export class AdoptCarrouselComponent  implements OnInit {

  items=[{name:'Perro1',type:'Perro', age:'5 anios',description:'Sin vacunar',currentIndex:0,images:[
    '../../../assets/pruebas/perroCaja.png',
    '../../../assets/pruebas/perroCeleste.png',
    '../../../assets/pruebas/perroAzul.png',
    // Agrega aquí más imágenes según tus necesidades
  ]},
  {name:'Gato1',type:'Gato',age:'1 anios',description:'Vacunado',currentIndex:0,images:  [
    '../../../assets/pruebas/perroCaja.png',
    '../../../assets/pruebas/perroCeleste.png',
    '../../../assets/pruebas/perroAzul.png',
    // Agrega aquí más imágenes según tus necesidades
  ]},
  {name:'Perro2',type:'Perro',age:'2 anios',description:'Vacunado',currentIndex:0,images:[
    '../../../assets/pruebas/perroCaja.png',
    '../../../assets/pruebas/perroCeleste.png',
    '../../../assets/pruebas/perroAzul.png',
    // Agrega aquí más imágenes según tus necesidades
  ]},
  {name:'Gato2',type:'Gato',age:'3 anios',description:'Sin vacunar',currentIndex:0,images: [
    '../../../assets/pruebas/perroCaja.png',
    '../../../assets/pruebas/perroCeleste.png',
    '../../../assets/pruebas/perroAzul.png',
    // Agrega aquí más imágenes según tus necesidades
  ]},
]
pets: any[] = [];
pets_filtered: any[] = [];
  constructor(private router:Router, private service:ApiService) { }
  results=this.items
ngOnInit() {}
ionViewWillEnter() {
    this.service.getAdoptList().subscribe((res:any)=>{
      console.log(res[0])
      this.pets = [];
      for (var i=0; i<res.length; i++){
        var pet = {
          name: res[i].Name,
          age: res[i].Age,
          race: res[i].Race,
          sex: res[i].Sex,
          allergies: res[i].Allergies,
          description: res[i].Notes,
          image: res[i].Image,
          type: res[i].Type
        }
        this.pets.push(pet);
      }
      this.pets_filtered = this.pets;
      console.log(this.pets)
    })
  }
  emergency(){
    this.router.navigate([`/mapa`])
  }
  home(){
    this.router.navigate([`/start`])
  }
  nextSlide(pet:any) {
    pet.currentIndex = (pet.currentIndex + 1) % pet.images.length
    console.log(pet.currentIndex+1)
    console.log(pet.images)
  }

  previousSlide(pet:any) {
    pet.currentIndex = (pet.currentIndex - 1 + pet.images.length) % pet.images.length;
    console.log(pet.currentIndex)
  }
  info(name: string, age: string, sex: string, race: string, description: string){
    this.router.navigate([`/adopt-info`, { name: name, age: age, sex: sex, race: race, description: description}])
  }
 
  filter(type:any){
    if(type=='Gato'){

      this.pets_filtered = this.pets.filter(pet=>pet.type=='Gato')

    }else if(type=='Perro'){

      this.pets_filtered = this.pets.filter(pet=>pet.type== 'Perro')
    }else{
      
    this.pets_filtered=this.pets
    }

  }
}
