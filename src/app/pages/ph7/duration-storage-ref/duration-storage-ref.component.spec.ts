import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationStorageRefComponent } from './duration-storage-ref.component';

describe('DurationStorageRefComponent', () => {
  let component: DurationStorageRefComponent;
  let fixture: ComponentFixture<DurationStorageRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DurationStorageRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationStorageRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});