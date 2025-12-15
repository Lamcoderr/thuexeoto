<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\BookingNotificationMail;
use App\Mail\BookingStatusMail;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    // ============================
    // CREATE BOOKING - USER
    // ============================
    public function store(Request $request)
    {
        $request->validate([
            'user_id'    => 'required|exists:users,id',
            'car_id'     => 'required|exists:cars,id',
            'start_date' => 'required|date',
            'end_date'   => 'required|date|after:start_date',
            'note'       => 'nullable|string',
        ]);

        $car = Car::findOrFail($request->car_id);

        // Kiểm tra trùng lịch
        $check = Booking::where('car_id', $request->car_id)
            ->where('status', '!=', 'canceled')
            ->where(function ($q) use ($request) {
                $q->whereBetween('start_date', [$request->start_date, $request->end_date])
                  ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                  ->orWhereRaw('? BETWEEN start_date AND end_date', [$request->start_date])
                  ->orWhereRaw('? BETWEEN start_date AND end_date', [$request->end_date]);
            })
            ->exists();

        if ($check) {
            return response()->json([
                'status' => false,
                'message' => 'Xe đã có lịch trong khoảng ngày này.'
            ], 400);
        }

        // Tính tiền
        $days = (strtotime($request->end_date) - strtotime($request->start_date)) / 86400 + 1;
        $total_price = $car->price * $days;

        // Tạo booking
        $booking = Booking::create([
            'user_id'     => $request->user_id,
            'car_id'      => $request->car_id,
            'start_date'  => $request->start_date,
            'end_date'    => $request->end_date,
            'note'        => $request->note,
            'total_price' => $total_price,
            'status'      => 'pending',
        ]);

        // Gửi email báo admin
        Mail::to("admin@gmail.com")->send(new BookingNotificationMail($booking));

        return response()->json([
            'status' => true,
            'message' => 'Đặt lịch thành công. Chúng tôi sẽ liên hệ để xác nhận.',
            'data' => $booking
        ]);
    }

    // ============================
    // ADMIN – LẤY TOÀN BỘ BOOKING
    // ============================
    public function index()
    {
        return response()->json([
            'status' => true,
            'data' => Booking::with(['user', 'car'])->orderBy('id', 'desc')->get()
        ]);
    }

    // ============================
    // USER – LẤY BOOKING CỦA USER
    // ============================
    public function userBookings($id)
    {
        return response()->json([
            'status' => true,
            'data' => Booking::where('user_id', $id)
                ->with('car')
                ->orderBy('id', 'desc')
                ->get()
        ]);
    }

    // ============================
    // ADMIN – FILTER BOOKING
    // ============================
    public function filterByStatus($status)
    {
        $valid = ['pending','confirmed','rejected','canceled','completed'];

        if (!in_array($status, $valid)) {
            return response()->json(['status' => false, 'message' => 'Trạng thái không hợp lệ'], 400);
        }

        return response()->json([
            'status' => true,
            'data' => Booking::with(['user', 'car'])
                        ->where('status', $status)
                        ->orderBy('id', 'desc')
                        ->get()
        ]);
    }

    // ============================
    // ADMIN – CHI TIẾT BOOKING
    // ============================
    public function show($id)
    {
        $booking = Booking::with(['car', 'user'])->find($id);

        if (!$booking) {
            return response()->json(['status' => false, 'message' => 'Booking không tồn tại'], 404);
        }

        return response()->json(['status' => true, 'data' => $booking]);
    }

    // ============================
    // ADMIN – DUYỆT BOOKING
    // ============================
    public function approve($id)
    {
        $booking = Booking::with(['user', 'car'])->find($id);

        if (!$booking) {
            return response()->json(['status' => false, 'message' => 'Không tìm thấy booking'], 404);
        }

        $booking->update(['status' => 'confirmed']);

        // email user
        Mail::to($booking->user->email)
            ->send(new BookingStatusMail($booking, 'được duyệt'));

        return response()->json(['status' => true, 'message' => 'Booking đã được duyệt']);
    }

    // ============================
    // ADMIN – TỪ CHỐI BOOKING
    // ============================
    public function reject($id)
    {
        $booking = Booking::with(['user', 'car'])->find($id);

        if (!$booking) {
            return response()->json(['status' => false, 'message' => 'Không tìm thấy booking'], 404);
        }

        $booking->update(['status' => 'rejected']);

        // email user
        Mail::to($booking->user->email)
            ->send(new BookingStatusMail($booking, 'bị từ chối'));

        return response()->json(['status' => true, 'message' => 'Booking đã bị từ chối']);
    }

    // ==============================
    //  API LỊCH SỬ ĐẶT XE THEO USER
    // ==============================
    public function bookingHistory($user_id)
    {
        $bookings = Booking::where('user_id', $user_id)
            ->with('car')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Lấy lịch sử đặt xe thành công',
            'data' => $bookings
        ]);
    }

    public function stats()
    {
    // Tổng xe
    $totalCars = DB::table('cars')->count();

    // Tổng booking
    $totalBookings = DB::table('bookings')->count();

    // Booking theo trạng thái
    $bookingsByStatus = DB::table('bookings')
        ->select('status', DB::raw('count(*) as count'))
        ->groupBy('status')
        ->pluck('count', 'status'); // associative: ['pending' => 5, ...]

    // Doanh thu: tổng total_price của booking đã confirmed (hoặc completed)
    $revenue = DB::table('bookings')
        ->whereIn('status', ['confirmed', 'completed'])
        ->sum('total_price');

    // Booking gần nhất (limit 6) với user + car
    $recent = \App\Models\Booking::with(['user', 'car'])
        ->orderBy('created_at', 'desc')
        ->limit(6)
        ->get();

    return response()->json([
        'status' => true,
        'data' => [
            'total_cars' => $totalCars,
            'total_bookings' => $totalBookings,
            'bookings_by_status' => $bookingsByStatus,
            'revenue' => $revenue,
            'recent_bookings' => $recent,
        ]
    ]);
    }
    
}
