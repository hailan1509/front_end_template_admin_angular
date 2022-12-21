import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHandoverMinutesComponent } from './create-handover-minutes.component';

describe('CreateHandoverMinutesComponent', () => {
  let component: CreateHandoverMinutesComponent;
  let fixture: ComponentFixture<CreateHandoverMinutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHandoverMinutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHandoverMinutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
