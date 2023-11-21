import { Component, OnInit } from '@angular/core';

import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ActivatedRoute,Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-client-start',
  templateUrl: './client-start.component.html',
  styleUrls: ['./client-start.component.scss'],
})
export class ClientStartComponent  implements OnInit {
  items=[{name:'perro1',age:'5 anios',allergies:"no tiene"},
  {name:'perro2',age:'3 anios',allergies:"si tiene"},
  {name:'perro3',age:'2 anios',allergies:"pescado"}]

  espera=[{name:'perro1',service:'peluqeuria1',state:"Listo"},
  {name:'perro2',service:'clinica1',state:"En espera"},
  {name:'perro3',service:'peluqeuria2',state:"Listo pararetirar"},]

 private _hubConnection: HubConnection | any;
  showimage: boolean=false;
  signaldata: any[]=[];
pets:any
token:any
user:any
name:string=''
mesage:any
  constructor(
    private router:Router,
    private service:ApiService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit() {
    
    this.token= localStorage.getItem('token')
    this.user = JSON.parse(this.token)
    this.name="Juan"
    this.service.getPetByUser(this.user.idUser).subscribe((res:any)=>{
      this.pets=res
      console.log(this.pets)
    })
/*     this._hubConnection = new HubConnectionBuilder().withUrl('http://localhost:5215/notify').build();
    this._hubConnection.start()
    .then(()=>{
       this._hubConnection.invoke('GetConnectionId').then((ConnectionId:any)=>
       console.log(ConnectionId,'hasfdgasfdhag'))
     },
     console.log('connection start'))
     .catch((err: any) => {
      console.error('Error de conexión:', err);
    });
     console.log(this._hubConnection)
     this._hubConnection.on('BroadcastMessage', (message:any)=>{
       this.signaldata.push(message);
       console.log(message)
       this.showimage=true;
     }) */
  }
  emergency(){
    this.router.navigate([`/mapa`])
  }
  services(){
    
    this.router.navigate([`service-list`])
  }
  aport(){
    this.router.navigate([`/qr-list`])
  }
  
  // noti(){
  //   this.service.postMessage(this.user.idUser).subscribe(
  //     data=>{
  //       this.mesage =localStorage.getItem('mesa')
  //       console.log(this.mesage,'xdxdxd')
  //       console.log(data,'fffffff')
  //       this.espera.push({name:'perro3',service:'peluqeuria2',state:"Listo pararetirar"})
  //     }
  //   )
  // }
  addpet(){
    
    this.router.navigate([`/create-pet`])
  }
  allpets(){
    
    this.router.navigate([`/allpets`])
  }
}
