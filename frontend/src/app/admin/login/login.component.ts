import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent {

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

    this.api.adminLogin(this.form.value).subscribe({
      next: (res: any) => {
        console.log('Admin login response:', res);
        // backend returns { message, token, user }
        if (res.token) {
          localStorage.setItem('token', res.token);
          console.log('Token set:', localStorage.getItem('token'));
        }
        if (res.user && res.user.id) {
          localStorage.setItem('user_id', String(res.user.id));
          localStorage.setItem('user_name', res.user.name || '');
          localStorage.setItem('user_role', res.user.role || '');
          console.log('Role set:', res.user.role);
        }

        this.loading = false;
        // Navigate to admin dashboard
        console.log('Navigating to /admin');
        this.router.navigate(['/admin']);
      },
      error: (err: any) => {
        console.log('Admin login error:', err);
        console.error(err);
        alert(err?.error?.message || 'Đăng nhập thất bại');
        this.loading = false;
      }
    });
  }
}