import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pet-info',
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.scss'],
})
export class PetInfoComponent  implements OnInit {

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
