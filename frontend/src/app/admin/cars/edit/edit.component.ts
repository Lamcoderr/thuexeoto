import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-car-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditCarComponent implements OnInit {

  carId!: number;
  car: any = {};
  selectedImage: any = null;
  previewImage: any = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCar();
  }

  loadCar() {
    this.api.getCarById(this.carId).subscribe({
      next: (res: any) => {
        this.car = res.data;

        // Ảnh xem trước là ảnh cũ
        this.previewImage = res.data.image_url;
      },
      error: (err) => {
        console.log(err);
        alert("Xe không tồn tại!");
        this.router.navigate(['/admin/cars']);
      }
    });
  }

  onImageChange(event: any) {
    this.selectedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => this.previewImage = reader.result;
    reader.readAsDataURL(this.selectedImage);
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.car.name);
    formData.append('brand', this.car.brand);
    formData.append('price', this.car.price);
    formData.append('seats', this.car.seats);
    formData.append('description', this.car.description || '');

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.api.updateCar(this.carId, formData).subscribe({
      next: () => {
        alert("Cập nhật thành công!");
        this.router.navigate(['/admin/cars']);
      },
      error: (err) => {
        console.log(err);
        alert("Có lỗi xảy ra!");
      }
    });
  }
}
