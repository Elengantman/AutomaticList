import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReportTableComponent } from './client-report-table.component';

describe('ClientReportTableComponent', () => {
  let component: ClientReportTableComponent;
  let fixture: ComponentFixture<ClientReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientReportTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
