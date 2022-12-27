import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeRefComponent } from './document-type-ref.component';

describe('DocumentTypeRefComponent', () => {
  let component: DocumentTypeRefComponent;
  let fixture: ComponentFixture<DocumentTypeRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTypeRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTypeRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});