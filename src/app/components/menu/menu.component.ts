import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  associate=false;
  token:any
  user:any
  name:string=''
  email:string=''
  constructor(private router:Router, private route: ActivatedRoute, private storage:Storage) { }

  ngOnInit() {
    this.token= localStorage.getItem('token')
    this.user = JSON.parse(this.token)
    this.name=this.user.name;
    
    this.storage.create().then(() => {
      console.log('Base de datos creada');
      this.storage.get('client_email').then((value) => {
        console.log('Valor recuperado:', value);
        this.email=value;
      }).catch(error => {
        console.error('Error al obtener client_email', error);
      });
    }).catch(error => {
      console.error('Error al crear la base de datos', error);
    });
  }
  next(ruta:string){
    this.router.navigate([`/${ruta}`])
  }

}
