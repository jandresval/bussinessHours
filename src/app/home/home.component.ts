import { 
  Component, 
  OnInit, 
  ViewChild, 
  ElementRef,
  NgZone,
  Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader, GoogleMapsAPIWrapper, MarkerManager, AgmMarker } from '@agm/core';

import {} from '@types/googlemaps';
import { Polygon, LatLngLiteral } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [GoogleMapsAPIWrapper, MarkerManager]
})
export class HomeComponent implements OnInit {

  

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild("infoWindow")
  public infoWindowRef: ElementRef;

  @ViewChild("map2")
  public map: ElementRef;

  private infowindow;

  public location: Coordinates = null;
  public latitude: any;
  public longitude: any;

  public zoom: number = 15;

  public model:any= {search:''};

  private mapContainer: HTMLDivElement;
  private mapContainer2: HTMLDivElement;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _elem: ElementRef,
    private googleMapsAPIWrapper: GoogleMapsAPIWrapper,
    private markerManager: MarkerManager) { }

  ngOnInit() {

    this.mapContainer = this._elem.nativeElement.querySelector('#map');
    this.mapContainer2 = this._elem.nativeElement.querySelector('#map2');
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords;
        this.initializeMap(this.location.latitude, this.location.longitude,15);
      });
    } else {
      this.initializeMap(43.4905172,-80.2094872,15);
    }
    

    this.mapsAPILoader.load().then(() => {

      
      /*this.googleMapsAPIWrapper.getNativeMap().then(map=>{

        new google.maps.Marker({map:map,})
      });*/
      console.log(this.markerManager);

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.setTypes(['establishment']);
      this.infowindow = new google.maps.InfoWindow();

      this.infowindow.setContent(this.infoWindowRef.nativeElement);

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            // Create the places service.
            let service = new google.maps.places.PlacesService(this.mapContainer2);
            var pyrmont = {lat: this.latitude, lng: this.longitude};
            let placeserchrequest:any = {location:pyrmont,radius:500,type:['store'],query:this.model.search};
            service.textSearch(placeserchrequest,(results, status)=>{
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(results);

                for (var i = 0; i < results.length; i++) {
                  this.createMarker(results[i]);
                }
              }
            });
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

  createMarker(place) {
    /*var placeLoc = place.geometry.location;
    var options:any = {map: this.mapContainer,position: place.geometry.location};
    var marker = new google.maps.Marker(options);*/
  }


  onMarkerClick(lastOpen) {
    console.log(lastOpen);
  }

  onMapClick(event) {
    //event.stopPropagation();
    console.log(event);
  }

  initializeMap (lat: number, lng: number, zoom:number): void {
    this.latitude = lat;
    this.longitude = lng;
    this.zoom = zoom;
  }

}
