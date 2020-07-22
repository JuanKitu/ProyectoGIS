import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlantillaListaParametroComponent } from './plantilla-lista-parametro.component';

describe('PlantillaListaParametroComponent', () => {
  let component: PlantillaListaParametroComponent;
  let fixture: ComponentFixture<PlantillaListaParametroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaListaParametroComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlantillaListaParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
