<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    // ============================
    // API: THỐNG KÊ DASHBOARD
    // ============================
    public function summary()
    {
        $totalCars = Car::count();
        $totalBookings = Booking::count();

        // Tổng doanh thu của những booking đã hoàn thành
        $revenue = Booking::whereIn('status', ['confirmed', 'completed'])
                    ->sum('total_price');

        // Booking theo trạng thái
        $statusCount = Booking::select('status', DB::raw('COUNT(*) as total'))
                        ->groupBy('status')
                        ->get();

        // Booking gần nhất
        $recentBookings = Booking::with(['user', 'car'])
                            ->orderBy('id', 'desc')
                            ->take(5)
                            ->get();

        return response()->json([
            'status' => true,
            'data' => [
                'total_cars'       => $totalCars,
                'total_bookings'   => $totalBookings,
                'revenue'          => $revenue,
                'status_count'     => $statusCount,
                'recent_bookings'  => $recentBookings
            ]
        ]);
    }

    // ============================
    // API: BOOKING THEO TRẠNG THÁI
    // ============================
    public function bookingByStatus($status)
    {
        $valid = ['pending', 'confirmed', 'rejected', 'canceled', 'completed'];

        if (!in_array($status, $valid)) {
            return response()->json([
                'status' => false,
                'message' => 'Trạng thái không hợp lệ'
            ], 400);
        }

        $list = Booking::with(['user', 'car'])
                    ->where('status', $status)
                    ->orderBy('id', 'desc')
                    ->get();

        return response()->json([
            'status' => true,
            'data'   => $list
        ]);
    }

    // ============================
    // API: DOANH THU THÁNG NÀY
    // ============================
    public function revenueThisMonth()
    {
        $month = Carbon::now()->format('Y-m');

        $revenue = Booking::whereIn('status', ['confirmed', 'completed'])
                    ->where(function($q) use ($month) {
                        $q->where('start_date', 'LIKE', "$month%")
                          ->orWhere('end_date', 'LIKE', "$month%");
                    })
                    ->sum('total_price');

        return response()->json([
            'status' => true,
            'revenue' => $revenue
        ]);
    }

    // ============================
    // API: DOANH THU NĂM NAY
    // ============================
    public function revenueThisYear()
    {
        $year = Carbon::now()->format('Y');

        $revenue = Booking::whereIn('status', ['confirmed', 'completed'])
                    ->where(function($q) use ($year) {
                        $q->where('start_date', 'LIKE', "$year%")
                          ->orWhere('end_date', 'LIKE', "$year%");
                    })
                    ->sum('total_price');

        return response()->json([
            'status' => true,
            'revenue' => $revenue
        ]);
    }

    // ============================
    // API: XE ĐƯỢC THUÊ NHIỀU NHẤT
    // ============================
    public function topRentedCars()
    {
        $topCars = Booking::select('car_id', DB::raw('COUNT(*) as total_rentals'))
                        ->whereIn('status', ['confirmed', 'completed'])
                        ->groupBy('car_id')
                        ->orderBy('total_rentals', 'desc')
                        ->take(5)
                        ->with('car')
                        ->get()
                        ->map(function($b) {
                            return [
                                'car' => $b->car,
                                'total_rentals' => $b->total_rentals
                            ];
                        });

        return response()->json([
            'status' => true,
            'data' => $topCars
        ]);
    }

    // ============================
    // API: BOOKING MỚI NHẤT
    // ============================
    public function newBookings()
    {
        $newBookings = Booking::with(['user', 'car'])
                            ->orderBy('created_at', 'desc')
                            ->take(5)
                            ->get();

        return response()->json([
            'status' => true,
            'data' => $newBookings
        ]);
    }

    // =============================
    //  API LỊCH XE (CALENDAR VIEW)
    // =============================
    public function calendar(Request $request)
    {
        // Nếu không truyền ngày → mặc định lấy tháng hiện tại
        $month = $request->month ?? Carbon::now()->format('Y-m');

        // Lấy tất cả booking trong tháng
        $bookings = Booking::with(['car', 'user'])
            ->where(function($q) use ($month) {
                $q->where('start_date', 'LIKE', "$month%")
                  ->orWhere('end_date', 'LIKE', "$month%");
            })
            ->orderBy('start_date', 'asc')
            ->get();

        // Gom booking theo từng ngày
        $calendar = [];

        foreach ($bookings as $b) {
            $start = Carbon::parse($b->start_date);
            $end   = Carbon::parse($b->end_date);

            // Lặp qua từng ngày trong thời gian thuê
            for ($date = $start->copy(); $date->lte($end); $date->addDay()) {
                $day = $date->format('Y-m-d');
                $calendar[$day][] = $b;
            }
        }

        return response()->json([
            'status' => true,
            'month' => $month,
            'calendar' => $calendar
        ]);
    }
}


