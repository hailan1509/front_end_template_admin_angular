import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentByProfileComponent } from './document-by-profile.component';

describe('DocumentByProfileComponent', () => {
  let component: DocumentByProfileComponent;
  let fixture: ComponentFixture<DocumentByProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentByProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentByProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
