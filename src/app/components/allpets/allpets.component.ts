import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-allpets',
  templateUrl: './allpets.component.html',
  styleUrls: ['./allpets.component.scss'],
})
export class AllpetsComponent implements OnInit {
  constructor(private router:Router) {}

  ngOnInit() {}

  back() {
    this.router.navigate([`client-start`]);
  }
  editpet(){
    
    this.router.navigate([`/create-pet`])
  }
}
