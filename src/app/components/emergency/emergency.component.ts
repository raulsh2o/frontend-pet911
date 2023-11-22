import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss'],
})
export class EmergencyComponent  implements OnInit {
  mascotas: any[] = [];
  aux_email: string = '';
  constructor(
    private router:Router, 
    private authService:AuthService,
    private storage:Storage
    ) { }

  ngOnInit() {
    this.storage.create().then(() => {
      console.log('Base de datos creada');
      this.storage.get('client_email').then((value) => {
        console.log('Valor recuperado:', value);
        this.aux_email = value;
      }).catch(error => {
        console.error('Error al obtener client_email', error);
      });
    }).catch(error => {
      console.error('Error al crear la base de datos', error);
    });
    this.authService.getAdmins().subscribe((res:any)=>{
      console.log(res)
      for (let i = 0; i < res.length; i++) {
        var admin = {
          nombre: 'Clinica', // Puedes mantener un nombre genérico
          correo: res[i],
          edad: 'Edad', // Puedes mantener una edad genérica
          imagen: '../../../assets/pruebas/gatoAzul.jpg' // Puedes mantener una imagen genérica
        }
        this.mascotas.push(admin);
      }
    })
  }


  back() {
    this.router.navigate([`/`]);
  }
  notify(correo: string){
    const model = { 
      Email_rx: correo,
      Email_tx: this.aux_email
    };
    this.authService.postNotify(model).subscribe((res:any)=>{
      console.log(res)
    })
  }

}
