import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
declare var google:any;


interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
  type:string;
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent  implements OnInit {
  map = null;
  name:string=''
  type:string=''
  position={
    lat:0,
    lng:0
  }
  select=false
  infoWindows:any = []
  directionsService = new google.maps.DirectionsService();
directionsDisplay = new google.maps.DirectionsRenderer();
  services:any
  origin = { lat: -2.903251762091743, lng:  -78.99707109424092};
  // Parque la 93
  destination = { lat:-2.9055417918128525,lng:  -79.00423664137152  };
  constructor(private router:Router,private service:ApiService) { }

  ngOnInit() {
    this.service.getServices().subscribe((res:any)=>{
      this.services=res
      console.log(this.services)
    })
    this.loadMap();
  }
   printCurrentPosition = async () => {
   

  }
  loadMap() {
    // create a new map by passing HTMLElement
    const input =document.getElementById('map');
   const mapEle: HTMLElement = input!
    // create LatLng object
    const myLatLng = {lat: -2.899297838112968, lng: -79.00534522485833};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    this.directionsDisplay.setMap(this.map);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
     // this.calculateRoute();
      this.renderMarkers();
      mapEle.classList.add('show-map');
    });
    
  }
  addMarker(marker: Marker) {
      const mark =new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title,
      icon: {
        size: new google.maps.Size(48, 59),
        anchor: new google.maps.Point(24, 59),
        url: '../../../assets/logos/Med.png',
        text: {
          content: '!',
          color: '#fff',
          size: '24px',
          weight: '700',
          position: [25, 24]
        }
      },
      
    });
    var contentString = '<div>'+'<h2 style="color:black;">'+marker.title+'</h2>'+'</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
       });
     mark.addListener('click', ()=> {  
      
      this.position=marker.position
      this.name=marker.title
        this.type=marker.type
        this.select=true
        console.log(this.position);
        console.log(this.name,this.type);
        infowindow.open(Map,mark)
        
      });
    return mark
  }
 
  renderMarkers() {
    this.services.forEach((service:any) => {
      const marker={
        position: {
          lat: service.latitude,
          lng: service.longitude,
        },
        title:service.name,
        type:service.type
      }
      console.log(marker)
      this.addMarker(marker);
    });
  }
  // private calculateRoute() {
  //   this.directionsService.route({
  //     origin: this.origin,
  //     destination: this.destination,
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   }, (response:any, status:any)  => {
  //     if (status === google.maps.DirectionsStatus.OK) {
  //       this.directionsDisplay.setDirections(response);
  //     } else {
  //       alert('Could not display directions due to: ' + status);
  //     }
  //   });
  //   }
  back(){
    this.router.navigate([`/start`])
  }
  close(){
    this.select=false
  }
  maps(){
    const url = `https://www.google.com/maps?q=${this.position.lat},${this.position.lng}`; // Cambia esto a la URL que deseas redirigir
    window.open(url, '_blank')
  }
}
