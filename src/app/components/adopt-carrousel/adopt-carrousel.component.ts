import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router:Router) { }
  results=this.items

  ngOnInit() {}
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
  info(){
    this.router.navigate([`/adopt-info`])
  }
 
  filter(type:any){
    if(type=='Gato'){

      this.results = this.items.filter(pet=>pet.type=='Gato')

    }else if(type=='Perro'){

      this.results = this.items.filter(pet=>pet.type== 'Perro')
    }else{
      
    this.results=this.items
    }

  }
}
