import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // ======================================
  //              ADMIN AUTH
  // ======================================
  adminLogin(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/login`, data);
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/refresh`, {});
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/logout`, {});
  }

  adminForgotPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/forgot-password`, data);
  }

  // ======================================
  //                USER AUTH
  // ======================================
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // ======================================
  //                CARS (ADMIN)
  // ======================================
  getCars(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cars`);
  }

  addCar(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cars`, data);
  }

  getCarById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cars/${id}`);
  }

  updateCar(id: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cars/${id}`, data);  // Ở đây phải dùng POST theo API bạn viết
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cars/${id}`);
  }

  // ======================================
  //              SEARCH (USER)
  // ======================================
  searchCars(filters: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/cars/search`, {
      params: filters
    });
  }
  // ========== BOOKINGS ==========
  sendBooking(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/bookings`, data);
  }
  
  createBooking(data: any) {
  return this.http.post(`${this.apiUrl}/booking`, data);
  }

  // ====================================== 
  //              BOOKINGS (ADMIN)
  // ======================================
  getAllBookings() {
    return this.http.get(`${this.apiUrl}/bookings`);
  }

  filterBooking(status: string) {
    return this.http.get(`${this.apiUrl}/bookings/status/${status}`);
  }

  getBookingDetail(id: number) {
    return this.http.get(`${this.apiUrl}/bookings/${id}`);
  }

  approveBooking(id: number) {
    return this.http.post(`${this.apiUrl}/bookings/${id}/approve`, {});
  }

  rejectBooking(id: number) {
    return this.http.post(`${this.apiUrl}/bookings/${id}/reject`, {});
  }
  // ======================================
  //          BOOKING HISTORY (USER)
  // ======================================
  getBookingHistory(userId: number) {
  return this.http.get(`${this.apiUrl}/booking-history/${userId}`);
  }

  getUserBookings(id: number) {
  return this.http.get(this.apiUrl + '/booking/user/' + id);
  }

  // thống kê admin
  getAdminStats(): Observable<any> {
  return this.http.get(`${this.apiUrl}/admin/stats`);
  }

  // lấy booking theo trạng thái 
  getAdminBookings(status: string = ''): Observable<any> {
  let url = `${this.apiUrl}/bookings`;
  if (status) url = `${this.apiUrl}/bookings?status=${status}`;
  return this.http.get(url);
  }
  
  
}