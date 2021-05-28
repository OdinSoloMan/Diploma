import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditConsultationrequestComponent } from './add-edit-consultationrequest.component';

describe('AddEditConsultationrequestComponent', () => {
  let component: AddEditConsultationrequestComponent;
  let fixture: ComponentFixture<AddEditConsultationrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditConsultationrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditConsultationrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
