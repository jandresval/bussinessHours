import { 
  Component, 
  OnInit, 
  ViewChild, 
  ElementRef,
  NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  @ViewChild("search")
  public searchElementRef: ElementRef;

  public searchControl: FormControl;

  location: Coordinates = null;
  latitude: any;
  longitude: any;

  zoom: number = 15;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {

    //create search FormControl
    this.searchControl = new FormControl();

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        this.initializeMap(this.location.latitude, this.location.longitude);
      });
   } else {
    this.initializeMap(43.4905172,-80.2094872);
   }

   this.mapsAPILoader.load().then(() => {
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 18;
      });
    });
  });

  }

  initializeMap (lat: number, lng: number): void {
    this.latitude = lat;
    this.longitude = lng;

    
  }

}
