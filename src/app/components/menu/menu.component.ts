import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  associate=false;
  constructor(private router:Router) { }

  ngOnInit() {}
  next(ruta:string){
    this.router.navigate([`/${ruta}`])
  }

}
