import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyIssuedRefComponent } from './agency-issued-ref.component';

describe('AgencyIssuedRefComponent', () => {
  let component: AgencyIssuedRefComponent;
  let fixture: ComponentFixture<AgencyIssuedRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyIssuedRefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyIssuedRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});