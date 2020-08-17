import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParametroPage } from './parametro.page';

describe('ParametroPage', () => {
  let component: ParametroPage;
  let fixture: ComponentFixture<ParametroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParametroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
