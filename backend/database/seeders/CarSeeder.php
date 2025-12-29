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
                'image_url' => 'https://i1-vnexpress.vnecdn.net/2023/05/10/Vios-2023-7.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=xs9QVhN1lXeceW2HstiJmw&t=image'
            ],
            [
                'name' => 'Hyundai Accent 2022',
                'brand' => 'Hyundai',
                'price' => 550000,
                'seats' => 5,
                'license_plate' => '60A-456.78',
                'description' => 'Accent 2022 trang bị màn hình LCD, camera lùi, nội thất sang trọng.',
                'image_url' => 'https://static.chotot.com/storage/chotot-kinhnghiem/xe/2023/01/9fbe6b9e-gia-xe-hyundai-accent-2022-cho-tot.png'
            ],
            [
                'name' => 'Honda City 2023',
                'brand' => 'Honda',
                'price' => 600000,
                'seats' => 5,
                'license_plate' => '43A-888.88',
                'description' => 'Honda City mạnh mẽ, bền bỉ, tiết kiệm nhiên liệu. Khoang lái rộng.',
                'image_url' => 'https://images2.thanhnien.vn/528068263637045248/2023/3/4/honda-city-2023-1-f65c-1677894897159996686846.jpg'
            ],

            // ====== XE 5 CHỖ CAO CẤP ======
            [
                'name' => 'Mazda 3 Premium',
                'brand' => 'Mazda',
                'price' => 750000,
                'seats' => 5,
                'license_plate' => '51G-777.77',
                'description' => 'Mazda 3 Premium nội thất cao cấp, lái mượt, 6 túi khí an toàn.',
                'image_url' => 'https://i1-vnexpress.vnecdn.net/2021/09/18/Mazda32020VnE993047211573621051jpg-1631963909.jpg?w=750&h=450&q=100&dpr=1&fit=crop&s=Ksi2dIeIocGk9Pke5aGnRQ'
            ],
            [
                'name' => 'Toyota Camry 2022',
                'brand' => 'Toyota',
                'price' => 1200000,
                'seats' => 5,
                'license_plate' => '30A-999.99',
                'description' => 'Camry 2022 sang trọng dành cho doanh nhân, động cơ mạnh và êm.',
                'image_url' => 'https://static.wixstatic.com/media/b4dcef_232a34fc86a64d8c8eab26f49762c9bb~mv2.png/v1/fill/w_568,h_378,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b4dcef_232a34fc86a64d8c8eab26f49762c9bb~mv2.png'
            ],

            // ====== XE 7 CHỖ GIA ĐÌNH ======
            [
                'name' => 'Toyota Innova 2021',
                'brand' => 'Toyota',
                'price' => 850000,
                'seats' => 7,
                'license_plate' => '51D-345.67',
                'description' => 'Innova rộng rãi, đi gia đình cực kỳ ổn định.',
                'image_url' => 'https://cdnphoto.dantri.com.vn/V_KfvtrDmrmxUo7QjgUPTDnPu5I=/zoom/1200_630/2020/10/17/2021-toyota-innova-venturer-super-white-2-1602951002056.jpg'
            ],
            [
                'name' => 'Mitsubishi Xpander 2023',
                'brand' => 'Mitsubishi',
                'price' => 900000,
                'seats' => 7,
                'license_plate' => '47A-222.22',
                'description' => 'Xpander 2023 MPV bán chạy nhất VN, siêu bền, tiết kiệm.',
                'image_url' => 'https://images2.thanhnien.vn/528068263637045248/2023/9/18/2023-mitsubishi-xpander-1695004721724441097247.jpg'
            ],
            [
                'name' => 'Kia Sorento 2022',
                'brand' => 'Kia',
                'price' => 1050000,
                'seats' => 7,
                'license_plate' => '72A-886.68',
                'description' => 'Sorento cao cấp, nhiều tính năng an toàn, máy mạnh.',
                'image_url' => 'https://vcdn1-vnexpress.vnecdn.net/2021/08/28/2022-kia-sorento-sx-3871-1630162159.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=XH8tItLeKcXsbLruwIjQaQ'
            ],

            // ====== XE NHỎ GỌN 4 CHỖ ======
            [
                'name' => 'Mazda 2 Sedan',
                'brand' => 'Mazda',
                'price' => 500000,
                'seats' => 4,
                'license_plate' => '51F-334.22',
                'description' => 'Mazda 2 nhỏ gọn, dễ lái trong phố, siêu tiết kiệm.',
                'image_url' => 'https://drive.gianhangvn.com/image/obnuusz-2498445j27255x16.jpg'
            ],
            [
                'name' => 'Honda Jazz 2020',
                'brand' => 'Honda',
                'price' => 520000,
                'seats' => 4,
                'license_plate' => '65A-234.55',
                'description' => 'Honda Jazz trẻ trung, cốp siêu rộng, phù hợp phái nữ.',
                'image_url' => 'https://www.honda.com.vn/o-to/san-pham/honda-jazz/assets/img-mobile/exterior-img.jpg'
            ],

            // ====== XE 15-16 CHỖ ======
            [
                'name' => 'Ford Transit 16 chỗ',
                'brand' => 'Ford',
                'price' => 1500000,
                'seats' => 16,
                'license_plate' => '51B-789.99',
                'description' => 'Transit 16 chỗ mạnh mẽ, chở đoàn du lịch rất thoải mái.',
                'image_url' => 'https://fordtayninhauto.com/wp-content/uploads/2023/03/gia-ford-transit-16-cho-mau-bac.jpg'
            ],
            [
                'name' => 'Toyota Hiace 15 chỗ',
                'brand' => 'Toyota',
                'price' => 1400000,
                'seats' => 15,
                'license_plate' => '50B-678.90',
                'description' => 'Hiace 15 chỗ rộng rãi, bền, chạy tour rất ổn.',
                'image_url' => 'https://toyotaangiang.org/wp-content/uploads/2019/06/toyota-hiace-ngoai-that.jpg'
            ],
        ];

        foreach ($cars as $index => $car) {
            // Download image if URL
            $imagePath = null;
            if (isset($car['image_url']) && filter_var($car['image_url'], FILTER_VALIDATE_URL)) {
                $imagePath = $this->downloadImage($car['image_url'], $car['name']);
            } elseif (isset($car['image'])) {
                $imagePath = $car['image'];
            }
            unset($car['image_url']);
            $car['image'] = $imagePath ?: 'https://picsum.photos/400/300?random=' . ($index + 1);

            Car::create($car);
        }
    }

    private function downloadImage($url, $name)
    {
        $filename = preg_replace('/[^A-Za-z0-9\-]/', '', $name) . '.jpg';
        $path = public_path('cars/' . $filename);

        // Ensure directory exists
        if (!file_exists(public_path('cars'))) {
            mkdir(public_path('cars'), 0755, true);
        }

        // Download image
        $context = stream_context_create([
            'http' => [
                'header' => 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            ]
        ]);
        $imageData = file_get_contents($url, false, $context);
        if ($imageData !== false) {
            file_put_contents($path, $imageData);
            return $filename;
        }

        return null;
    }
}
        
