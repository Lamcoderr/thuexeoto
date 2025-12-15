import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {

  booking: any = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBooking(id);
  }

  loadBooking(id: number) {
    this.api['getBookingById'](id).subscribe({
      next: (res: any) => {
        this.booking = res.data;
      },
      error: (err: any) => console.log(err)
    });
  }

  approve() {
    this.api.approveBooking(this.booking.id).subscribe({
      next: () => {
        alert("Đã duyệt booking!");
        this.router.navigate(['/admin/bookings']);
      }
    });
  }

  reject() {
    this.api.rejectBooking(this.booking.id).subscribe({
      next: () => {
        alert("Đã từ chối booking!");
        this.router.navigate(['/admin/bookings']);
      }
    });
  }
}
