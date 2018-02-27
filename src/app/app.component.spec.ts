import { TestBed,ComponentFixture, async } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router'; 
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule } from '@agm/core';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {

  const appRoutes: Routes = [
    {
      path: 'home',
      component: HomeComponent
    },
    { 
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    }
  ];

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterModule.forRoot(appRoutes),
        AgmCoreModule.forRoot()],
      declarations: [
        AppComponent,
        HomeComponent
      ],
      providers:[{provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create AppComponents', () => {
    expect(component).toBeTruthy();
  });
  it('should have have a router outlet', () => {
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
  /*it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));*/
});
