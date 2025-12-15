import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    if (this.form.value.password !== this.form.value.confirm) {
      return alert('Mật khẩu không khớp');
    }

    this.api.register(this.form.value).subscribe({
      next: () => {
        alert('Đăng ký thành công');
        this.router.navigate(['/login']);
      },
      error: () => alert('Email đã tồn tại')
    });
  }
}
