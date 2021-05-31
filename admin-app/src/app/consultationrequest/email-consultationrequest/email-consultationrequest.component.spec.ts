import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConsultationrequestComponent } from './email-consultationrequest.component';

describe('EmailConsultationrequestComponent', () => {
  let component: EmailConsultationrequestComponent;
  let fixture: ComponentFixture<EmailConsultationrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailConsultationrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailConsultationrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
