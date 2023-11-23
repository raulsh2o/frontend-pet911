import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageServiceService } from '../../services/message-service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-emergency-list',
  templateUrl: './emergency-list.component.html',
  styleUrls: ['./emergency-list.component.scss'],
})
export class EmergencyListComponent  implements OnInit {
  aux_email: string = '';
  clients: any[] = [];
  constructor(
    private router:Router, 
    private authService:AuthService,
    private messageService: MessageServiceService,
    private storage:Storage
  ) { }

  ngOnInit() {
    this.storage.create().then(() => {
      console.log('Base de datos creada');
      this.storage.get('client_email').then((value) => {
        console.log('Valor recuperado:', value);
        this.aux_email = value;
        const model = { 
          Email_rx: value,
          Email_tx: ''
        };
        this.authService.postSMSNotification(model).subscribe((res:any)=>{
          console.log(res[0])
          for (var i=0; i<res.length; i++){
            var admin = {
              nombre: 'Cliente', // Puedes mantener un nombre genérico
              correo: res[i],
              mensaje: 'mensaje de emergencia!', // Puedes mantener una edad genérica
              imagen: '../../../assets/pruebas/gatoAzul.jpg' // Puedes mantener una imagen genérica
            }
            this.clients.push(admin);
          }
        })
      }).catch(error => {
        console.error('Error al obtener client_email', error);
      });
    }).catch(error => {
      console.error('Error al crear la base de datos', error);
    });
  }

  back() {
    this.router.navigate([`/`]);
  }

  notify(correo: string){
    console.log(this.aux_email, correo);
    const model = { 
      Email_rx: correo,
      Email_tx: this.aux_email
    };
    this.authService.postNotifyConfirm(model).subscribe((res:any)=>{
      console.log(res)
    })
  }

}
