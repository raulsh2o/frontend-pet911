import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-emergency-list',
  templateUrl: './emergency-list.component.html',
  styleUrls: ['./emergency-list.component.scss'],
})
export class EmergencyListComponent  implements OnInit {
  clients: any[] = [];
  constructor(
    private router:Router, 
    private authService:AuthService,
  ) { }

  ngOnInit() {
    this.authService.getClients().subscribe((res:any)=>{
      console.log(res)
      for (let i = 0; i < res.length; i++) {
        var admin = {
          nombre: 'Cliente', // Puedes mantener un nombre genérico
          correo: res[i],
          edad: 'Edad', // Puedes mantener una edad genérica
          imagen: '../../../assets/pruebas/gatoAzul.jpg' // Puedes mantener una imagen genérica
        }
        this.clients.push(admin);
      }
    })
  }

  back() {
    this.router.navigate([`/`]);
  }

  notify(correo: string){
    const model = { Email: correo };
    console.log(correo)
/*     this.authService.postNotify(model).subscribe((res:any)=>{
      console.log(res)
    }) */
  }

}
