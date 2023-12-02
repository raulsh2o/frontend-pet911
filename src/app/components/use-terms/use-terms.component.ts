import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-use-terms',
  templateUrl: './use-terms.component.html',
  styleUrls: ['./use-terms.component.scss'],
})
export class UseTermsComponent  implements OnInit {

  constructor(private authService:AuthService, private router:Router, private storage:Storage) { }

  ngOnInit() {}

  acept(){
/*     var gettos={
      email:"raulsh2o@gmail.com",
    }
     this.authService.postTos(gettos).subscribe((res:any)=>{
    })
    this.router.navigate([`client-start`]); */

    this.storage.create().then(() => {
      console.log('Base de datos creada');
      this.storage.get('client_email').then((value) => {
        console.log('Valor recuperado:', value);
        var gettos={
          email:value,
        }
        this.authService.postTos(gettos).subscribe((res:any)=>{
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
