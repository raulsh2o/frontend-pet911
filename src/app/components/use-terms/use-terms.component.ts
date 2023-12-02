import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-use-terms',
  templateUrl: './use-terms.component.html',
  styleUrls: ['./use-terms.component.scss'],
})
export class UseTermsComponent  implements OnInit {

  constructor(private authService:AuthService, private router:Router, ) { }

  ngOnInit() {}

  acept(){
    var gettos={
      email:"raulsh2o@gmail.com",
    }
     this.authService.postTos(gettos).subscribe((res:any)=>{
    })
    this.router.navigate([`client-start`]);
  }

}
