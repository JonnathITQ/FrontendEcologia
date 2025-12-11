import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModeradorComponent } from './login-moderador.component';

describe('LoginModeradorComponent', () => {
  let component: LoginModeradorComponent;
  let fixture: ComponentFixture<LoginModeradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginModeradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginModeradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
