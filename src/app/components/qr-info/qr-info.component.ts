import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-qr-info',
  templateUrl: './qr-info.component.html',
  styleUrls: ['./qr-info.component.scss'],
})
export class QrInfoComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}
  
  menu(){
    
    this.router.navigate([`/menu`])
  }
}
