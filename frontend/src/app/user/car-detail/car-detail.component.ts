import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: any = null;
  totalPrice = 0;

  booking = {
    customer_name: '',
    phone: '',
    email: '',
    start_date: '',
    end_date: '',
    note: ''
  };

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCar(id);
  }

  loadCar(id: number) {
    this.api.getCarById(id).subscribe({
      next: (res: any) => {
        this.car = res.data;

        if (!this.car.image_url) {
          this.car.image_url = '/assets/default-car.png';
        }
      },
      error: err => console.log(err)
    });
  }

  calculateTotal() {
    if (this.booking.start_date && this.booking.end_date) {
      const s = new Date(this.booking.start_date);
      const e = new Date(this.booking.end_date);

      if (e < s) {
        this.totalPrice = 0;
        return;
      }

      const days = Math.ceil((e.getTime() - s.getTime()) / 86400000) + 1;
      this.totalPrice = days * this.car.price;
    }
  }

  bookCar() {
    // Validate
    if (!this.booking.customer_name || !this.booking.phone || !this.booking.email) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (!this.booking.start_date || !this.booking.end_date) {
      alert("Vui lòng chọn ngày thuê!");
      return;
    }

    // PAYLOAD PHẢI KHỚP VỚI API BACKEND
    const payload = {
      user_id: 1,  // TODO: thay bằng user login
      car_id: this.car.id,
      start_date: this.booking.start_date,
      end_date: this.booking.end_date,
      note: this.booking.note
    };

    this.api.createBooking(payload).subscribe({
      next: () => {
        this.router.navigate(['/booking-success']);
      },
      error: err => {
        console.log(err);
        alert("Đặt xe thất bại!");
      }
    });
  }
}
