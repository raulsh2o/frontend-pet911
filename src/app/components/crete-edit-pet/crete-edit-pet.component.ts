import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../services/api.service';
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
  constructor(private router:Router, private storage:Storage, private service:ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tipoServicio = params['tipoServicio']; // Asignación del valor a tipoServicio
      this.petId = params['petId'];
    });
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
        }
        this.service.putPets(pet,this.petId).subscribe((res:any)=>{
        })
        
        //this.router.navigate([`allpets`]);
        
      }).catch(error => {
        console.error('Error al obtener client_email', error);
      });
    }).catch(error => {
      console.error('Error al crear la base de datos', error);
    });
  }
  continue(option:string, name:string, age:string, sex:string, race:string, allergies:string){
    if(option=="photo"){
      this.first=false
      this.second=true
    }else if(option=="info"){
      this.send=true
    }else if(option=="optional"){
      this.third=false
      this.fourth=true
    }else if(option=="end"){
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
}
