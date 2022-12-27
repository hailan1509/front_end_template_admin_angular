import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleRefComponent } from './role-ref.component';

describe('RoleRefComponent', () => {
  let component: RoleRefComponent;
  let fixture: ComponentFixture<RoleRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
