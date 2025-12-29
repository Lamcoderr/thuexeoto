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
        // Backend returns res.data
        this.car = res.data || res;

        // Normalize image_url and price
        if (!this.car.image_url) {
          if (this.car.image) {
            this.car.image_url = this.api.getImageUrl(this.car.image);
          } else {
            this.car.image_url = '/assets/default-car.png';
          }
        }

        if (!this.car.price && this.car.price_per_day) {
          this.car.price = this.car.price_per_day;
        }

        // initial calculate if dates present
        this.calculateTotal();
      },
      error: err => console.log(err)
    });
  }

  calculateTotal() {
    this.totalPrice = 0;
    if (this.booking.start_date && this.booking.end_date && this.car) {
      const s = new Date(this.booking.start_date);
      const e = new Date(this.booking.end_date);

      if (e < s) {
        this.totalPrice = 0;
        return;
      }

      const days = Math.ceil((e.getTime() - s.getTime()) / 86400000) + 1;
      const pricePerDay = Number(this.car.price || 0);
      this.totalPrice = days * pricePerDay;
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

    const userId = Number(localStorage.getItem('user_id'));
    if (!userId) {
      alert("Vui lòng đăng nhập trước khi đặt xe!");
      this.router.navigate(['/login']);
      return;
    }

    // PAYLOAD PHẢI KHỚP VỚI API BACKEND
    const payload = {
      user_id: userId,
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
        const msg = err.error?.message || 'Đặt xe thất bại!';
        alert(msg);
      }
    });
  }
 }