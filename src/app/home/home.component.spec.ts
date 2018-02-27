import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AgmCoreModule } from '@agm/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[AgmCoreModule.forRoot({
        apiKey: 'AIzaSyAXXUGZcwF1Ro4s59-CONLxGS0mK5x9dSM',
        libraries: ['places']
      })],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create elements Home Component', () => {
    expect(component).toBeTruthy();
  });

  it('should latitude and longitud and zoom be 1', async(async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    component = fixture.componentInstance;
    component.initializeMap(1,1,1);
    expect(component.latitude).toEqual(1);
    expect(component.longitude).toEqual(1);
    expect(component.zoom).toEqual(1);
  }));


});
