import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStaffListComponent } from './dialog-staff-list.component';

describe('DialogStaffListComponent', () => {
  let component: DialogStaffListComponent;
  let fixture: ComponentFixture<DialogStaffListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogStaffListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogStaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
