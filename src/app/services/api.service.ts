import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url=environment.apiURL
  
  constructor(private http: HttpClient) { }

  //Get all the pets
  getPets(){
    return this.http.get<any[]>(this.url+'api/Pet')
  }
  //Get all the services
  getServices(){
    return this.http.get<any[]>(this.url+'api/Service')
  }
  //Get pets By user id
  getPetByUser(id:string){
    
    return this.http.get(this.url+'api/Pet/ByUser/'+id)
  }
}
