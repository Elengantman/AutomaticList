import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGroceryListComponent } from './client-grocery-list.component';

describe('ClientGroceryListComponent', () => {
  let component: ClientGroceryListComponent;
  let fixture: ComponentFixture<ClientGroceryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientGroceryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGroceryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
