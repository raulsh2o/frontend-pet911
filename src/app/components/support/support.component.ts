import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent  implements OnInit {
  selectedOption: string="Elige uno";
  options: string[] = ['Opción 1', 'Opción 2', 'Opción 3'];
  constructor() { }

  ngOnInit() {}

}
