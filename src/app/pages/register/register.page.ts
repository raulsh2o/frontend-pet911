import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  password: string = '';
  showPassword: boolean = false;
  confirmPassword: string = '';
  confirmShowPassword: boolean = false;
  email:string=''
  name:string=''
  model={
    email:"",
    password:"",
    confirmPassword:'',
    name:'',
    birthdate:'',
    gender:''
  }
  currentDate= new Date()
  maxDate="2100-01-01"
  minDate='1900-01-01'
  limite:number=30
  maxName=50
  minName=3
  validCor=true
  validPas=true
  validConfirmPas=true
  validName=true
  validMatch=true
  validForm=true
  validGen=true
  fechaSeleccionada: string='2023-01-01';
  validALL=false
  genSelec: string='Genero';
  opcionesGen: string[] = ["Hombre","Mujer","Otro"];
  constructor(private service:AuthService,private router:Router) { }

  ngOnInit() {
  }
  onFechaSeleccionada(event: any) {
    // Acciones que deseas realizar cuando se selecciona una fecha
    console.log('Fecha seleccionada:', this.fechaSeleccionada);
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  confirmTogglePassword() {
    this.confirmShowPassword = !this.confirmShowPassword;
  }
  continue(){
    if(this.email=='' || this.password==''|| this.confirmPassword==''){
      this.validForm=false
      console.log('mal')
    }else{
      if( this.validCor == false || this.validPas == false || this.validConfirmPas==false){
          
        this.validForm=false
          }
          else{
            var passMatch =this.match()
            if(!passMatch){
              this.validMatch=false
            }else{
             this.validMatch=true
            this.validALL=true
            }
          }

     
    }
    
  }
  register(){
    this.model.email=this.email
    this.model.password=this.password
    this.model.confirmPassword=this.confirmPassword
    this.model.name=this.name
    this.model.birthdate=this.fechaSeleccionada
    this.model.gender=this.genSelec
    if(this.model.email=='' || this.model.password==''||this.model.confirmPassword==''||this.model.name=='' || this.model.birthdate==''){
      this.validForm=false
    }else{
      if(  this.validName == false || this.validGen==false){
          
        this.validForm=false
        
          }else{
            
            this.service.postRegister(this.model).subscribe((res:any)=>{
              if(res.email==''){
                
                console.log('vacio')
              }else{
                console.log(res)
                const tokenModel={
                  idUser:res.id,
                  idToken:"12134"
                }
                this.service.postNoti(tokenModel).subscribe((res:any)=>{
                  console.log("Se registro el token")
                })
                this.router.navigate([`/terms`])
                console.log('Se ha registrado correctamente')
              }
            })
          }
      
    }
    
  }
  checkmail(){
    var formEmail = {email:this.email}
    this.service.postCheckUser(formEmail).subscribe((res:any)=>{
      if(res==null){
        console.log('Vale')
      }else{
        
        console.log('no vale')
        this.validALL=false
        this.validCor=false
      }
      // if(res.email==''){
      //   console.log('vacio')
      // }else{

      //   console.log('Se ha registrado correctamente')
      // }
    })
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
  validarCor(event:any){
    this.validForm=true
    console.log(
      this.validarCorreoElectronico(event.target.value))

    this.validCor =this.validarCorreoElectronico(event.target.value)
    this.checkmail()
  }
  validarPas(event:any){
    this.validForm=true
    console.log(event.target.value)

    this.validPas =this.validarContrasena(event.target.value)
  }
  validarCofirmPas(event:any){
    this.validForm=true
    console.log(event.target.value)

    this.validConfirmPas =this.validarContrasena(event.target.value)
  }
  validarName(event:any){
    this.validForm=true
    console.log(event.target.value,this.validName)

    this.validName =this.validarNombre(event.target.value)
  }
  validarCorreoElectronico(email: string): boolean {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  validarContrasena(pass:string): boolean {
    const passwordPattern: RegExp =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,15}$/;
    return passwordPattern.test(pass);
  }
  validarNombre(name:string): boolean {
    const passwordPattern: RegExp =/^(?=.*[A-Za-z]){3,50}/;
    return passwordPattern.test(name);
  }
  validarSelect(event: Event){
    const elementoSeleccionado = event.target as HTMLSelectElement;
    this.genSelec = elementoSeleccionado.value;
    
    console.log(this.genSelec,"asdsadsa");
    if(this.genSelec==''){
      
    console.log(this.genSelec,"aaaaa");
      this.validGen=false
    }else{

      this.validForm=true
      this.validGen=true
    }
     
    
  }
  validDate(event:any){
    console.log(event.target.value)
  }
  match() :boolean{
    if(this.confirmPassword==this.password){
      return true
    }else{
      return false
    }
  }
}
