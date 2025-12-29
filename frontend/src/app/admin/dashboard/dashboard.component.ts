import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  stats: any = {
    total_cars: 0,
    total_bookings: 0,
    bookings_by_status: {
      pending: 0,
      confirmed: 0,
      rejected: 0,
      canceled: 0,
      completed: 0
    },
    revenue: 0,
    recent_bookings: []
  };

  revenueMonth: any[] = [];
  revenueYear: any[] = [];
  topCars: any[] = [];
  newBookings: any[] = [];

  loading = true;
  error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadRevenueMonth();
    this.loadRevenueYear();
    this.loadTopCars();
    this.loadNewBookings();
  }

  loadStats() {
    this.loading = true;
    this.api.getAdminStats().subscribe({
      next: (res: any) => {
        console.log('Stats response:', res);
        if (res.status) {
          this.stats = res.data;
          // Convert status_count array to object
          this.stats.bookings_by_status = {};
          if (this.stats.status_count) {
            this.stats.status_count.forEach((item: any) => {
              this.stats.bookings_by_status[item.status] = item.total;
            });
          }
          console.log('Stats set:', this.stats);
        } else {
          this.error = 'Không thể tải dữ liệu';
        }
        this.loading = false;
      },
      error: (err) => {
        console.log('Stats error:', err);
        this.error = 'Lỗi server';
        this.loading = false;
      }
    });
  }

  loadRevenueMonth() {
    console.log('Loading revenue month');
    this.api.getRevenueThisMonth().subscribe({
      next: (res) => {
        console.log('Revenue month response:', res);
        this.revenueMonth = res.data || [];
      },
      error: (err) => {
        console.log('Revenue month error:', err);
      }
    });
  }

  loadRevenueYear() {
    console.log('Loading revenue year');
    this.api.getRevenueThisYear().subscribe({
      next: (res) => {
        console.log('Revenue year response:', res);
        this.revenueYear = res.data || [];
      },
      error: (err) => {
        console.log('Revenue year error:', err);
      }
    });
  }

  loadTopCars() {
    console.log('Loading top cars');
    this.api.getTopCars().subscribe({
      next: (res) => {
        console.log('Top cars response:', res);
        this.topCars = res.data || [];
      },
      error: (err) => {
        console.log('Top cars error:', err);
      }
    });
  }

  loadNewBookings() {
    console.log('Loading new bookings');
    this.api.getNewBookings().subscribe({
      next: (res) => {
        console.log('New bookings response:', res);
        this.newBookings = res.data || [];
      },
      error: (err) => {
        console.log('New bookings error:', err);
      }
    });
  }

  formatMoney(v: number): string {
    return (v || 0).toLocaleString('vi-VN');
  }

  get maxRevenueMonth(): number {
    return Math.max(...this.revenueMonth.map(r => r.revenue || 0), 1);
  }

  statusCount(status: string): number {
    return this.stats.bookings_by_status?.[status] ?? 0;
  }
}
