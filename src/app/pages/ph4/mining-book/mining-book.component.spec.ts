import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningBookComponent } from './mining-book.component';

describe('MiningBookComponent', () => {
  let component: MiningBookComponent;
  let fixture: ComponentFixture<MiningBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiningBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
