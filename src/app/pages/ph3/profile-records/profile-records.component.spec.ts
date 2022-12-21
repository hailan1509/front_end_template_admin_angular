import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRecordsComponent } from './profile-records.component';

describe('ProfileRecordsComponent', () => {
  let component: ProfileRecordsComponent;
  let fixture: ComponentFixture<ProfileRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
