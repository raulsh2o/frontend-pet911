import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-two-part-auth',
  templateUrl: './two-part-auth.page.html',
  styleUrls: ['./two-part-auth.page.scss'],
})
export class TwoPartAuthPage implements OnInit {
  
  oldCode = localStorage.getItem('code') 
  codetries:any
  volver='<Volver'
  randomNumber:string=''
  inputFinal:string=''
  inputNumber1: any
  inputNumber2: any
  inputNumber3: any
  inputNumber4: any
  inputNumber5: any
  inputNumber6: any
  idUser:string=''
  validForm=true
  validCode=true
    maxLimit=1
  constructor(private service:ApiService,private router:Router,private activatedRoute:ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(
      (data:any)=> {
        this.idUser=data.params.id;
        console.log(this.idUser,"TwoAuth")
      }
    )
   }
  
    ngOnInit() {
      
      // if(this.oldCode==null){
      //   this.generateRandomNumber()
      //   var codeLocal={
      //     code:this.randomNumber,
      //     tries:0
      //   }
      //   localStorage.setItem('code',JSON.stringify(codeLocal))
      //   this.codetries=codeLocal
      //   var sendcode={
      //     email:this.randomNumber
      //   }
      //   this.service.postSendCode(sendcode,this.idUser).subscribe((res:any)=>{
      //     if(res.email==''){
      //       console.log('vacio')
      //     }else{
            
      //       console.log('Se ha cambiado')
      //     }
      //   })
      // }else{
      //    this.codetries= JSON.parse(this.oldCode)
      //   console.log(this.codetries,"asdadas")
      //   //localStorage.setItem('code',this.randomNumber)
      // }
      
  
      // this.deleteCode()
    }
    generateRandomNumber() {
      const min = 100000;
      const max = 999999;
      this.randomNumber = String(Math.floor(Math.random() * (max - min + 1)) + min);
      console.log(this.randomNumber)
      
    }
    verify(){
      if(this.inputFinal==this.codetries.code){
        
        this.router.navigate([`/password-change/`+this.idUser])
        console.log("Iguales")
      }else{
        if(this.codetries.tries==4){
          localStorage.removeItem('code')
         this.validCode = false
         this.validForm=true
        }else{
          
          this.codetries.tries = this.codetries.tries+1
          localStorage.setItem('code',JSON.stringify(this.codetries))
        }
        this.validForm=false
      }
    }
    move(event:any,p:any,c:any,n:any,){
      this.validForm=true
      var length =c.value.length
      var maxlen = this.maxLimit
      if(length==maxlen){
        if(n!=''){
          
        n.focus()
        }
      }
      if(event.key==='Backspace'){
        if(p!=""){
          
        p.focus();
        }
      }
  
    }
    limit() {
      this.inputFinal=this.inputNumber1+this.inputNumber2+this.inputNumber3+this.inputNumber4+this.inputNumber5+this.inputNumber6
      setTimeout(() => {
       this.verify()
      }, 500);
    }
    deleteCode() {
      setTimeout(() => {
        this.randomNumber = '';
        localStorage.removeItem('code')
        this.validForm=true
        this.validCode=false
      }, 36000);
    }
}
