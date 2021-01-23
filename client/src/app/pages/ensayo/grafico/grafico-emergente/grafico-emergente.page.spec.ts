import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GraficoEmergentePage } from './grafico-emergente.page';

describe('GraficoEmergentePage', () => {
  let component: GraficoEmergentePage;
  let fixture: ComponentFixture<GraficoEmergentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoEmergentePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GraficoEmergentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
