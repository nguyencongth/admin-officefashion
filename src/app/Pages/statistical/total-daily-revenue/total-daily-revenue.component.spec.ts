import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDailyRevenueComponent } from './total-daily-revenue.component';

describe('TotalDailyRevenueComponent', () => {
  let component: TotalDailyRevenueComponent;
  let fixture: ComponentFixture<TotalDailyRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalDailyRevenueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalDailyRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
