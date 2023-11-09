import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adopt-info',
  templateUrl: './adopt-info.component.html',
  styleUrls: ['./adopt-info.component.scss'],
})
export class AdoptInfoComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}
  emergency(){
    this.router.navigate([`/mapa`])
  }
  home(){
    this.router.navigate([`/start`])
  }
  list(){
    
    this.router.navigate([`/adopt-list`])
  }
}
