import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-cars',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class UserCarsComponent implements OnInit {

  cars: any[] = [];
  keyword = '';
  brand = '';
  seats = '';
  loading = true;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadCars();
  }

  normalizeCar(c: any) {
    if (!c) return c;
    if (!c.image_url) {
      if (c.image) {
        c.image_url = this.api.getImageUrl(c.image);
      } else {
        c.image_url = '/assets/default-car.png';
      }
    }
    if (!c.price && c.price_per_day) {
      c.price = c.price_per_day;
    }
    return c;
  }

  loadCars() {
    this.loading = true;
    const filters: any = {};

    if (this.keyword.trim() !== '') filters.keyword = this.keyword;
    if (this.brand !== '') filters.brand = this.brand;
    if (this.seats !== '') filters.seats = this.seats;

    this.api.searchCars(filters).subscribe({
      next: (res: any) => {
        this.cars = (res.data || []).map((c: any) => this.normalizeCar(c));
        this.loading = false;
      },
      error: () => {
        this.cars = [];
        this.loading = false;
      }
    });
  }

  viewDetail(carId: number) {
    this.router.navigate(['/cars', carId]);
  }
}