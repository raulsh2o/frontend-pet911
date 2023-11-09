import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activate-twofa',
  templateUrl: './activate-twofa.component.html',
  styleUrls: ['./activate-twofa.component.scss'],
})
export class ActivateTwofaComponent  implements OnInit {
activated=false;
  constructor() { }

  ngOnInit() {}
  active(){
    this.activated=true
  }
}
