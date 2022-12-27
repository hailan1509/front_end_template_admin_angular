import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRefComponent } from './users-ref.component';

describe('UsersRefComponent', () => {
  let component: UsersRefComponent;
  let fixture: ComponentFixture<UsersRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
