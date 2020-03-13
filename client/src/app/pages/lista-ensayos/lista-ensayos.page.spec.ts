import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaEnsayosPage } from './lista-ensayos.page';

describe('ListaEnsayosPage', () => {
  let component: ListaEnsayosPage;
  let fixture: ComponentFixture<ListaEnsayosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEnsayosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaEnsayosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
