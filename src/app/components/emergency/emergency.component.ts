import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss'],
})
export class EmergencyComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  back() {
    this.router.navigate([`client-start`]);
  }
  editpet(){
    
    this.router.navigate([`/create-pet`])
  }

}
