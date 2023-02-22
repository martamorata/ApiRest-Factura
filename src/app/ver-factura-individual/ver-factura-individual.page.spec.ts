import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerFacturaIndividualPage } from './ver-factura-individual.page';

describe('VerFacturaIndividualPage', () => {
  let component: VerFacturaIndividualPage;
  let fixture: ComponentFixture<VerFacturaIndividualPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerFacturaIndividualPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerFacturaIndividualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
