<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Booking;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        Booking::create([
            'user_id' => 1,
            'car_id' => 1,
            'start_date' => '2025-11-30',
            'end_date' => '2025-12-02',
            'total_price' => 1000000,
            'status' => 'canceled',
            'note' => 'Khách muốn giao xe buổi sáng.'
        ]);

        Booking::create([
            'user_id' => 2,
            'car_id' => 2,
            'start_date' => '2025-12-10',
            'end_date' => '2025-12-12',
            'total_price' => 1600000,
            'status' => 'completed',
        ]);
    }
}
