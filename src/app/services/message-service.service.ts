import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();
  sendMessage(message: string) {
    this.messageSource.next(message);
  }
}
