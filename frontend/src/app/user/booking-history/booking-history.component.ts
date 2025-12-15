import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  bookings: any[] = [];
  userId: number = Number(localStorage.getItem("user_id"));

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.api.getUserBookings(this.userId).subscribe({
      next: (res: any) => {
        this.bookings = res.data;
      },
      error: err => console.log(err)
    });
  }
}
