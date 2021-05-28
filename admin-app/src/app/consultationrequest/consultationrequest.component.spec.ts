import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationrequestComponent } from './consultationrequest.component';

describe('ConsultationrequestComponent', () => {
  let component: ConsultationrequestComponent;
  let fixture: ComponentFixture<ConsultationrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
