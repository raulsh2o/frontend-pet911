import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-associated-start',
  templateUrl: './associated-start.component.html',
  styleUrls: ['./associated-start.component.scss'],
})
export class AssociatedStartComponent  implements OnInit {
  items=[{name:'perro1',age:'5 anios',type:"Pequeno",emergenc:'Emergencia critica'},
  {name:'perro2',age:'2 anios',type:"Grande",emergenc:'Emergencia moderada'},
  {name:'perro3',age:'1 anios',type:"Mediano",emergenc:'Emergencia moderada'},]

  espera=[{name:'perro4',service:'peluqeuria1',state:"Listo pararetirar"},
  {name:'perro5',service:'clinica1',state:"En espera"},
  {name:'perro6',service:'peluqeuria2',state:"Listo para retirar"},]

  constructor(private router:Router) { }

  ngOnInit() {}
  hola(){
    this.router.navigate([`/history`])
  }
  cancel(name:any){
    this.items = this.items.filter(pet=>pet.name !=name)
  }
  confirm(name:any){
    var item = this.items.find(pet=>pet.name==name)
    
    this.items = this.items.filter(pet=>pet.name !=name)
    var newEspera:any= {name:item?.name,service:'clinica2',state:'En espera'}
    this.espera.push(newEspera)
  }
}
