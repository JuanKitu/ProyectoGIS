import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnsayosArchivadosPage } from './ensayos-archivados.page';

describe('EnsayosArchivadosPage', () => {
  let component: EnsayosArchivadosPage;
  let fixture: ComponentFixture<EnsayosArchivadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnsayosArchivadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnsayosArchivadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
