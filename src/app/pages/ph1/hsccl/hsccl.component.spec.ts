import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscclComponent } from './hsccl.component';

describe('HscclComponent', () => {
  let component: HscclComponent;
  let fixture: ComponentFixture<HscclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HscclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HscclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
