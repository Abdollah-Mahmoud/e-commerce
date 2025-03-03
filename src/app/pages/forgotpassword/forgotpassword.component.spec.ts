import { ComponentFixture, TestBed } from '@angular/core/testing';

import { forgotPasswordComponent } from './forgotPassword.component';

describe('forgotPasswordComponent', () => {
  let component: forgotPasswordComponent;
  let fixture: ComponentFixture<forgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [forgotPasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(forgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
