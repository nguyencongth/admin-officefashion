import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCategoryListComponent } from './dialog-category-list.component';

describe('DialogCategoryListComponent', () => {
  let component: DialogCategoryListComponent;
  let fixture: ComponentFixture<DialogCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCategoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
