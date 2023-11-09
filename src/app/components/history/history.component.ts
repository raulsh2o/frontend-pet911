import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent  implements OnInit {
  results=[{name:'Clinica 1',description:'Es la clinica 1',date:'2023-03-03'},{name:'Clinica 2',description:'Es la clinica 2',date:'2023-04-04'},{name:'Clinica 3',description:'Es la clinica 3',date:'2023-05-05'},
  {name:'Clinica 4',description:'Es la clinica 4',date:'2023-06-06'}]
  res=this.results
  constructor(private router:Router) { }

  ngOnInit() {}
  emergency(){
    this.router.navigate([`/mapa`])
  }
  home(){
    this.router.navigate([`/start`])
  }
  // handleInput(event:any) {
  //   const query = event.target.value.toLowerCase();
  //   console.log(event.target.value.toLowerCase())
  //   this.results = this.services.filter((d:any) => d.name.toLowerCase().indexOf(query) > -1);
  // }
  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    console.log(event.target.value.toLowerCase())
    this.res = this.results.filter((d:any) => d.name.toLowerCase().indexOf(query) > -1);
  }
  filter(Initdate:any,Finaldate:any){
    const initMonth = Initdate.substring(Initdate.length - 2);
    const finalMonth = Finaldate.substring(Finaldate.length - 2);
    this.res=this.results.filter((date:any)=>{
      const dateString = date.date
      const dateObject = new Date(dateString);
      const month = dateObject.getMonth() + 1;
      
      if(month>=parseInt(initMonth, 10)  && month<=parseInt(finalMonth, 10) ){
        
        return date
      }
    })
    console.log(initMonth,finalMonth)
  }
}
