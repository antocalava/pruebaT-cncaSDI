import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      city: ['Madrid', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, city } = this.loginForm.value;
      this.authService.setUserEmail(email);
      this.authService.login(email, city);
    } else {
      alert('Por favor, introduce un email válido y selecciona una ciudad.');
    }
  }
}
