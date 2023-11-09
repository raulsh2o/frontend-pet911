import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crete-edit-qr',
  templateUrl: './crete-edit-qr.component.html',
  styleUrls: ['./crete-edit-qr.component.scss'],
})
export class CreteEditQrComponent  implements OnInit {
create=false
  constructor(private router:Router) { }

  ngOnInit() {}
  qr(){
    this.create=true
  }
  continue(){
    this.router.navigate([`/qr-list`])
  }
  back(){
    this.router.navigate([`/associated-start`])
  }
}
