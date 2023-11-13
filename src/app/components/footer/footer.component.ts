import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {
  admin=false
  token:any
  result:any
  timer: any;
duration: number = 3000;
  constructor(private router:Router) { }

  ngOnInit() {
    this.token= localStorage.getItem("token")
  this.result = JSON.parse(this.token)
  
   console.log(this.result.rol)
   if(this.result.rol=="Admin"){
    
    this.admin=true
   }
  }
  emergency(){
    this.router.navigate([`/mapa`])
  }
  aport(){
    this.router.navigate([`/contribution`])
  }
  home(){
    this.router.navigate([`/client-start`])
  }
  homeAdmin(){
    this.router.navigate([`/associated-start`])
  }
  adopt(){
    console.log("AAAAAAAAAAAAAAAAAAAAAA")
    this.router.navigate([`/adopt-list`])
  }
  startTimer() {
    this.timer = setTimeout(() => {
      console.log('Hola mundo ahtsfdgahsidsafvgbhn')
    }, this.duration);
  }
  private pressTimeout: any;
  
  onButtonDown() {
    this.pressTimeout = setTimeout(() => {
      this.realizarAccion();
    }, 3000); // 3 segundos
  }

  onButtonUp() {
    clearTimeout(this.pressTimeout);
  }

  realizarAccion() {
    console.log('Acción realizada después de 3 segundos de presionar el botón.');
    // Aquí puedes realizar la acción que deseas después de 3 segundos.
  }
  
}
