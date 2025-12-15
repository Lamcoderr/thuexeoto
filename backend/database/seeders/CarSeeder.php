<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Car;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        // Tắt kiểm tra khóa ngoại để truncate không lỗi
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('cars')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $cars = [

            // ====== NHÓM XE 5 CHỖ PHỔ THÔNG ======
            [
                'name' => 'Toyota Vios 2023',
                'brand' => 'Toyota',
                'price' => 500000,
                'seats' => 5,
                'license_plate' => '51A-123.45',
                'description' => 'Xe tiết kiệm nhiên liệu, chạy êm, nội thất rộng rãi. Phù hợp chạy đô thị và xa lộ.',
                'image_url' => 'https://toyota.com.vn/images/Vios2023.jpg'
            ],
            [
                'name' => 'Hyundai Accent 2022',
                'brand' => 'Hyundai',
                'price' => 550000,
                'seats' => 5,
                'license_plate' => '60A-456.78',
                'description' => 'Accent 2022 trang bị màn hình LCD, camera lùi, nội thất sang trọng.',
                'image_url' => 'https://hyundai.com.vn/cache/images/Hyundai-Accent.jpg'
            ],
            [
                'name' => 'Honda City 2023',
                'brand' => 'Honda',
                'price' => 600000,
                'seats' => 5,
                'license_plate' => '43A-888.88',
                'description' => 'Honda City mạnh mẽ, bền bỉ, tiết kiệm nhiên liệu. Khoang lái rộng.',
                'image_url' => 'https://honda.com.vn/wp-content/uploads/2023/02/honda-city.png'
            ],

            // ====== XE 5 CHỖ CAO CẤP ======
            [
                'name' => 'Mazda 3 Premium',
                'brand' => 'Mazda',
                'price' => 750000,
                'seats' => 5,
                'license_plate' => '51G-777.77',
                'description' => 'Mazda 3 Premium nội thất cao cấp, lái mượt, 6 túi khí an toàn.',
                'image_url' => 'https://mazda.com.vn/images/Mazda3.png'
            ],
            [
                'name' => 'Toyota Camry 2022',
                'brand' => 'Toyota',
                'price' => 1200000,
                'seats' => 5,
                'license_plate' => '30A-999.99',
                'description' => 'Camry 2022 sang trọng dành cho doanh nhân, động cơ mạnh và êm.',
                'image_url' => 'https://toyota.com.vn/images/Camry2022.jpg'
            ],

            // ====== XE 7 CHỖ GIA ĐÌNH ======
            [
                'name' => 'Toyota Innova 2021',
                'brand' => 'Toyota',
                'price' => 850000,
                'seats' => 7,
                'license_plate' => '51D-345.67',
                'description' => 'Innova rộng rãi, đi gia đình cực kỳ ổn định.',
                'image_url' => 'https://toyota.com.vn/images/Innova.png'
            ],
            [
                'name' => 'Mitsubishi Xpander 2023',
                'brand' => 'Mitsubishi',
                'price' => 900000,
                'seats' => 7,
                'license_plate' => '47A-222.22',
                'description' => 'Xpander 2023 MPV bán chạy nhất VN, siêu bền, tiết kiệm.',
                'image_url' => 'https://mitsubishi-motors.com.vn/wp-content/uploads/xpander.jpg'
            ],
            [
                'name' => 'Kia Sorento 2022',
                'brand' => 'Kia',
                'price' => 1050000,
                'seats' => 7,
                'license_plate' => '72A-886.68',
                'description' => 'Sorento cao cấp, nhiều tính năng an toàn, máy mạnh.',
                'image_url' => 'https://kia.com.vn/sorento.png'
            ],

            // ====== XE NHỎ GỌN 4 CHỖ ======
            [
                'name' => 'Mazda 2 Sedan',
                'brand' => 'Mazda',
                'price' => 500000,
                'seats' => 4,
                'license_plate' => '51F-334.22',
                'description' => 'Mazda 2 nhỏ gọn, dễ lái trong phố, siêu tiết kiệm.',
                'image_url' => 'https://mazda.com.vn/images/Mazda2.png'
            ],
            [
                'name' => 'Honda Jazz 2020',
                'brand' => 'Honda',
                'price' => 520000,
                'seats' => 4,
                'license_plate' => '65A-234.55',
                'description' => 'Honda Jazz trẻ trung, cốp siêu rộng, phù hợp phái nữ.',
                'image_url' => 'https://honda.com.vn/uploads/jazz.png'
            ],

            // ====== XE 15-16 CHỖ ======
            [
                'name' => 'Ford Transit 16 chỗ',
                'brand' => 'Ford',
                'price' => 1500000,
                'seats' => 16,
                'license_plate' => '51B-789.99',
                'description' => 'Transit 16 chỗ mạnh mẽ, chở đoàn du lịch rất thoải mái.',
                'image_url' => 'https://ford.com.vn/transit.png'
            ],
            [
                'name' => 'Toyota Hiace 15 chỗ',
                'brand' => 'Toyota',
                'price' => 1400000,
                'seats' => 15,
                'license_plate' => '50B-678.90',
                'description' => 'Hiace 15 chỗ rộng rãi, bền, chạy tour rất ổn.',
                'image_url' => 'https://toyota.com.vn/hiace.png'
            ],
        ];

        foreach ($cars as $car) {
            Car::create($car);
        }
    }
}
        