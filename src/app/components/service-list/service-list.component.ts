import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent  implements OnInit {
  items=[{name:'Clinica1',type:'Clinica',sponsored:true},
  {name:'Petshop1',type:'Petshop',sponsored:true},
  {name:'Adiestramiento1',type:'Adiestramiento',sponsored:false},
  {name:'Peluqueria1',type:'Peluqueria',sponsored:true},
  {name:'Clinica2',type:'Clinica',sponsored:false},
  {name:'Peluqueria2',type:'Peluqueria',sponsored:false},
  {name:'Clinica2',type:'Clinica',sponsored:false},
  {name:'Petshop1',type:'Petshop',sponsored:true},
  {name:'Hospedaje1',type:'Hospedaje',sponsored:true},
  {name:'Hospedaje2',type:'Hospedaje',sponsored:false},
  {name:'Clinica3',type:'Clinica',sponsored:false},
  {name:'Petshop3',type:'Petshop',sponsored:true},
  {name:'Adiestramiento2',type:'Adiestramiento',sponsored:true},
  {name:'Petshop4',type:'Petshop',sponsored:false},
  {name:'Petshop5',type:'Petshop',sponsored:false},
  {name:'Peluqueria3',type:'Peluqueria',sponsored:true},
  {name:'Clinica4',type:'Clinica',sponsored:false},
  {name:'Clinica5',type:'Clinica',sponsored:true}]
  more=false
  services=this.items
  results= this.items
  patrocinado=false
  constructor(private service:ApiService,private router:Router) { }


  ngOnInit() {
    this.results=this.listPatron(this.items)
    // this.generateItems()
     try{
       this.service.getServices().subscribe((res:any)=>{
         this.services=res
         this.results=res
         console.log(this.results)
         console.log(this.services)
       })
     }catch(error){
       console.log(error,"asdhgfsadhgsa")
     }
  }

  back(){
    this.router.navigate([`/start`])
  }
  home(){
    this.router.navigate([`/start`])
  }
  emergency(){
    this.router.navigate([`/mapa`])
  }
  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    console.log(event.target.value.toLowerCase())
    this.results = this.services.filter((d:any) => d.name.toLowerCase().indexOf(query) > -1);
  }
  filters(){
    if(!this.more){
      this.more=true
    }
    else{
      this.more=false
    }
  }
  chips(type:any){
    
    switch (type) {
      case "Clinica":
        this.results= this.listPatron(this.services.filter(ser=>ser.type=='Clinica'))
        
        break;
      case "Petshop":
        this.results= this.listPatron(this.services.filter(ser=>ser.type=='Petshop'))
        break;
      case "Hospedaje":
        this.results= this.listPatron(this.services.filter(ser=>ser.type=='Hospedaje'))
        break;
      case "Adiestramiento":
        this.results= 
        this.listPatron(this.services.filter(ser=>ser.type=='Adiestramiento'))
        break;
      case "Peluqueria":
        this.results= this.listPatron(this.services.filter(ser=>ser.type=='Peluqueria'))
        break;
    }
  }
  private generateItems() {
    console.log("asdsadasdsa")
    const count = this.items.length + 1;
    for (let i = 0; i < 5; i++) {
      this.items.push({name:'Clinica5',type:'Clinica',sponsored:true} );
    }
  }

  onIonInfinite(ev:any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  hola(){
    console.log("Hola Mundo")
  }
 
  listPatron(items:any){
    const patron = items.filter((item:any)=>item.sponsored==true)
    const nopatron = items.filter((item:any)=>item.sponsored==false)
    const final = [...patron, ...nopatron];
    return final
  }
}
