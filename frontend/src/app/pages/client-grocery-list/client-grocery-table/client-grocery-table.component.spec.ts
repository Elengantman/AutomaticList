import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGroceryTableComponent } from './client-grocery-table.component';

describe('ClientGroceryTableComponent', () => {
  let component: ClientGroceryTableComponent;
  let fixture: ComponentFixture<ClientGroceryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientGroceryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGroceryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
