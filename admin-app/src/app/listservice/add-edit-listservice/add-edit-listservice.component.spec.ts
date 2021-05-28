import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditListserviceComponent } from './add-edit-listservice.component';

describe('AddEditListserviceComponent', () => {
  let component: AddEditListserviceComponent;
  let fixture: ComponentFixture<AddEditListserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditListserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditListserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
