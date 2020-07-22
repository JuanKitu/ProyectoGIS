import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParametrosArchivadosPage } from './parametros-archivados.page';

describe('ParametrosArchivadosPage', () => {
  let component: ParametrosArchivadosPage;
  let fixture: ComponentFixture<ParametrosArchivadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrosArchivadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParametrosArchivadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
