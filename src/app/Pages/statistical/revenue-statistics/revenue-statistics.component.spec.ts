import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueStatisticsComponent } from './revenue-statistics.component';

describe('RevenueStatisticsComponent', () => {
  let component: RevenueStatisticsComponent;
  let fixture: ComponentFixture<RevenueStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevenueStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
