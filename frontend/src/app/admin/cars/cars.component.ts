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

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars() {
    this.api.getCars().subscribe({
      next: (res: any) => {
        this.cars = res.data;
      },
      error: (err) => {
        console.log(err);
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
