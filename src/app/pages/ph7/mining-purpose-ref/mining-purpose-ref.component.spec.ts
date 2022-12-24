import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningPurposeRefComponent } from './mining-purpose-ref.component';

describe('MiningPurposeRefComponent', () => {
  let component: MiningPurposeRefComponent;
  let fixture: ComponentFixture<MiningPurposeRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiningPurposeRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningPurposeRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});