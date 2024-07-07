import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductComponent } from './dialog-product.component';

describe('DialogProductComponent', () => {
  let component: DialogProductComponent;
  let fixture: ComponentFixture<DialogProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
