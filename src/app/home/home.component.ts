import { 
  Component, 
  OnInit, 
  ViewChild, 
  ElementRef,
  NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

import {} from '@types/googlemaps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild("infoWindow")
  public infoWindowRef: ElementRef;

   private infowindow;

  public location: Coordinates = null;
  public latitude: any;
  public longitude: any;

  zoom: number = 15;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        this.initializeMap(this.location.latitude, this.location.longitude,15);
      });
   } else {
    this.initializeMap(43.4905172,-80.2094872,15);
   }

   this.mapsAPILoader.load().then(() => {
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    this.infowindow = new google.maps.InfoWindow();
    this.infowindow.setContent(this.infoWindowRef.nativeElement);

    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {

        this.infowindow.close();
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.initializeMap(
          place.geometry.location.lat(),
          place.geometry.location.lng(),
          18);
          
      });
    });
  });

  }

  onMapClick($event) {
    
  }

  initializeMap (lat: number, lng: number, zoom:number): void {
    this.latitude = lat;
    this.longitude = lng;
    this.zoom = zoom;

  }

}
