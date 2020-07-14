import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlantillaListaEnsayoComponent } from './plantilla-lista-ensayo.component';

describe('PlantillaListaEnsayoComponent', () => {
  let component: PlantillaListaEnsayoComponent;
  let fixture: ComponentFixture<PlantillaListaEnsayoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaListaEnsayoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlantillaListaEnsayoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
