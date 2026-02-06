import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeeklySalesReportComponent } from './weekly-sales-report';

describe('WeeklySalesReportComponent', () => {
  let component: WeeklySalesReportComponent;
  let fixture: ComponentFixture<WeeklySalesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklySalesReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklySalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
