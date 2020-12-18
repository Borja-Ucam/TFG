import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PairedTestPage } from './paired-test.page';

describe('PairedTestPage', () => {
  let component: PairedTestPage;
  let fixture: ComponentFixture<PairedTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PairedTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PairedTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
