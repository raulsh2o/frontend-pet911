import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {

  volver='<Volver'
  limite:number=30
  validCor=true
  validAuth=true
  validBaseCor=true
  email:string='';
  constructor(private service:AuthService) { }

  ngOnInit() {
  }
  enviarCorreo() {
    
    if(this.email==""){
      
      this.validAuth=false
    }else{
      if(this.validCor==false){
        
      this.validAuth=false
      }else{
        
        var formEmail = {email:this.email}
        this.service.postCheckUser(formEmail).subscribe((res:any)=>{
          if(res==null){
            console.log('No existe')
            
            this.validBaseCor=false   
          }else{
            console.log('Si existe')
            this.service.postRecoverPassword(formEmail).subscribe((res:any)=>{
              console.log(res)
            })
            this.validAuth=true
            
          }
          
        })
      }
      
    }
   
  }
  validarCor(event:any){
    this.validAuth=true
    
    this.validBaseCor=true
    console.log(
      this.validarCorreoElectronico(event.target.value))

    this.validCor =this.validarCorreoElectronico(event.target.value)
  }
  validarCorreoElectronico(email: string): boolean {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  emailChange(event:any){
    if (event.target.value.length ==30) {
      this.limite=31 
      if(event.target.value.slice(-1)=='@'){
        this.limite=50
        console.log('adios:');
      }else{
        event.target.value= event.target.value.slice(0,-1)
        console.log('sadjabs:');
        this.limite=30
      }
      const parteLocal = this.email.split('@')[0];
      //if (parteLocal.length > limiteCaracteres) {
     //   this.email = parteLocal.substr(0, limiteCaracteres) + '@' + this.email.split('@')[1];
     // }
    }
    console.log('Nuevo valor:', event.target.value.length);
  }
}
