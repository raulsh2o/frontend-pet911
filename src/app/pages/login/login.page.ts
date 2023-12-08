import { Component, OnInit,Input,NgZone } from '@angular/core';

import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute,Router } from '@angular/router';

//import { CredentialResponse,} from 'google-one-tap';
import { AuthService } from 'src/app/services/auth.service';
//import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';
import { NotificationsService } from '../../services/notifications.service';
import { Storage } from '@ionic/storage';
var emails: { email: any; int: number; }[]=[]
declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private _hubConnection: HubConnection | any;
  showimage: boolean=false;
  signaldata: any[]=[];
  
  @Input() type = 'text'; // set default type be text
  password: string = '';
  showPassword: boolean = false;
  email:string='';
  focused: any;
  ty:boolean = true;
  isLogin=false
  token:any
  limite:number=30
  validCor=true
  validPas=true
  validAuth=true
  message: string='';
  facetoken:any
  model={
    email:'juan',
    password:'perez'
  }
  auth:any = {
    email: '',
    password:''
  }
  lista:any
  constructor(private service:ApiService,private router:Router,private _ngZone:NgZone,private authService:AuthService, private notification:NotificationsService, private storage: Storage) { 
    if(!isPlatform('capacitor')){
    //  GoogleAuth.initialize()
    }
  }

  async signIn(){
  //  var userGoogle = await GoogleAuth.signIn()
   // console.log('Ususario',userGoogle)
   // console.log('Ususario',userGoogle.authentication.idToken)
    this.router.navigate([`/start`])
  //  await this.authService.LoginWithGoogle(userGoogle).subscribe(res=>{
  //     console.log(res)
  //   })
     
  }
  async loginFB() {
    this.router.navigate([`/start`])
    // try{
    //   FB.login(async (result:any) => {
    //     this.facetoken=result.authResponse.accessToken
    //   }, { scope: 'email' });
      
    // this.router.navigate([`/start`])
    // }catch(e){

    // }
    
  }
  async refresh(){
  //  const authCode = await GoogleAuth.refresh()
  //  console.log('refresh',authCode)
  }
  async signOut(){
    
    this.router.navigate([`/service`])
   // await GoogleAuth.signOut()
    
    
  }
  logout(){
    this.authService.signOutExternal();
    this._ngZone.run(()=>{
      this.router.navigate(['/']).then(()=>window.location.reload());
    })
  }
  ngOnInit() {
    
// // @ts-ignore
// window.onGoogleLibraryLoad = () => {
//   // @ts-ignore
//   google.accounts.id.initialize({
//     client_id: '39267857682-nenk0jrht7o5u4gvn9ua206jrldinuie.apps.googleusercontent.com',
//     callback: this.handleCredentialResponse.bind(this),
//     auto_select: false,
//     cancel_on_tap_outside: true
//   });
//   // @ts-ignore
//   google.accounts.id.renderButton(
//   // @ts-ignore
//   document.getElementById("buttonDiv"),
//     { size: "large", width: "100%",height:'100%' } 
//   );
//   // @ts-ignore
//   google.accounts.id.prompt((notification: PromptMomentNotification) => {});
// };
  }
  // logGoogle(){
  //   this.googlePlus.login({})
  // .then(res => console.log(res))
  // .catch(err => console.error(err));
  // }
//   async handleCredentialResponse(response: CredentialResponse) {
//     console.log(response)
//     await this.authService.LoginWithGoogle(response.credential).subscribe(
//       (x:any) => {
//         this._ngZone.run(() => {
//           this.router.navigate(['/logout']);
//         })},
//       (error:any) => {
//           console.log(error);
//         }
//       );  
// }

  login(){
    this.createReminder()
    this.auth.password=this.password
    this.auth.email=this.email
    this.storage.create().then(() => {
      console.log('Base de datos creada');
      this.storage.set('client_email', this.email);
    }).catch(error => {
      console.error('Error al crear la base de datos', error);
    });
    console.log(this.auth)
    if(this.auth.password == '' || this.auth.email=='' ){
      this.validAuth=false
      console.log('Llene todos los campos')
    }else{
      if(this.validPas==false || this.validCor==false){
        
      this.validAuth=false
      }
      this.validAuth=true
      try{
        this.authService.postLogin(this.auth).subscribe((res:any)=>{
          console.log(res)
          if(res==null){
            this.validPas=false
          }else{
            this.validPas=true
           this.token=res
            this.lista = localStorage.getItem('emails') 
            localStorage.setItem('token',JSON.stringify(this.token))
            if(this.lista==null){
              emails.push({email:this.auth.email,int:1})
              localStorage.setItem('emails',JSON.stringify(emails))
            }else{
              emails = JSON.parse(this.lista)
              if(emails.length<4){
                emails.push({email:this.auth.email,int:1})
                localStorage.setItem('emails',JSON.stringify(emails))
              }else{
                console.log('No mas emails')
              }
            }
            this.initSesion()
            console.log(res.rol)
            if(res.rol=="Admin"){
              
            this.router.navigate([`/associated-start`])
            }else{

              this.router.navigate([`/client-start`])
            }
          }
        })
      }catch(e){
        console.log(e)
      }
      
    }
   
  }
  createReminder(): void {
    console.log('Entró en las notificaciones');
    const now = new Date();
    const secondsLater = new Date(now.getTime() + 2000); // Añade 2000 milisegundos (2 segundos) al tiempo actual
    
    this.notification.showLocalNotification(
      'Hola',
      'Raul',
      secondsLater // Usa la hora actual más 2 segundos
    );
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  ir(){
    
    this.router.navigate([`/start`])
  }
/*   initSesion(){

  } */
  emailChange(event:any){
    this.validCor=true
    this.validPas=true
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
    this.validAuth=true
    console.log(
      this.validarCorreoElectronico(event.target.value))

    this.validCor =this.validarCorreoElectronico(event.target.value)
  }
  validarPas(event:any){
    this.validAuth=true
    console.log(this.validarContrasena( event.target.value))

    this.validPas =this.validarContrasena(event.target.value)
  }
  validarCorreoElectronico(email: string): boolean {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  validarContrasena(pass:string): boolean {
    const passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,15}$/;
    
    return passwordPattern.test(pass);
  }
  showMessageWithTimeout() {
    this.message = 'Este texto se eliminará después de 5 segundos';

    setTimeout(() => {
      this.message = '';
    }, 5000);
  }
    initSesion(){
/*      this._hubConnection = new HubConnectionBuilder().withUrl('https://localhost:7001/notify').build();
     this._hubConnection.start()
      .then(()=>{
       this._hubConnection.invoke('GetConnectionId').then((ConnectionId:any)=>{
        var session={
           id: ConnectionId,
           email:this.email
         }
          this.authService.postSession(session).subscribe((res:any)=>{
          
            localStorage.setItem('session',res.id)
            console.log(res)
          })
         console.log(ConnectionId,'ahfsdtagshdgjsah')
       }
       )
      
     },
     console.log('connection start'))
     .catch((err:any)=>{
       console.log('Error while establishing the connection')
     });
     console.log(this._hubConnection)
     this._hubConnection.on('BroadcastMessage', (message:any)=>{
       this.signaldata.push(message);
       this.showimage=true;
     })   */
     //get session
     var getsession={
      email:this.email
    }
     this.authService.getSession(getsession).subscribe((res:any)=>{
      localStorage.setItem('session',res.id)
       if (res != ''){
        this.authService.deleteSession(res).subscribe((res:any)=>{
          localStorage.setItem('session',res.id)
          })
        } 
    })
     //create connection
    this._hubConnection = new HubConnectionBuilder().withUrl('http://localhost:5215/notify').build();
    this._hubConnection.start()
    .then(()=>{
       this._hubConnection.invoke('GetConnectionId').then((ConnectionId:any)=>{
        var session={
          id: ConnectionId,
          email:this.email
        }
         this.authService.postSession(session).subscribe((res:any)=>{
         
           localStorage.setItem('session',res.id)
           console.log(res)
         })
        console.log(ConnectionId,'ahfsdtagshdgjsah')
      })
     },
     console.log('connection start'))
     .catch((err: any) => {
      console.error('Error de conexión:', err);
    });
     console.log(this._hubConnection)
     this._hubConnection.on('BroadcastMessage', (message:any)=>{
       this.signaldata.push(message);
       console.log(message);
       if (this.email === message.email_rx){
        console.log("crea notificacion!")
        this.createReminder()
       }
       this.showimage=true;
     })
   }

}
