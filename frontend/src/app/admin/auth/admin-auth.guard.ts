import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false; // On server, deny access
    }

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('user_role');

    console.log('Guard check: token=', token, 'role=', role);

    if (token && role === 'admin') {
      console.log('Allowed');
      return true;
    }

    // Not logged in as admin -> redirect to admin login
    console.log('Redirecting to /admin/login');
    this.router.navigate(['/admin/login']);
    return false;
  }
}