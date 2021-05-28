import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConsultationrequestComponent } from './show-consultationrequest.component';

describe('ShowConsultationrequestComponent', () => {
  let component: ShowConsultationrequestComponent;
  let fixture: ComponentFixture<ShowConsultationrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowConsultationrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowConsultationrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
