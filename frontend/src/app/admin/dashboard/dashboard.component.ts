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

  loading = true;
  error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.api.getAdminStats().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.stats = res.data;
        } else {
          this.error = 'Không thể tải dữ liệu';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Lỗi server';
        this.loading = false;
      }
    });
  }

  formatMoney(v: number): string {
    return (v || 0).toLocaleString('vi-VN');
  }

  /** ✅ TÊN HÀM PHẢI GIỐNG HTML */
  statusCount(status: string): number {
    return this.stats.bookings_by_status?.[status] ?? 0;
  }
}
