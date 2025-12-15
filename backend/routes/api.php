<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\StatisticController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/
Route::post('/admin/login', [AuthController::class, 'adminLogin']);
Route::post('/login',        [AuthController::class, 'userLogin']);
Route::post('/register',     [AuthController::class, 'register']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);

/*
|--------------------------------------------------------------------------
| CAR (Public)
|--------------------------------------------------------------------------
*/
Route::get('/cars',         [CarController::class, 'index']);
Route::get('/cars/search',  [CarController::class, 'search']);
Route::get('/cars/{id}',    [CarController::class, 'show']);

/*
|--------------------------------------------------------------------------
| UPLOAD
|--------------------------------------------------------------------------
*/
Route::post('/upload', [UploadController::class, 'uploadImage']);

/*
|--------------------------------------------------------------------------
| BOOKING – PUBLIC CREATE
|--------------------------------------------------------------------------
*/
Route::post('/bookings', [BookingController::class, 'store']); // user tạo booking

/*
|--------------------------------------------------------------------------
| REQUIRE AUTH
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // logout / refresh
    Route::post('/logout',  [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    /*
    |--------------------------------------------------------------------------
    | CAR MANAGEMENT (Admin)
    |--------------------------------------------------------------------------
    */
    Route::post('/cars', [CarController::class, 'store']);
    Route::put('/cars/{id}', [CarController::class, 'update']);
    Route::delete('/cars/{id}', [CarController::class, 'destroy']);

    /*
    |--------------------------------------------------------------------------
    | USER BOOKING
    |--------------------------------------------------------------------------
    */
    Route::get('/users/{id}/bookings', [BookingController::class, 'userBookings']);

    /*
    |--------------------------------------------------------------------------
    | BOOKING MANAGEMENT (Admin)
    |--------------------------------------------------------------------------
    */
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::get('/bookings/filter/{status}', [BookingController::class, 'filterByStatus']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);

    Route::post('/bookings/{id}/approve', [BookingController::class, 'approve']);
    Route::post('/bookings/{id}/reject',  [BookingController::class, 'reject']);

    /*
    |--------------------------------------------------------------------------
    | STATISTICS / DASHBOARD
    |--------------------------------------------------------------------------
    */
    Route::get('/statistics/summary',          [StatisticController::class, 'summary']);
    Route::get('/stats/revenue-month',         [DashboardController::class, 'revenueThisMonth']);
    Route::get('/stats/revenue-year',          [DashboardController::class, 'revenueThisYear']);
    Route::get('/stats/top-cars',              [DashboardController::class, 'topRentedCars']);
    Route::get('/stats/new-bookings',          [DashboardController::class, 'newBookings']);
    Route::get('/statistics/summary', [DashboardController::class, 'summary']);
    Route::get('/statistics/bookings/{status}', [DashboardController::class, 'bookingByStatus']);
    Route::get('/calendar', [DashboardController::class, 'calendar']);
});
