import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.scss'],
})
export class ServiceInfoComponent  implements OnInit {
  divWith1=0
  divWith2=0
  divWith3=0
  divWith4=0
  divWith5=0
  items:any={calificacion:4.6,total:30,primero:5,segundo:3,tercero:5,cuarto:7,quinto:10}
  stars: number[] = [1, 2, 3, 4, 5]; // Cantidad de estrellas
  selectedRating: number = 0; // Calificación seleccionada
  ratinge: number = 3; // Número de estrellas llenas
  maxRating: number = 5; // Número máximo de estrellas

  
  constructor(private service:ApiService,private router:Router) { }


  ngOnInit() {
    this.calculate()
  }

  getStarsArray(count: number): number[] {
    return Array(count).fill(0);
  }
  rate(rating: number) {
    this.selectedRating = rating;
    this.items.total = this.items.total+ 1
    switch (this.selectedRating) {
      case 1:
        this.items.primero= this.items.primero +1
        break;
      case 2:
        this.items.segundo= this.items.segundo +1
        break;
      case 3:
        this.items.tercero= this.items.tercero +1
        break;
      case 4:
        this.items.cuarto= this.items.cuarto +1
        break;
      case 5:
        this.items.quinto= this.items.quinto +1
        break;
    }
    this.calculate()

  }
  calculate(){
    this.divWith1= (this.items.primero/this.items.total) *100
    this.divWith2= (this.items.segundo/this.items.total) *100
    this.divWith3= (this.items.tercero/this.items.total) *100
    this.divWith4= (this.items.cuarto/this.items.total) *100
    this.divWith5= (this.items.quinto/this.items.total) *100
    var total= (this.items.primero*1)+(this.items.segundo*2)+(this.items.tercero*3)+(this.items.cuarto*4)+(this.items.quinto*5)
    
    this.items.calificacion = ((total / (this.items.total*5)) *5).toFixed(1)
    this.ratinge  = parseInt( ((total / (this.items.total*5)) *5).toFixed(0))
    console.log(this.ratinge)
  }
}
