import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  errorMessage = '';

  onLogin() {
    this.api.adminLogin(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        alert('Đăng nhập thành công!');
      },
      error: () => {
        this.errorMessage = 'Sai email hoặc mật khẩu!';
      }
    });
  }

  forgotPassword() {
    const email = prompt('Nhập email để lấy lại mật khẩu:');
    if (!email) return;

    this.api.adminForgotPassword({ email }).subscribe({
      next: () => alert('Đã gửi email đặt lại mật khẩu!'),
      error: () => alert('Email không tồn tại!')
    });
  }
}
