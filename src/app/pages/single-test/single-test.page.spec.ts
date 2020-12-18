import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleTestPage } from './single-test.page';

describe('SingleTestPage', () => {
  let component: SingleTestPage;
  let fixture: ComponentFixture<SingleTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
