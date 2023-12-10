import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-adopt-info',
  templateUrl: './adopt-info.component.html',
  styleUrls: ['./adopt-info.component.scss'],
})
export class AdoptInfoComponent  implements OnInit {
  name = '';
  age = '';
  sex = '';
  race = '';
  description = '';

  constructor(private router:Router, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.name = params['name']; 
      this.age = params['age'];
      this.sex = params['sex']; 
      this.race = params['race'];
      this.description = params['description']; 
    });
  }
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
