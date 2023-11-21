import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
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
  private _hubConnection: HubConnection | any;
  showimage: boolean=false;
  signaldata: any[]=[];
  constructor(private router:Router) { }

  ngOnInit() {
    console.log("entro admin");
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
  hola(){
    this.router.navigate([`/history`])
  }
  notification(){
    console.log("notification")
    this.router.navigate([`/emergency_list`])
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
