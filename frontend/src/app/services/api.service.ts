import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;

  // API base
  private apiUrl = 'http://127.0.0.1:8000/api';
  // Backend origin (without /api) — dùng để build image URLs
  public backendOrigin = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // Helper: build full image url for filename (filename stored in DB as image)
  getImageUrl(filename?: string): string {
    if (!filename) return '/assets/default-car.png';
    if (filename.startsWith('http')) return filename;
    return `${this.backendOrigin}/cars/${filename}`;
  }

  // ======================================
  //              ADMIN AUTH
  // ======================================
  adminLogin(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/login`, data);
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh`, {});
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  adminForgotPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, data);
  }

  // ======================================
  //                USER AUTH
  // ======================================
  login(data: any): Observable<any> {
    // backend expects POST /api/login
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // ======================================
  //                CARS
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
    // backend uses PUT for update; your backend code uses PUT route
    return this.http.put(`${this.apiUrl}/cars/${id}`, data);
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
  // Public create booking (backend: POST /bookings)
  createBooking(data: any) {
    return this.http.post(`${this.apiUrl}/bookings`, data);
  }

  // ====================================== 
  //              BOOKINGS (ADMIN)
  // ======================================
  getAllBookings() {
    return this.http.get(`${this.apiUrl}/bookings`);
  }

  filterBooking(status: string) {
    // backend has /bookings/filter/{status} OR /bookings?status=...
    // call /bookings?status=...
    let url = `${this.apiUrl}/bookings`;
    if (status) url = `${this.apiUrl}/bookings?status=${status}`;
    return this.http.get(url);
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
  getUserBookings(userId: number) {
    return this.http.get(`${this.apiUrl}/users/${userId}/bookings`);
  }

  // thống kê admin (map to existing dashboard endpoints)
  getAdminStats(): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.get(`${this.apiUrl}/statistics/summary`, { headers });
  }

  getRevenueThisMonth(): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.get(`${this.apiUrl}/stats/revenue-month`, { headers });
  }

  getRevenueThisYear(): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.get(`${this.apiUrl}/stats/revenue-year`, { headers });
  }

  getTopCars(): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.get(`${this.apiUrl}/stats/top-cars`, { headers });
  }

  getNewBookings(): Observable<any> {
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
    return this.http.get(`${this.apiUrl}/stats/new-bookings`, { headers });
  }
}