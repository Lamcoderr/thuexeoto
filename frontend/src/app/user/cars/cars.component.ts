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

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars() {
    const filters: any = {};

    if (this.keyword.trim() !== '') filters.keyword = this.keyword;
    if (this.brand !== '') filters.brand = this.brand;
    if (this.seats !== '') filters.seats = this.seats;

    this.api.searchCars(filters).subscribe({
      next: (res: any) => {
        this.cars = res.data || [];
      },
      error: err => console.error(err)
    });
  }

  viewDetail(id: number) {
    this.router.navigate(['/cars', id]);
  }
}
