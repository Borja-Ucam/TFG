import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormulariosPage } from './formularios.page';

describe('FormulariosPage', () => {
  let component: FormulariosPage;
  let fixture: ComponentFixture<FormulariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulariosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormulariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
