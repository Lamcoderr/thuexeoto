<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Booking;
use Illuminate\Http\Request;
use Carbon\Carbon;

class StatisticController extends Controller
{
    // =============================
    //  API: Tổng số xe / booking / doanh thu
    // =============================
    public function summary()
    {
        $totalCars = Car::count();
        $totalBookings = Booking::count();

        // Doanh thu = tổng total_price của booking được xác nhận
        $revenue = Booking::where('status', 'confirmed')->sum('total_price');

        // Đếm booking theo trạng thái
        $bookingStatus = [
            'pending'   => Booking::where('status', 'pending')->count(),
            'confirmed' => Booking::where('status', 'confirmed')->count(),
            'rejected'  => Booking::where('status', 'rejected')->count(),
            'canceled'  => Booking::where('status', 'canceled')->count(),
            'completed' => Booking::where('status', 'completed')->count(),
        ];

        // 5 booking gần nhất
        $recent = Booking::with(['user', 'car'])
            ->orderBy('id', 'desc')
            ->take(5)
            ->get();

        return response()->json([
            'status' => true,
            'data' => [
                'total_cars'      => $totalCars,
                'total_bookings'  => $totalBookings,
                'revenue'         => $revenue,
                'booking_status'  => $bookingStatus,
                'recent_bookings' => $recent,
            ]
        ]);
    }
}
