import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalConditionRefComponent } from './physical-condition-ref.component';

describe('PhysicalConditionRefComponent', () => {
  let component: PhysicalConditionRefComponent;
  let fixture: ComponentFixture<PhysicalConditionRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalConditionRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalConditionRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});