import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookings: any[] = [];
  filterStatus = 'pending';

  statuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'canceled', label: 'Canceled' },
    { value: 'completed', label: 'Completed' }
  ];

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.api.filterBooking(this.filterStatus).subscribe({
      next: (res: any) => {
        this.bookings = res.data;
      },
      error: (err: any) => console.log(err)
    });
  }

  viewDetail(id: number) {
    this.router.navigate(['/admin/booking', id]);
  }
}
