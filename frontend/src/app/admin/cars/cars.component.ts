import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-cars',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars() {
    this.loading = true;
    this.error = null;
    this.api.getCars().subscribe({
      next: (res: any) => {
        this.cars = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Không thể tải danh sách xe';
        this.loading = false;
      }
    });
  }

  deleteCar(id: number) {
    if (!confirm("Bạn có chắc muốn xoá xe này không?")) return;

    this.api.deleteCar(id).subscribe({
      next: () => {
        alert('Xoá thành công');
        this.loadCars();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
