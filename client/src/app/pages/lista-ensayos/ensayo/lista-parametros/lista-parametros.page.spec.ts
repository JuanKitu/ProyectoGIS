import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaParametrosPage } from './lista-parametros.page';

describe('ListaParametrosPage', () => {
  let component: ListaParametrosPage;
  let fixture: ComponentFixture<ListaParametrosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaParametrosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaParametrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
