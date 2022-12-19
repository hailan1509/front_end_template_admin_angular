import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfidentialityRefComponent } from './confidentiality-ref.component';

describe('ConfidentialityRefComponent', () => {
  let component: ConfidentialityRefComponent;
  let fixture: ComponentFixture<ConfidentialityRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfidentialityRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfidentialityRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});