import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsRefComponent } from './fields-ref.component';

describe('FieldsRefComponent', () => {
  let component: FieldsRefComponent;
  let fixture: ComponentFixture<FieldsRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldsRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});