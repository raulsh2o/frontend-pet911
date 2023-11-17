import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor() {
   }  
   showLocalNotification(title: string, body: string, at: Date, id: number = 500): void {
    LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id,
          schedule: {
            at,
          },
        },
      ],
    });
  }
}
