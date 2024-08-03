import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalProductSoldMonthComponent } from './total-product-sold-month.component';

describe('TotalProductSoldMonthComponent', () => {
  let component: TotalProductSoldMonthComponent;
  let fixture: ComponentFixture<TotalProductSoldMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalProductSoldMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalProductSoldMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
