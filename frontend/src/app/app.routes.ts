import { Routes } from '@angular/router';

import { UserCarsComponent } from './user/cars/cars.component';
import { CarDetailComponent } from './user/car-detail/car-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { BookingListComponent } from './admin/booking/booking-list/booking-list.component';
import { BookingDetailComponent } from './admin/booking/booking-detail/booking-detail.component';

import { BookingSuccessComponent } from './pages/booking-success/booking-success.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BookingHistoryComponent } from './user/booking-history/booking-history.component';

import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminLoginComponent } from './admin/login/login.component';
import { AdminAuthGuard } from './admin/auth/admin-auth.guard';

import { CarsComponent as AdminCarsComponent } from './admin/cars/cars.component';
import { AddCarComponent as AdminAddCarComponent } from './admin/cars/add/add.component';
import { EditCarComponent as AdminEditCarComponent } from './admin/cars/edit/edit.component';

export const routes: Routes = [
  { path: '', component: UserCarsComponent },
  { path: 'cars', component: UserCarsComponent },
  { path: 'cars/:id', component: CarDetailComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },

  { path: 'booking-success', component: BookingSuccessComponent },
  { path: 'booking-history', component: BookingHistoryComponent },

  // Admin login (public)
  { path: 'admin/login', component: AdminLoginComponent },

  // Admin routes (protected)
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/cars', component: AdminCarsComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/cars/add', component: AdminAddCarComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/cars/edit/:id', component: AdminEditCarComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/bookings', component: BookingListComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/bookings/:id', component: BookingDetailComponent, canActivate: [AdminAuthGuard] },

  { path: '**', redirectTo: '' }
  ];