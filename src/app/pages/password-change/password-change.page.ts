import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.page.html',
  styleUrls: ['./password-change.page.scss'],
})
export class PasswordChangePage implements OnInit {
  password: string = '';
  showPassword: boolean = false;
  volver='<Volver'
  confirmPassword: string = '';
  confirmShowPassword: boolean = false;
  idUser:string=''
  validPas=true
  validConfirmPas=true
  validMatch=true
  validForm=true
  constructor(private activatedRoute:ActivatedRoute,private service:AuthService,private router:Router) {
    this.activatedRoute.paramMap.subscribe(
      (data:any)=> {
        this.idUser=data.params.id;
        console.log(this.idUser,"ChangePass")
      }
    )
   }

  ngOnInit() {
    
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  confirmTogglePassword() {
    this.confirmShowPassword = !this.confirmShowPassword;
  }
  validarPas(event:any){
    this.validForm=true
    this.validMatch=true
    console.log(event.target.value)

    this.validPas =this.validarContrasena(event.target.value)
  }
  validarCofirmPas(event:any){
    this.validMatch=true
    this.validForm=true
    console.log(event.target.value)

    this.validConfirmPas =this.validarContrasena(event.target.value)
  }
  validarContrasena(pass:string): boolean {
    const passwordPattern: RegExp =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,15}$/;
    return passwordPattern.test(pass);
  }
  confirm(){
    if(this.password=='' || this.confirmPassword==''){
      this.validForm=false
    }else{
      if(this.validPas==false || this.validConfirmPas==false){
        this.validForm=false
      }else{
        var match=this.match()
        if(match==false ){
          this.validMatch=false
        }else{
          var pas={
            password:this.password,
            confirmPassword:this.confirmPassword
          }
          this.service.postResetPassword(pas,this.idUser).subscribe((res:any)=>{
            if(res.email==''){
              console.log('vacio')
            }else{
              
              this.router.navigate([``])
            }
          })
        }
      }
    }

  }
  match() :boolean{
    if(this.confirmPassword==this.password){
      return true
    }else{
      return false
    }
  }
}
