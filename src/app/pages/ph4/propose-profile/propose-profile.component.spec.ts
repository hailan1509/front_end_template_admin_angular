import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeProfileComponent } from './propose-profile.component';

describe('ProposeProfileComponent', () => {
  let component: ProposeProfileComponent;
  let fixture: ComponentFixture<ProposeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposeProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
