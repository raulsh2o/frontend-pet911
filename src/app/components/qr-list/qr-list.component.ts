import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-qr-list',
  templateUrl: './qr-list.component.html',
  styleUrls: ['./qr-list.component.scss'],
})
export class QrListComponent  implements OnInit {
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
  services=this.items
  results= this.items
  constructor(private router:Router) { }

  ngOnInit() {}
  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    console.log(event.target.value.toLowerCase())
    this.results = this.services.filter((d:any) => d.name.toLowerCase().indexOf(query) > -1);
  }
  createQR(){
    
    this.router.navigate([`/create-qr`])
  }
}
