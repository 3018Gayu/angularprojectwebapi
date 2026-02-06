import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySalesReport } from './monthly-sales-report';

describe('MonthlySalesReport', () => {
  let component: MonthlySalesReport;
  let fixture: ComponentFixture<MonthlySalesReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlySalesReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlySalesReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
