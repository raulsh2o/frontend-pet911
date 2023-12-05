import { Component, OnInit, ElementRef, ViewChild   } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-client-start',
  templateUrl: './client-start.component.html',
  styleUrls: ['./client-start.component.scss'],
})
export class ClientStartComponent  implements OnInit {
  pets: any[] = [];

  espera=[{name:'perro1',service:'peluqeuria1',state:"Listo"},
  {name:'perro2',service:'clinica1',state:"En espera"},
  {name:'perro3',service:'peluqeuria2',state:"Listo pararetirar"},]

 private _hubConnection: HubConnection | any;
  showimage: boolean=false;
  signaldata: any[]=[];
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
      for (var i=0; i<res.length; i++){
        var pet = {
          name: res[i].name,
          age: res[i].age,
          race: res[i].race,
          sex: res[i].sex,
          allergies: res[i].allergies
        }
        this.pets.push(pet);
      }
    })
/*     this.service.getServices().subscribe((res:any)=>{
      console.log(res[0])
    }) */
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
  menu(){
    this.router.navigate([`/menu`])
  }
  services(tipo: string){
    console.log('Tipo de servicio:', tipo);
    this.router.navigate([`service-list`, { tipoServicio: tipo }])
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
