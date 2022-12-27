import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesRefComponent } from './archives-ref.component';

describe('ArchivesRefComponent', () => {
  let component: ArchivesRefComponent;
  let fixture: ComponentFixture<ArchivesRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivesRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivesRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});