import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveFontsComponent } from './archive-fonts-ref.component';

describe('ArchiveFontsComponent', () => {
  let component: ArchiveFontsComponent;
  let fixture: ComponentFixture<ArchiveFontsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveFontsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveFontsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});