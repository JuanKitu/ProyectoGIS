import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnsayoPage } from './ensayo.page';

describe('EnsayoPage', () => {
  let component: EnsayoPage;
  let fixture: ComponentFixture<EnsayoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnsayoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnsayoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
