import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('SignUpComponent', () => {
  let fixture: ComponentFixture<SignUpComponent>;
  let component: SignUpComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should return empty string`, () => {
    expect(component.checkFormValidation('Didi', 'Manusi')).toEqual('');
  });

  it(`should fail for too short first name`, () => {
    expect(component.checkFormValidation('D', 'Manusi')).toEqual('first name should be at least 2 characters');
  });

  it(`should fail for too long family name`, () => {
    expect(component.checkFormValidation('Didi', 'Manusikjkklljkljkljkjlkjkjkljlkj')).toEqual('last name should be at most 15 characters');
  });

  it(`should fail for empty parameters`, () => {
    expect(component.checkFormValidation('', '')).not.toEqual('');
  });
});
