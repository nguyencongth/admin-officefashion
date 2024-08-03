import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSellingComponent } from './total-selling.component';

describe('TotalSellingComponent', () => {
  let component: TotalSellingComponent;
  let fixture: ComponentFixture<TotalSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalSellingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
