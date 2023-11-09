import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent  implements OnInit {

  stars: number[] = [1, 2, 3, 4, 5]; // Cantidad de estrellas
  selectedRating: number = 0; // Calificación seleccionada
  constructor() {
 
  }

  ngOnInit() {}
  rate(rating: number) {
    this.selectedRating = rating;
    switch (this.selectedRating) {
      case 1:
        console.log(this.selectedRating)
        break;
      case 2:
        console.log(this.selectedRating)
        break;
      case 3:
        console.log(this.selectedRating)
        break;
      case 4:
        console.log(this.selectedRating)
        break;
      case 5:
        console.log(this.selectedRating)
        break;
    }
  }
}
