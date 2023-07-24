import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogActiveComponent } from './log-active.component';

describe('LogActiveComponent', () => {
  let component: LogActiveComponent;
  let fixture: ComponentFixture<LogActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogActiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
