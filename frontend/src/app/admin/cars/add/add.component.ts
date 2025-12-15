import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-car-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddCarComponent {

  car: any = {
    name: '',
    brand: '',
    price: '',
    seats: '',
    description: ''
  };

  selectedImage: any = null;
  previewImage: any = null;

  constructor(private api: ApiService, private router: Router) {}

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
    formData.append('description', this.car.description);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.api.addCar(formData).subscribe({
      next: (res) => {
        alert("Thêm xe thành công!");
        this.router.navigate(['/admin/cars']);
      },
      error: (err) => {
        console.log(err);
        alert("Có lỗi xảy ra!");
      }
    });
  }
}
