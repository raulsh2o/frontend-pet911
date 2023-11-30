import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url=environment.apiURL

  public signOutExternal = () => {
    localStorage.removeItem("token");
    console.log("token deleted")
}
  constructor(private http:HttpClient) { }

  //Login to application
  postLogin(model:any){
    return this.http.post(this.url+'Login',model)
  }
  //Register to the aplication
  postRegister(model:any){
    return this.http.post(this.url+'Register',model)
  }
  //Check if user exist in database
  postCheckUser(email:any){
    return this.http.post(this.url+'CheckUser',email)
  }

  //Recover password sending an email
  postRecoverPassword(model:any){
    return this.http.post(this.url+'SendEmail',model)
  }

  //Reset password your own password
  postResetPassword(model:any,id:string){
    return this.http.post(this.url+'ResetPassword/'+id,model)
  }

  //Send the code for the two-step verification
  postSendCode(model:any,id:string){
    return this.http.post(this.url+'SendCode/'+id,model)
  }



  postNoti(model:any){
    return this.http.post(this.url+'api/NotifyToken/',model)
  }

  getAdmins(){
    return this.http.get(this.url+'Admins');
  }

  getSession(model: any){
    return this.http.post(this.url + 'GetSession', model);
  }

  postSMSNotification(model: any){
    return this.http.post(this.url + 'GetNotifications', model);
  }

  postNotify(model: any) {
    return this.http.post(this.url + 'Notification', model);
  }

  postNotifyConfirm(model: any) {
    return this.http.post(this.url + 'ConfirfNotification', model);
  }
  //Methods for sending notifications
  
  postSession(model:any){
    return this.http.post(this.url+'Session',model)
  }

  deleteSession(id:any){
    
    return this.http.delete(this.url+'Session/'+id)
  }
  deleteNotification(id:any){
    
    return this.http.delete(this.url+'Notification/'+id)
  }
  postMessage(id:any){
    return this.http.get(this.url+'Mesa/'+id)
  }
  

  LoginWithGoogle(credentials: any): Observable<any> {
  return  this.http.post(this.url + "LoginWithGoogle",credentials)

}

LoginWithFacebook(credentials: string): Observable<any> {
  const header = new HttpHeaders().set('Content-type', 'application/json');
  return this.http.post(this.url + "LoginWithFacebook", JSON.stringify(credentials), { headers: header, withCredentials: true });
}

}
