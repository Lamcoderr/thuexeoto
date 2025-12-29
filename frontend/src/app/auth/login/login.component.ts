import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loading = false;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;

    this.api.login(this.form.value).subscribe({
      next: (res: any) => {
        // backend returns { status, message, user, token }
        alert('Đăng nhập thành công');
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        if (res.user && res.user.id) {
          localStorage.setItem('user_id', String(res.user.id));
          localStorage.setItem('user_name', res.user.name || '');
        }
        this.loading = false;
        this.router.navigate(['/cars']);
      },
      error: (err: any) => {
        alert('Sai email hoặc mật khẩu');
        this.loading = false;
      }
    });
  }
  }