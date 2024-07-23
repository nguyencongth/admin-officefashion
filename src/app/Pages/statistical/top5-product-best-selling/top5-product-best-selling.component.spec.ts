import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top5ProductBestSellingComponent } from './top5-product-best-selling.component';

describe('Top5ProductBestSellingComponent', () => {
  let component: Top5ProductBestSellingComponent;
  let fixture: ComponentFixture<Top5ProductBestSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top5ProductBestSellingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Top5ProductBestSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
