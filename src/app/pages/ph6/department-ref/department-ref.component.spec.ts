import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentRefComponent } from './department-ref.component';

describe('DepartmentRefComponent', () => {
  let component: DepartmentRefComponent;
  let fixture: ComponentFixture<DepartmentRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
