import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-allpets',
  templateUrl: './allpets.component.html',
  styleUrls: ['./allpets.component.scss'],
})
export class AllpetsComponent implements OnInit {
  token:any
  user:any
  pets: any[] = [];
  constructor(private router:Router,
    private service:ApiService,
    private activatedRoute:ActivatedRoute) {}
    
/*    ngAfterViewInit() {
    this.token= localStorage.getItem('token')
    this.user = JSON.parse(this.token)
    this.service.getPetByUser(this.user.idUser).subscribe((res:any)=>{
      console.log(res[0])
      for (var i=0; i<res.length; i++){
        var pet = {
          id: res[i].id,
          name: res[i].name,
          age: res[i].age,
          race: res[i].race,
          sex: res[i].sex,
          allergies: res[i].allergies
        }
        this.pets.push(pet);
      }
    })
  }  */
  ionViewWillEnter() {
    this.token= localStorage.getItem('token')
    this.user = JSON.parse(this.token)
    this.service.getPetByUser(this.user.idUser).subscribe((res:any)=>{
      console.log(res[0])
      this.pets = [];
      for (var i=0; i<res.length; i++){
        var pet = {
          id: res[i].id,
          name: res[i].name,
          age: res[i].age,
          race: res[i].race,
          sex: res[i].sex,
          allergies: res[i].allergies,
          image: res[i].image
        }
        this.pets.push(pet);
      }
    })
  }

  ngOnInit() {
    
    this.token= localStorage.getItem('token')
    this.user = JSON.parse(this.token)
    this.service.getPetByUser(this.user.idUser).subscribe((res:any)=>{
      console.log(res[0])
      for (var i=0; i<res.length; i++){
        var pet = {
          id: res[i].id,
          name: res[i].name,
          age: res[i].age,
          race: res[i].race,
          sex: res[i].sex,
          allergies: res[i].allergies,
          image: res[i].image
        }
        this.pets.push(pet);
      }
    }) 
  }

  back() {
    this.router.navigate([`client-start`]);
  }
  editpet(petId: string){
    
    this.router.navigate([`/create-pet`, { tipoServicio: 'update', petId: petId}])

  }
}
