import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningBookRefComponent } from './mining-book-ref.component';

describe('MiningBookRefComponent', () => {
  let component: MiningBookRefComponent;
  let fixture: ComponentFixture<MiningBookRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiningBookRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningBookRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});