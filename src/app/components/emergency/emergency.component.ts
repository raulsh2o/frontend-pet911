import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss'],
})
export class EmergencyComponent  implements OnInit {
  mascotas: any[] = [];
  constructor(
    private router:Router, 
    private authService:AuthService
    ) { }

  ngOnInit() {
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
  notify(){
    
    this.authService.getNotify().subscribe((res:any)=>{
      console.log(res)
    })
  }

}
