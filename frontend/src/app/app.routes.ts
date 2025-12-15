import { Routes } from '@angular/router';

import { UserCarsComponent } from './user/cars/cars.component';
import { CarDetailComponent } from './user/car-detail/car-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { BookingListComponent } from './admin/booking/booking-list/booking-list.component';
import { BookingDetailComponent } from './admin/booking/booking-detail/booking-detail.component';

import { BookingSuccessComponent } from './pages/booking-success/booking-success.component';
import { BookingHistoryComponent } from './user/booking-history/booking-history.component';

import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: UserCarsComponent },
  { path: 'cars/:id', component: CarDetailComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'booking-success', component: BookingSuccessComponent },
  { path: 'booking-history', component: BookingHistoryComponent },

  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/bookings', component: BookingListComponent },
  { path: 'admin/bookings/:id', component: BookingDetailComponent },

  { path: '**', redirectTo: '' }
];

